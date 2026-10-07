import Head from "next/head";
import Topbar from "../components/header/Header";
import Offcanvas from "../components/header/Offcanvas";
import LatestArticles from "../components/blogs/LatestArticles";
import Footer from "../components/footer/Footer";
import Form from "../components/home/Form";
import PageFaq from "../components/PageFaq";
import { getPageFaq } from "../utils/pageFaq";

export default function BlogsPage({ faq }) {
  return (
    <div className="blog-list-page">
      <Head>
        <title>Blog — Viralon</title>
        <meta name="description" content="Insights, ideas and updates from Viralon Digital Services." />
        <link rel="stylesheet" href="/assets/css/blogs.css" />
      </Head>
      <Topbar />
      <Offcanvas />
      <LatestArticles />
      <Form variant="light" />
      <PageFaq faq={faq} topClass="pt-80" variant="light" />
      <Footer />
    </div>
  );
}

// FAQ block content comes from the payroll admin (Website → FAQs).
export async function getStaticProps() {
  return { props: { faq: await getPageFaq("blogs") }, revalidate: 60 };
}
