
// pages/dashboard.js
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const deletePost = async (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/api/posts/${id}`);
        fetchPosts(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td className='dash-img'>
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={100} // Adjust as needed
                    height={100} // Adjust as needed
                    layout="responsive"
                  />
                )}
              </td>
              <td>
                <Link href={`/posts/${post._id}`}>
                  <span className="btn btn-primary">
                    <FontAwesomeIcon icon={faEye} />

                  </span>
                </Link>
                <Link href={`/posts/edit/${post._id}`}>
                  <span className="btn btn-secondary mx-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </span>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deletePost(post._id)}
                >
                 <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
