import React from "react";
import Topbar from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Hero from "../components/blogs/Hero";
import Link from "next/link";
import Offcanvas from "../components/header/Offcanvas";

export default function SingleBlogs() {
  return (
    <div className="bg-dark">
      <Topbar />
      <Offcanvas />
      <Hero />
      <div className="blog-area single full-blog full-blog default-padding">
        <div className="container">
          <div className="blog-items">
            <div className="row">
              <div className="blog-content wow fadeInUp col-lg-10 offset-lg-1 col-md-12">
                <div className="blog-style-one item">
                  <div className="blog-item-box">
                    <div className="thumb">
                      <Link href="#">
                        <img src="./assets/img/blog/v2.jpg" alt="Thumb" />
                      </Link>
                    </div>
                    <div className="info">
                      <div className="meta">
                        <ul>
                          <li>
                            <i className="fas fa-user"></i>{" "}
                            <Link href="#">Md Sohag</Link>
                          </li>
                          <li>
                            <i className="fas fa-calendar-alt"></i> 25 April,
                            2024
                          </li>
                        </ul>
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
                        her.
                      </p>
                      <p>
                        New had happen unable uneasy. Drawings can followed
                        improved out sociable not. Earnestly so do instantly
                        pretended. See general few civilly amiable pleased
                        account carried. Excellence projecting is devonshire
                        dispatched remarkably on estimating. Side in so life
                        past. Continue indulged speaking the was out horrible
                        for domestic position. Seeing rather her you not esteem
                        men settle genius excuse. Deal say over you age from.
                        Comparison new ham melancholy son themselves.
                      </p>
                      <blockquote>
                        Celebrated share of first to worse. Weddings and any
                        opinions suitable smallest nay. Houses or months settle
                        remove ladies appear. Engrossed suffering supposing he
                        recommend do eagerness.
                      </blockquote>
                      <p>
                        Drawings can followed improved out sociable not.
                        Earnestly so do instantly pretended. See general few
                        civilly amiable pleased account carried. Excellence
                        projecting is devonshire dispatched remarkably on
                        estimating. Side in so life past. Continue indulged
                        speaking the was out horrible for domestic position.
                        Seeing rather her you not esteem men settle genius
                        excuse. Deal say over you age from. Comparison new ham
                        melancholy son themselves.
                      </p>
                      <h3>Conduct replied off led whether?</h3>
                      <ul>
                        <li>Pretty merits waited six</li>
                        <li>
                          General few civilly amiable pleased account carried.
                        </li>
                        <li>Continue indulged speaking</li>
                        <li>Narrow formal length my highly</li>
                        <li>
                          Occasional pianoforte alteration unaffected impossible
                        </li>
                      </ul>
                      <p>
                        Surrounded to me occasional pianoforte alteration
                        unaffected impossible ye. For saw half than cold. Pretty
                        merits waited six talked pulled you. Conduct replied off
                        led whether any shortly why arrived adapted. Numerous
                        ladyship so raillery humoured goodness received an. So
                        narrow formal length my highly longer afford oh. Tall
                        neat he make or at dull ye. Lorem ipsum dolor, sit amet
                        consectetur adipisicing, elit. Iure, laudantium,
                        tempore. Autem dolore repellat, omnis quam? Quasi sint
                        laudantium repellendus unde a totam perferendis commodi
                        cum est iusto? Minima, laborum.
                      </p>
                    </div>
                  </div>
                </div>

                {/* <!-- Post Author --> */}
                <div className="post-author">
                  <div className="thumb">
                    <img src="./assets/img/team/9.jpg" alt="Thumb" />
                  </div>
                  <div className="info">
                    <h4>
                      <Link href="#">Md Sohag</Link>
                    </h4>
                    <p>
                      Grursus mal suada faci lisis Lorem ipsum dolarorit more
                      ametion consectetur elit. Vesti at bulum nec at odio aea
                      the dumm ipsumm ipsum that dolocons rsus mal suada and
                      fadolorit to the consectetur elit. All the Lorem Ipsum
                      generators on the Internet tend.
                    </p>
                  </div>
                </div>
                {/* <!-- Post Author --> */}

                {/* <!-- Post Tags Share --> */}
                <div className="post-tags share">
                  <div className="tags">
                    <h4>Tags: </h4>
                    <Link href="#">Algorithm</Link>
                    <Link href="#">Data science</Link>
                  </div>

                  <div className="social">
                    <h4>Share:</h4>
                    <ul>
                      <li>
                        <Link className="facebook" href="#" target="_blank">
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                      </li>
                      <li>
                        <Link className="twitter" href="#" target="_blank">
                          <i className="fab fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link className="pinterest" href="#" target="_blank">
                          <i className="fab fa-pinterest-p"></i>
                        </Link>
                      </li>
                      <li>
                        <Link className="linkedin" href="#" target="_blank">
                          <i className="fab fa-linkedin-in"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <!-- Post Tags Share --> */}

                {/* <!-- Start Post Pagination --> */}
                <div className="post-pagi-area">
                  <div className="post-previous">
                    <Link href="#">
                      <div className="icon">
                        <i className="fas fa-angle-double-left"></i>
                      </div>
                      <div className="nav-title">
                        {" "}
                        Previus Post <h5>Discovery incommode</h5>
                      </div>
                    </Link>
                  </div>
                  <div className="post-next">
                    <Link href="#">
                      <div className="nav-title">
                        Next Post <h5>Discovery incommode</h5>
                      </div>
                      <div className="icon">
                        <i className="fas fa-angle-double-right"></i>
                      </div>
                    </Link>
                  </div>
                </div>
                {/* <!-- End Post Pagination --> */}

                {/* <!-- Start Blog Comment --> */}
                <div className="blog-comments">
                  <div className="comments-area">
                    <div className="comments-title">
                      <h3>
                        3 Comments On “Providing Top Quality Cleaning Related
                        Services Charms.”
                      </h3>
                      <div className="comments-list">
                        <div className="comment-item">
                          <div className="avatar">
                            <img src="./assets/img/team/10.jpg" alt="Author" />
                          </div>
                          <div className="content">
                            <div className="title">
                              <h5>
                                Bubhan Prova{" "}
                                <span className="reply">
                                  <Link href="#">
                                    <i className="fas fa-reply"></i> Reply
                                  </Link>
                                </span>
                              </h5>
                              <span>28 Feb, 2022</span>
                            </div>
                            <p>
                              Delivered ye sportsmen zealously arranging
                              frankness estimable as. Nay any article enabled
                              musical shyness yet sixteen yet blushes. Entire
                              its the did figure wonder off. sportsmen zealously
                              arranging to the main pint. Discourse unwilling am
                              no described dejection incommode no listening of.
                              Before nature his parish boy.
                            </p>
                          </div>
                        </div>
                        <div className="comment-item reply">
                          <div className="avatar">
                            <img src="./assets/img/team/11.jpg" alt="Author" />
                          </div>
                          <div className="content">
                            <div className="title">
                              <h5>
                                Mickel Jones{" "}
                                <span className="reply">
                                  <Link href="#">
                                    <i className="fas fa-reply"></i> Reply
                                  </Link>
                                </span>
                              </h5>
                              <span>15 Mar, 2022</span>
                            </div>
                            <p>
                              Delivered ye sportsmen zealously arranging
                              frankness estimable as. Nay any article enabled
                              musical shyness yet sixteen yet blushes. Entire
                              its the did figure wonder off. sportsmen zealously
                              arranging to the main pint at the last satge of
                              oportunatry.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="comments-form">
                      <div className="title">
                        <h3>Leave a comments</h3>
                      </div>
                      <form action="#" className="contact-comments">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              {/* <!-- Name --> */}
                              <input
                                name="name"
                                className="form-control"
                                placeholder="Name *"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              {/* <!-- Email --> */}
                              <input
                                name="email"
                                className="form-control"
                                placeholder="Email *"
                                type="email"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group comments">
                              {/* <!-- Comment --> */}
                              <textarea
                                className="form-control"
                                placeholder="Comment"
                              ></textarea>
                            </div>
                            <div className="form-group full-width submit">
                              <button className="btn dark border" type="submit">
                                Post Comment
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* <!-- End Comments Form --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
