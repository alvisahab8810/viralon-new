import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import Leftbar from "../../components/Leftbar";
import Dashnav from "../../components/Dashnav";
import Head from "next/head";
export default function BlogDashboard() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const deletePost = async (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`/api/posts/${id}`);
        fetchPosts(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
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
                Blog Dashboard
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
                    Blog Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
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
                  <td className="dash-img">
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
                        <i className="zmdi zmdi-eye"></i>
                      </span>
                    </Link>
                    <button
                      className="btn btn-primary delete-btn"
                      onClick={() => deletePost(post._id)}
                    >
                      <i className="zmdi zmdi-delete"></i>
                    </button>
                  </td>
                 {/* 
                  <td>
                    <Link href={`/posts/${post._id}`}>
                      <span className="btn btn-primary">
                        <FontAwesomeIcon icon={faEye} />
                        
                      </span>
                    </Link>
                    <Link href={`/dashboard/edit/${post._id}`}>
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
                  </td> */}

                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
