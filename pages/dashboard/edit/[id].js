// pages/posts/edit/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Dashnav from "../../../components/Dashnav";
import Leftbar from "../../../components/Leftbar";
import Link from "next/link";

const EditPost = () => {

  const [image, setImage] = useState(""); // State to hold the current image URL

  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({ title: "", content: "" });

  // useEffect(() => {
  //   if (id) {
  //     axios
  //       .get(`/api/posts/${id}`)
  //       .then((response) => setPost(response.data))
  //       .catch((error) => console.error("Error fetching post:", error));
  //   }
  // }, [id]);



  useEffect(() => {
    if (id) {
      axios
        .get(`/api/posts/${id}`)
        .then((response) => {
          setPost(response.data);
          setImage(response.data.image); // Assuming the image URL is in response.data.image
        })
        .catch((error) => console.error("Error fetching post:", error));
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Create a preview URL for the selected image
      setPost((prevPost) => ({ ...prevPost, newImage: file })); // Store the file in the post state
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/posts/${id}`, post)
      .then(() => {
        alert("Post updated successfully");
        router.push("/dashboard/blog-dashboard");
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  return (
    <div className="main-nav">
      <Head>
        <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/asets/css/main.css" />
      </Head>
      <Dashnav />
      <Leftbar />

      <section className="content home">
        <div className="block-header">
          <div className="row ptb-50">
            <div className="col-lg-7 col-md-6 col-sm-12">
              <h2>
                Update Blog
                <small className="text-muted">Welcome to Viralon</small>
              </h2>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12">
              <ul className="breadcrumb float-md-right">
                <li className="breadcrumb-item ">
                  <Link href="/dashboard/dashboard">
                    <i className="zmdi zmdi-home"></i> Dashboard
                  </Link>
                </li>
                <li className="breadcrumb-item ">
                  <Link href="#" className="active">
                    Update Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Post Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
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
          </form> */}


          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Post Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={post.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                name="content"
                className="form-control"
                value={post.content}
                onChange={handleChange}
                required
              />
            </div>
            {image && (
              <div className="mb-3">
                <label className="form-label">Current Image</label>
                <img src={image} alt="Current Post Image" className="img-thumbnail mb-3" />
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Upload New Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Update Post</button>
          </form>

        </div>
      </section>
    </div>
  );
};

export default EditPost;
