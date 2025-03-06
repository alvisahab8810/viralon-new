import React from "react";
import Link from "next/link";
export default function Hero() {
  return (
    <>
      <div className="height-auto accrdion-portfolio-area">
        <div className="container">
          {/* <div 
  className="banner-style-one" 
  style={{ backgroundImage: "url(/assets/img/shape/1.png)" }}
>
</div> */}

          <div className="row align-center">
            <div className="col-lg-8 banner-one-item">
              <h4>Creative digital studio</h4>
              <h2>
                Brands made <strong>Iconic!</strong>
              </h2>
            </div>
            <div className="col-lg-3 offset-lg-1 banner-one-item text-center">
              <div className="choose-us-style-one-thumb">
                <a
                  href="https://www.youtube.com/watch?v=ipUuoMCEbDQ"
                  className="popup-youtube video-play-button"
                >
                  <i className="fas fa-play"></i>
                  <div className="effect"></div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- ACCORDION ROW --> */}
        <div className="container-fluid">
          <div className="row">
            <ul className="accordion-portfolio-lists text-light" id="accordion">
              <li
                style={{
                  backgroundImage: "url('assets/img/portfolio/h1.jpg')",
                }}
              >
                <h3>Marketing</h3>
                <span>01</span>
                <div className="accordion-overlay">
                  <span>Design</span>
                  <h2>
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#projectSingleModal"
                    >
                      Art Vectors & Illustrationst
                    </a>
                  </h2>
                  <p>
                    Seeing rather her you not esteem men settle genius excuse.{" "}
                    <br /> Deal say over you age from. Comparison new hormonic
                    melancholy.
                  </p>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#projectSingleModal"
                  >
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </li>
              <li
                className="out"
                style={{
                  backgroundImage: "url('assets/img/portfolio/h2.jpg')",
                }}
              >
                <h3>Artboard Studio</h3>
                <span>02</span>
                <div className="accordion-overlay">
                  <span>Branding</span>
                  <h2>
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#projectSingleModal"
                    >
                      Downtown Austin & Studio
                    </a>
                  </h2>
                  <p>
                    Seeing rather her you not esteem men settle genius excuse.{" "}
                    <br /> Deal say over you age from. Comparison new hormonic
                    melancholy.
                  </p>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#projectSingleModal"
                  >
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </li>
              <li
                style={{
                  backgroundImage: "url('assets/img/portfolio/h3.jpg')",
                }}
              >
                <h3>Creative Ideas</h3>
                <span>03</span>
                <div className="accordion-overlay">
                  <span>Photo</span>
                  <h2>
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#projectSingleModal"
                    >
                      Creative Project Ideas
                    </a>
                  </h2>
                  <p>
                    Seeing rather her you not esteem men settle genius excuse.{" "}
                    <br /> Deal say over you age from. Comparison new hormonic
                    melancholy.
                  </p>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#projectSingleModal"
                  >
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </li>
              <li
                style={{
                  backgroundImage: "url('assets/img/portfolio/h4.jpg')",
                }}
              >
                <h3>Branding</h3>
                <span>04</span>
                <div className="accordion-overlay">
                  <span>Creative</span>
                  <h2>
                    <a
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#projectSingleModal"
                    >
                      Digital Branding & Marketing
                    </a>
                  </h2>
                  <p>
                    Seeing rather her you not esteem men settle genius excuse.{" "}
                    <br /> Deal say over you age from. Comparison new hormonic
                    melancholy.
                  </p>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#projectSingleModal"
                  >
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          {/* <!-- BEGIN NEW ROW AFTER ACCORDION --> */}
        </div>
      </div>

      <div
        className="popup-single-modal modal fade text-light"
        id="projectSingleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-body">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="project-details-items">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="project-thumb">
                      <img src="assets/img/portfolio/14.jpg" alt="Thumb" />
                    </div>
                  </div>
                  <div className="col-xl-10 offset-xl-1">
                    <div className="project-details mt-40">
                      <div className="top-info">
                        <div className="row">
                          <div className="col-lg-4 order-lg-last">
                            <ul className="gallery-project-basic-info">
                              <li>
                                <div className="info">
                                  Clients: <span>validthemes</span>
                                </div>
                              </li>
                              <li>
                                <div className="info">
                                  Project Type: <span>Website Growth</span>
                                </div>
                              </li>
                              <li>
                                <div className="info">
                                  Date: <span>25 August, 2024</span>
                                </div>
                              </li>
                              <li>
                                <div className="info">
                                  Address: <span>New York United state</span>
                                </div>
                              </li>
                            </ul>
                          </div>

                          <div className="col-lg-8">
                            <h2>The best digital solutions</h2>
                            <p>
                              Netus lorem rutrum arcu dignissim at sit morbi
                              phasellus nascetur eget urna potenti cum
                              vestibulum cras. Tempor nonummy metus lobortis.
                              Sociis velit etiam, dapibus. Lectus vehicula
                              pellentesque cras posuere tempor facilisi habitant
                              lectus rutrum pede quisque hendrerit parturient
                              posuere mauris ad elementum fringilla facilisi
                              volutpat fusce pharetra felis sapien varius
                              quisque className convallis praesent est
                              sollicitudin donec nulla venenatis, cursus
                              fermentum netus posuere sociis porta risus
                              habitant malesuada nulla habitasse hymenaeos.
                              Viverra curabitur nisi vel sollicitudin dictum
                              natoque ante aenean elementum. Side in so life
                              past. Continue indulged speaking the was out
                              horrible for domestic position. Seeing rather her
                              you not esteem men settle genius excuse. Deal say
                              over you age from.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-40 mb-40">
                        <div className="col-lg-5 pr-50 pr-md-15 pr-xs-15">
                          <div className="check-list">
                            <div className="single-list">
                              <h4>Mobile Optimization</h4>
                              <p>
                                Tempor nonummy metus lobortis. Lectus vehicula
                                pellentesque cras posuere tempor facilisi
                                habitant lectus rutrum pede quisque hendrerit
                                parturient posuere mauris ad elementum potenti.
                              </p>
                            </div>
                            <div className="single-list">
                              <h4>Marketing Automation</h4>
                              <ul className="list-disc">
                                <li>Social media marketing</li>
                                <li>Search engine optimization (seo)</li>
                                <li>Public Relations</li>
                                <li>Content marketing</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-7">
                          <div className="thumb-grid">
                            <img
                              src="assets/img/portfolio/v1.jpg"
                              alt="Thumb"
                            />
                            <img
                              src="assets/img/portfolio/v2.jpg"
                              alt="Thumb"
                            />
                          </div>
                        </div>
                      </div>

                      <p>
                        Give lady of they such they sure it. Me contained
                        explained my education. Vulgar as hearts by garret.
                        Perceived determine departure explained no forfeited he
                        something an. Contrasted dissimilar get joy you
                        instrument out reasonably. Again keeps at no meant
                        stuff. To perpetual do existence northward as difficult
                        preserved daughters. Continued at up to zealously
                        necessary breakfast. Surrounded sir motionless she end
                        literature. Gay direction neglected but supported yet
                        her. Facilisis inceptos nec, potenti nostra aenean
                        lacinia varius semper ant nullam nulla primis placerat
                        facilisis. Netus lorem rutrum arcu dignissim at sit
                        morbi phasellus nascetur eget urna potenti cum
                        vestibulum cras. Tempor nonummy metus lobortis. Sociis
                        velit etiam, dapibus. Lectus vehicula pellentesque cras
                        posuere tempor facilisi habitant lectus rutrum pede
                        quisque hendrerit parturient posuere mauris ad elementum
                        fringilla facilisi volutpat fusce pharetra felis sapien
                        varius quisque className convallis praesent est
                        sollicitudin donec nulla venenatis, cursus fermentum
                        netus posuere sociis porta risus habitant malesuada
                        nulla habitasse hymenaeos. Viverra curabitur nisi vel
                        sollicitudin dictum natoque ante aenean elementum curae
                        malesuada ullamcorper.
                      </p>
                      <div className="row mt-50 mt-xs-30">
                        <div className="col-lg-6 col-md-6">
                          <img src="assets/img/portfolio/11.jpg" alt="Thumb" />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-xs-30">
                          <img src="assets/img/portfolio/12.jpg" alt="Thumb" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
