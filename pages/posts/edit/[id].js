// pages/posts/edit/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({ title: '', content: '' });

  useEffect(() => {
    if (id) {
      axios.get(`/api/posts/${id}`)
        .then((response) => setPost(response.data))
        .catch((error) => console.error('Error fetching post:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/posts/${id}`, post)
      .then(() => {
        alert('Post updated successfully');
        router.push('/admin/dashboard');
      })
      .catch((error) => console.error('Error updating post:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          name="content"
          value={post.content}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Update Post</button>
    </form>
  );
};

export default EditPost;


