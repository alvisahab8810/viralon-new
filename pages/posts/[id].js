// // pages/posts/[id].js
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const ViewPost = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     if (id) {
//       axios.get(`/api/posts/${id}`)
//         .then((response) => setPost(response.data))
//         .catch((error) => console.error('Error fetching post:', error));
//     }
//   }, [id]);

//   if (!post) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>
//       {/* Render other post details as needed */}
//     </div>
//   );
// };

// export default ViewPost;

import dynamic from 'next/dynamic';
import Topbar from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Hero from "../../components/blogs/Hero";
import Offcanvas from "../../components/header/Offcanvas";

// Dynamically import the ViewPost component with SSR disabled
const ViewPost = dynamic(() => import('../../components/ViewPost'), { ssr: false });

const PostPage = () => {
  return (
    <div className='bg-dark'>
      <Topbar />
       <Offcanvas/>
       <Hero />
       <ViewPost />
      <Footer />
    </div>
  );
};

export default PostPage;
