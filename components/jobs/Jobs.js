import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Positions are now managed from the payroll admin (Website → Job Positions)
// and fetched from the shared DB. The markup below is EXACTLY the same
// position-card structure the page always had — only the data is dynamic.
export default function Jobs() {
  const router = useRouter();
  const { tab } = router.query; // Get tab from URL

  const [activeTab, setActiveTab] = useState("internship"); // Default tab
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (tab === "experienced") {
      setActiveTab("experienced");
    } else {
      setActiveTab("internship");
    }
  }, [tab]);

  useEffect(() => {
    fetch("/api/jobs/list")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setPosts(data.data);
      })
      .catch(() => {});
  }, []);

  const internship = posts.filter((p) => p.category === "internship");
  const experienced = posts.filter((p) => p.category === "experienced");

  // One position card — same markup as before. Even index = text first
  // (flex-column1), odd index = image first. First card pt-50, rest pt-80.
  const renderCard = (post, idx, isFirst) => {
    const textFirst = idx % 2 === 0;
    const year = new Date(post.createdAt).getFullYear();

    const content = (
      <div className="content d-flex flex-column  flex-grow-1">
        <div className="year-title text-muted mb-4">/{year}</div>
        <h2 className="display-4 font-weight-bold mb-4 marcellus-regular">
          {post.title}
        </h2>
        <div className="mb-2">{post.jobType}</div>
        {post.experience ? (
          <div className="mb-2">Experienced: ({post.experience})</div>
        ) : null}
        <ul className="job-description-list mb-4">
          {(post.highlights || []).map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
        <Link href={`/jobs/${post.slug}`} className="learn-more">
          <span className="marcellus-regular">LEARN MORE</span>
          <img src="./assets/img/icon/up-arrow2.png" alt="arrow-img"></img>
        </Link>
      </div>
    );

    const image = (
      <div className="position-img flex-grow-1">
        <img
          src={post.image || "/assets/img/careers/img1.webp"}
          alt="position-img"
          className="img-fluid w-100 h-100 object-cover"
        />
      </div>
    );

    return (
      <div className="position-card" key={post.slug}>
        <div
          className={`position-main-bx d-flex flex-column ${
            textFirst ? "flex-column1 " : ""
          }flex-lg-row ${isFirst ? "pt-50" : "pt-80"}`}
        >
          {textFirst ? (
            <>
              {content}
              {image}
            </>
          ) : (
            <>
              {image}
              {content}
            </>
          )}
        </div>
      </div>
    );
  };

  // A tab pane: first 4 cards visible, the rest behind "See all positions".
  const renderPane = (list, collapseId) => {
    const visible = list.slice(0, 4);
    const hidden = list.slice(4);
    return (
      <>
        {visible.map((post, idx) => renderCard(post, idx, idx === 0))}

        {hidden.length > 0 && (
          <>
            <div className="pt-50">
              <Link
                className="view-more"
                data-bs-toggle="collapse"
                href={`#${collapseId}`}
                role="button"
                aria-expanded="false"
                aria-controls={collapseId}
              >
                See all positions
              </Link>
            </div>
            <div className="collapse" id={collapseId}>
              <div className="card card-body">
                {hidden.map((post, idx) => renderCard(post, idx, idx === 0))}
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <section className="job-tab-section pb-80">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link marcellus-regular ${
                activeTab === "internship" ? "active" : ""
              }`}
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected={activeTab === "internship"}
            >
              Internship Program
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link marcellus-regular ${
                activeTab === "experienced" ? "active" : ""
              }`}
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected={activeTab === "experienced"}
            >
              Experienced professional
            </button>
          </li>
        </ul>
        <div className="container">
          <div className="tab-content" id="pills-tabContent">
            <div
              className={`tab-pane fade ${
                activeTab === "internship" ? "show active" : ""
              }`}
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabIndex="0"
            >
              {renderPane(internship, "collapseInternship")}
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "experienced" ? "show active" : ""
              }`}
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabIndex="0"
            >
              {renderPane(experienced, "collapseExperienced")}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
