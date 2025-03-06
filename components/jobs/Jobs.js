import React from "react";
import { Link } from "react-router-dom";

export default function Jobs() {
  return (
    <>
      <section className="job-tab-section pb-80">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active marcellus-regular"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Experienced professional
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link marcellus-regular"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Experienced professional
            </button>
          </li>
        </ul>
        <div className="container">
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabIndex="0"
            >
              <div className="position-card">
                <div className="position-main-bx d-flex flex-column flex-lg-row pt-50">
                  <div className="content d-flex flex-column  flex-grow-1">
                    <div className="year-title text-muted mb-4">/2025</div>
                    <h2 className="display-4 font-weight-bold mb-4 marcellus-regular">
                      CONTENT WRITER INTERN
                    </h2>
                    <div className="mb-2">Full Time</div>
                    <div className="mb-2">
                      Experienced: (3-5 years of experience)
                    </div>
                    <ul className="job-description-list mb-4">
                      <li>
                        Bachelor's degree in English, Communications, or a
                        related field.
                      </li>
                      <li>
                        Strong portfolio showcasing diverse writing samples.
                      </li>
                    </ul>
                    <div className="learn-more">
                      <span className="marcellus-regular">LEARN MORE</span>
                      <img
                        src="./assets/img/icon/up-arrow2.png"
                        alt="arrow-img"
                      ></img>
                    </div>
                  </div>
                  <div className="position-img flex-grow-1">
                    <img
                      src="./assets/img/careers/img1.webp"
                      alt="position-img"
                      className="img-fluid w-100 h-100 object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="position-card">
                <div className="position-main-bx d-flex flex-column flex-lg-row pt-80">
                  <div className="position-img flex-grow-1">
                    <img
                      src="./assets/img/careers/img3.webp"
                      alt="position-img"
                      className="img-fluid w-100 h-100 object-cover"
                    />
                  </div>
                  <div className="content d-flex flex-column  flex-grow-1">
                    <div className="year-title text-muted mb-4">/2025</div>
                    <h2 className="display-4 font-weight-bold mb-4 marcellus-regular">
                      Photographer Intern
                    </h2>
                    <div className="mb-2">Full Time</div>
                    <div className="mb-2">
                      Experienced: (3-5 years of experience)
                    </div>
                    <ul className="job-description-list mb-4">
                      <li>
                        Strong portfolio in composition, lighting & editing.
                      </li>
                      <li>
                        Proficient in Lightroom, Photoshop & professional
                        cameras.
                      </li>
                    </ul>
                    <div className="learn-more">
                      <span className="marcellus-regular">LEARN MORE</span>
                      <img
                        src="./assets/img/icon/up-arrow2.png"
                        alt="arrow-img"
                      ></img>
                    </div>
                  </div>
                </div>
              </div>

              <div className="position-card">
                <div className="position-main-bx d-flex flex-column flex-lg-row pt-80">
                  <div className="content d-flex flex-column  flex-grow-1">
                    <div className="year-title text-muted mb-4">/2025</div>
                    <h2 className="display-4 font-weight-bold mb-4 marcellus-regular">
                      Videographer Intern
                    </h2>
                    <div className="mb-2">Full Time</div>
                    <div className="mb-2">
                      Experienced: (1-3 years of experience)
                    </div>
                    <ul className="job-description-list mb-4">
                      <li>Experience in high-quality video shooting.</li>
                      <li>
                        Skilled in Premiere Pro & cinematography techniques.
                      </li>
                    </ul>
                    <div className="learn-more">
                      <span className="marcellus-regular">LEARN MORE</span>
                      <img
                        src="./assets/img/icon/up-arrow2.png"
                        alt="arrow-img"
                      ></img>
                    </div>
                  </div>
                  <div className="position-img flex-grow-1">
                    <img
                      src="./assets/img/careers/img2.webp"
                      alt="position-img"
                      className="img-fluid w-100 h-100 object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="position-card">
                <div className="position-main-bx d-flex flex-column flex-lg-row pt-80">
                  <div className="position-img flex-grow-1">
                    <img
                      src="./assets/img/careers/img3.webp"
                      alt="position-img"
                      className="img-fluid w-100 h-100 object-cover"
                    />
                  </div>
                  <div className="content d-flex flex-column  flex-grow-1">
                    <div className="year-title text-muted mb-4">/2025</div>
                    <h2 className="display-4 font-weight-bold mb-4 marcellus-regular">
                      Video Editor Intern
                    </h2>
                    <div className="mb-2">Full Time</div>
                    <div className="mb-2">
                      Experienced: (1-3 years of experience)
                    </div>
                    <ul className="job-description-list mb-4">
                      <li>Strong storytelling & post-production skills.</li>
                      <li>
                        Proficient in Premiere Pro, After Effects & color
                        grading.
                      </li>
                    </ul>
                    <div className="learn-more">
                      <span className="marcellus-regular">LEARN MORE</span>
                      <img
                        src="./assets/img/icon/up-arrow2.png"
                        alt="arrow-img"
                      ></img>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-50">
                <Link
                  className="view-more"
                  data-bs-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  See all positions
                </Link>
              </div>
              <div className="collapse" id="collapseExample">
                <div className="card card-body">
                  <div className="position-card">
                    <div className="position-main-bx d-flex flex-column flex-lg-row pt-50">
                      <div className="content d-flex flex-column  flex-grow-1">
                        <div className="year-title text-muted mb-4">/2025</div>
                        <h2 className="display-4 font-weight-bold mb-4 marcellus-regular">
                          CONTENT WRITER INTERN
                        </h2>
                        <div className="mb-2">Full Time</div>
                        <div className="mb-2">
                          Experienced: (3-5 years of experience)
                        </div>
                        <ul className="job-description-list mb-4">
                          <li>
                            Bachelor's degree in English, Communications, or a
                            related field.
                          </li>
                          <li>
                            Strong portfolio showcasing diverse writing samples.
                          </li>
                        </ul>
                        <div className="learn-more">
                          <span className="marcellus-regular">LEARN MORE</span>
                          <img
                            src="./assets/img/icon/up-arrow2.png"
                            alt="arrow-img"
                          ></img>
                        </div>
                      </div>
                      <div className="position-img flex-grow-1">
                        <img
                          src="./assets/img/careers/img1.webp"
                          alt="position-img"
                          className="img-fluid w-100 h-100 object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="position-card">
                    <div className="position-main-bx d-flex flex-column flex-lg-row pt-80">
                      <div className="position-img flex-grow-1">
                        <img
                          src="./assets/img/careers/img3.webp"
                          alt="position-img"
                          className="img-fluid w-100 h-100 object-cover"
                        />
                      </div>
                      <div className="content d-flex flex-column  flex-grow-1">
                        <div className="year-title text-muted mb-4">/2025</div>
                        <h2 className="display-4 font-weight-bold mb-4 marcellus-regular">
                          Photographer Intern
                        </h2>
                        <div className="mb-2">Full Time</div>
                        <div className="mb-2">
                          Experienced: (3-5 years of experience)
                        </div>
                        <ul className="job-description-list mb-4">
                          <li>
                            Strong portfolio in composition, lighting & editing.
                          </li>
                          <li>
                            Proficient in Lightroom, Photoshop & professional
                            cameras.
                          </li>
                        </ul>
                        <div className="learn-more">
                          <span className="marcellus-regular">LEARN MORE</span>
                          <img
                            src="./assets/img/icon/up-arrow2.png"
                            alt="arrow-img"
                          ></img>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabIndex="0"
            >
              <div className="position-card">
                <div className="position-main-bx d-flex flex-column flex-lg-row pt-50">
                  <div className="content d-flex flex-column  flex-grow-1">
                    <div className="year-title text-muted mb-4">/2025</div>
                    <h2 className="display-4 font-weight-bold mb-4 marcellus-regular">
                      CONTENT WRITER
                    </h2>
                    <div className="mb-2">Full Time</div>
                    <div className="mb-2">
                      Experienced: (3-5 years of experience)
                    </div>
                    <ul className="job-description-list mb-4">
                      <li>
                        Bachelor's degree in English, Communications, or a
                        related field.
                      </li>
                      <li>
                        Strong portfolio showcasing diverse writing samples.
                      </li>
                    </ul>
                    <div className="learn-more">
                      <span className="marcellus-regular">LEARN MORE</span>
                      <img
                        src="./assets/img/icon/up-arrow2.png"
                        alt="arrow-img"
                      ></img>
                    </div>
                  </div>
                  <div className="position-img flex-grow-1">
                    <img
                      src="./assets/img/careers/img1.webp"
                      alt="position-img"
                      className="img-fluid w-100 h-100 object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="position-card">
                <div className="position-main-bx d-flex flex-column flex-lg-row pt-80">
                  <div className="position-img flex-grow-1">
                    <img
                      src="./assets/img/careers/img3.webp"
                      alt="position-img"
                      className="img-fluid w-100 h-100 object-cover"
                    />
                  </div>
                  <div className="content d-flex flex-column  flex-grow-1">
                    <div className="year-title text-muted mb-4">/2025</div>
                    <h2 className="display-4 font-weight-bold mb-4 marcellus-regular">
                      Photographer
                    </h2>
                    <div className="mb-2">Full Time</div>
                    <div className="mb-2">
                      Experienced: (3-5 years of experience)
                    </div>
                    <ul className="job-description-list mb-4">
                      <li>
                        Strong portfolio in composition, lighting & editing.
                      </li>
                      <li>
                        Proficient in Lightroom, Photoshop & professional
                        cameras.
                      </li>
                    </ul>
                    <div className="learn-more">
                      <span className="marcellus-regular">LEARN MORE</span>
                      <img
                        src="./assets/img/icon/up-arrow2.png"
                        alt="arrow-img"
                      ></img>
                    </div>
                  </div>
                </div>
              </div>

              <div className="position-card">
                <div className="position-main-bx d-flex flex-column flex-lg-row pt-80">
                  <div className="content d-flex flex-column  flex-grow-1">
                    <div className="year-title text-muted mb-4">/2025</div>
                    <h2 className="display-4 font-weight-bold mb-4 marcellus-regular">
                      Videographer
                    </h2>
                    <div className="mb-2">Full Time</div>
                    <div className="mb-2">
                      Experienced: (1-3 years of experience)
                    </div>
                    <ul className="job-description-list mb-4">
                      <li>Experience in high-quality video shooting.</li>
                      <li>
                        Skilled in Premiere Pro & cinematography techniques.
                      </li>
                    </ul>
                    <div className="learn-more">
                      <span className="marcellus-regular">LEARN MORE</span>
                      <img
                        src="./assets/img/icon/up-arrow2.png"
                        alt="arrow-img"
                      ></img>
                    </div>
                  </div>
                  <div className="position-img flex-grow-1">
                    <img
                      src="./assets/img/careers/img2.webp"
                      alt="position-img"
                      className="img-fluid w-100 h-100 object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="position-card">
                <div className="position-main-bx d-flex flex-column flex-lg-row pt-80">
                  <div className="position-img flex-grow-1">
                    <img
                      src="./assets/img/careers/img3.webp"
                      alt="position-img"
                      className="img-fluid w-100 h-100 object-cover"
                    />
                  </div>
                  <div className="content d-flex flex-column  flex-grow-1">
                    <div className="year-title text-muted mb-4">/2025</div>
                    <h2 className="display-4 font-weight-bold mb-4 marcellus-regular">
                      Video Editor
                    </h2>
                    <div className="mb-2">Full Time</div>
                    <div className="mb-2">
                      Experienced: (1-3 years of experience)
                    </div>
                    <ul className="job-description-list mb-4">
                      <li>Strong storytelling & post-production skills.</li>
                      <li>
                        Proficient in Premiere Pro, After Effects & color
                        grading.
                      </li>
                    </ul>
                    <div className="learn-more">
                      <span className="marcellus-regular">LEARN MORE</span>
                      <img
                        src="./assets/img/icon/up-arrow2.png"
                        alt="arrow-img"
                      ></img>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-50">
                <Link
                  className="view-more"
                  data-bs-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  See all positions
                </Link>
              </div>
              <div className="collapse" id="collapseExample">
                <div className="card card-body">
                  <div className="position-card">
                    <div className="position-main-bx d-flex flex-column flex-lg-row pt-50">
                      <div className="content d-flex flex-column  flex-grow-1">
                        <div className="year-title text-muted mb-4">/2025</div>
                        <h2 className="display-4 font-weight-bold mb-4 marcellus-regular">
                          CONTENT WRITER
                        </h2>
                        <div className="mb-2">Full Time</div>
                        <div className="mb-2">
                          Experienced: (3-5 years of experience)
                        </div>
                        <ul className="job-description-list mb-4">
                          <li>
                            Bachelor's degree in English, Communications, or a
                            related field.
                          </li>
                          <li>
                            Strong portfolio showcasing diverse writing samples.
                          </li>
                        </ul>
                        <div className="learn-more">
                          <span className="marcellus-regular">LEARN MORE</span>
                          <img
                            src="./assets/img/icon/up-arrow2.png"
                            alt="arrow-img"
                          ></img>
                        </div>
                      </div>
                      <div className="position-img flex-grow-1">
                        <img
                          src="./assets/img/careers/img1.webp"
                          alt="position-img"
                          className="img-fluid w-100 h-100 object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="position-card">
                    <div className="position-main-bx d-flex flex-column flex-lg-row pt-80">
                      <div className="position-img flex-grow-1">
                        <img
                          src="./assets/img/careers/img3.webp"
                          alt="position-img"
                          className="img-fluid w-100 h-100 object-cover"
                        />
                      </div>
                      <div className="content d-flex flex-column  flex-grow-1">
                        <div className="year-title text-muted mb-4">/2025</div>
                        <h2 className="display-4 font-weight-bold mb-4 marcellus-regular">
                          Photographer
                        </h2>
                        <div className="mb-2">Full Time</div>
                        <div className="mb-2">
                          Experienced: (3-5 years of experience)
                        </div>
                        <ul className="job-description-list mb-4">
                          <li>
                            Strong portfolio in composition, lighting & editing.
                          </li>
                          <li>
                            Proficient in Lightroom, Photoshop & professional
                            cameras.
                          </li>
                        </ul>
                        <div className="learn-more">
                          <span className="marcellus-regular">LEARN MORE</span>
                          <img
                            src="./assets/img/icon/up-arrow2.png"
                            alt="arrow-img"
                          ></img>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
