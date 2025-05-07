// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// export default function Blogs() {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3000/api/posts")
//       .then((res) => setBlogs(res.data))
//       .catch((err) => console.error("Error fetching blogs:", err));
//   }, []);

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <section className="blog-area blog-grid-colum default-padding">
//       <div className="container">
//         <h2 className="text-center pb-20">All Blog Posts</h2>
//         <div className="row">
//           {blogs.map((blog) => (
//             <div key={blog._id} className="col-lg-4 col-md-6 mb-50">
//               <div className="blog-style-one">

//               <div className="thumb">
//                   <Link href="/single-blogs">
//                   <img src={blog.image} alt="Blog Cover" className="card-img-top" />
//                    </Link>
//               </div>

//               <div className="info">
//               <div className="meta">
//                     <ul>
//                       <li>
//                         <Link href={`/author/${blog.authorId}`}>{blog.authorName}riyaz</Link>
//                       </li>
//                       <li>
//                       {blog.createdAt
//                         ? new Date(blog.createdAt).toLocaleDateString("en-US", {
//                             year: "numeric",
//                             month: "long",
//                             day: "numeric",
//                           })
//                         : "Date not available"}
//                     </li>
//                     </ul>
//                   </div>
//                     <h3 className="post-title"><Link href="/single-blogs">{blog.title}</Link></h3>
//                     <Link href="/single-blogs" className="button-regular">
//                         Continue Reading <i className="fas fa-arrow-right"></i>
//                     </Link>
//                 </div>

//                 {/* <div className="card-body">
//                   <h5 className="card-title text-dark">{blog.title}</h5>
//                   <p className="card-text">{blog.subtitle}</p>
//                   <span className="badge badge-primary">{blog.category}</span>
//                 </div> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// pages/index.js or wherever your blog list is rendered

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/posts")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="blog-lists blog-area blog-grid-column default-padding">
      <div className="container">
        <h2 className="text-center pb-20">All Blog Posts</h2>
        <div className="row">
          {blogs.map((blog) => (
            <div key={blog._id} className="col-lg-4 col-md-6 mb-50">
              <div className="blog-style-one">
                <div className="thumb">
                  <Link href={`/posts/${blog._id}`}>
                    <img
                      src={blog.image}
                      alt="Blog Cover"
                      className="card-img-top"
                    />
                  </Link>
                </div>
                <div className="info">
                  <div className="meta">
                    <ul>
                      <li>
                        {/* <Link href={`/author/${blog.authorId}`}>{blog.authorName}</Link> */}
                        <li>
                          <Link href="/single-blogs">Riyaz Ali</Link>
                        </li>
                      </li>
                      <li>{formatDate(blog.createdAt)}</li>
                    </ul>
                  </div>
                  <h3 className="post-title">
                    <Link href={`/posts/${blog._id}`}>{blog.title}</Link>
                  </h3>
                  <Link href={`/posts/${blog._id}`} className="button-regular">
                    Continue Reading <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
