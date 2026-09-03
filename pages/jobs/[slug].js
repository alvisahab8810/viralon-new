// pages/jobs/[slug].js — dynamic job detail page. Exact same design as the
// old static content-writer-intern page; the content now comes from the
// shared DB (posts managed in the payroll admin → Website → Job Positions).
// Long-form fields may be rich-text HTML (from the admin editor) or legacy
// plain strings / arrays (seed data) — both render inside the existing
// .job_description styles, so the look is unchanged. Empty sections are hidden.
import React from "react";
import Topbar from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Offcanvas from "../../components/header/Offcanvas";
import Hero from "../../components/jobs/Hero";
import ContentWriterForm from "../../components/jobs/internship/content-writer-form";
import dbConnect from "../../utils/dbConnect";
import JobPost from "../../models/JobPost";

const isHtml = (v) => typeof v === "string" && v.includes("<");
const hasContent = (v) => {
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v !== "string") return false;
  return v.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim().length > 0;
};

// Paragraph field: rich HTML renders as-is (CSS targets .job_description p),
// plain strings keep the original <p> markup.
const Rich = ({ value, className }) =>
  isHtml(value)
    ? <div dangerouslySetInnerHTML={{ __html: value }} />
    : <p className={className}>{value}</p>;

// List field: rich HTML carries its own <ul>; legacy arrays keep the
// original <ul><li> markup.
const RichList = ({ value }) =>
  Array.isArray(value) ? (
    <ul>
      {value.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  ) : (
    <div dangerouslySetInnerHTML={{ __html: value }} />
  );

export default function JobDetail({ post }) {
  const year = new Date(post.createdAt).getFullYear();

  return (
    <div className="bg-dark">
      <Topbar />
      <Offcanvas />
      <Hero />

      <section className="job_description-section ptb-80">
        <div className="container">
          <div className="job_description pb-50">
            <p className="date">/{year}</p>
            <h1>{post.title}</h1>

            <p className="info-text">
              <span className="label text-white"><b>Job Title:</b></span> {post.title}
              {post.jobType ? ` (${post.jobType})` : ""}
            </p>
            {post.location && (
              <p className="info-text">
                <span className="label text-white"><b>Job Location:</b></span> {post.location}
              </p>
            )}
            {post.jobType && (
              <p className="info-text">
                <span className="label text-white"><b>Job Type:</b></span> {post.jobType}
              </p>
            )}
            {post.experience && (
              <p className="info-text">
                <span className="label text-white"><b>Experience Level:</b></span> {post.experience}
              </p>
            )}
            {post.qualification && (
              <p className="info-text">
                <span className="label text-white"><b>Qualification:</b></span> {post.qualification}
              </p>
            )}

            {hasContent(post.aboutUs) && (
              <>
                <h2>About Us:</h2>
                <Rich value={post.aboutUs} />
              </>
            )}

            {hasContent(post.jobOverview) && (
              <>
                <h2>Job Overview:</h2>
                <Rich value={post.jobOverview} />
              </>
            )}

            {hasContent(post.responsibilities) && (
              <>
                <h2>Key Responsibilities:</h2>
                <RichList value={post.responsibilities} />
              </>
            )}

            {hasContent(post.requiredQualifications) && (
              <>
                <h2>Required Qualifications:</h2>
                <RichList value={post.requiredQualifications} />
              </>
            )}

            {hasContent(post.whatWeOffer) && (
              <>
                <h2>What We Offer:</h2>
                <RichList value={post.whatWeOffer} />
              </>
            )}

            {hasContent(post.howToApply) && (
              <>
                <h2>How to Apply:</h2>
                <Rich value={post.howToApply} className="mb-0" />
              </>
            )}
          </div>
          <ContentWriterForm position={post.title} />
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Heal docs saved through a stale [String] schema, which cast editor HTML
// into a one-element array — join back into a single HTML string so it
// renders as real markup instead of literal text.
const unwrapRich = (v) => {
  let out =
    Array.isArray(v) && v.some((x) => typeof x === "string" && x.includes("<"))
      ? v.join("")
      : v;
  if (typeof out === "string") {
    // The admin editor wraps list-item text in <p>, which our CSS would give
    // paragraph margins — unwrap so bullets space exactly like the old markup.
    out = out
      .replace(/<li><p>/g, "<li>")
      .replace(/<\/p><\/li>/g, "</li>")
      .replace(/<\/p><p>(?=[^<]*<\/li>)/g, "<br>");
  }
  return out;
};
const RICH_FIELDS = [
  "aboutUs", "jobOverview", "howToApply",
  "responsibilities", "requiredQualifications", "whatWeOffer",
];

export async function getServerSideProps({ params }) {
  try {
    await dbConnect();
    const post = await JobPost.findOne({ slug: params.slug, status: "open" }).lean();
    if (!post) return { notFound: true };
    for (const f of RICH_FIELDS) post[f] = unwrapRich(post[f]);
    return { props: { post: JSON.parse(JSON.stringify(post)) } };
  } catch {
    return { notFound: true };
  }
}
