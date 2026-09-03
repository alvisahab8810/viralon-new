import Head from "next/head";
import Topbar from "../components/header/Header";
import Offcanvas from "../components/header/Offcanvas";
import BlogList from "../components/blogs/BlogList";
import Footer from "../components/footer/Footer";
import PageFaq from "../components/PageFaq";
import { getPageFaq } from "../utils/pageFaq";

export default function BlogsPage({ faq }) {
  return (
    <>
      <Head>
        <title>Blog — Viralon</title>
        <meta name="description" content="Insights, ideas and updates from Viralon Digital Services." />
        <link rel="stylesheet" href="/assets/css/blogs.css" />
      </Head>
      <Topbar />
      <Offcanvas />
      <div className="packages-hero-area">
        <img
          src="/assets/images/blogs/blog-hero.webp"
          alt="Blogs Hero"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      <BlogList />
      <PageFaq faq={faq} topClass="pt-80" />
      <Footer />
    </>
  );
}

// FAQ block content comes from the payroll admin (Website → FAQs).
export async function getStaticProps() {
  return { props: { faq: await getPageFaq("blogs") }, revalidate: 60 };
}
