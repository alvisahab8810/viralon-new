import React from "react";
import Link from "next/link";

export default function BlogList() {
  return (
    <>
       <div className="blog-area blog-grid-colum default-padding">
        <div className="container">
            <div className="row">
                {/* <!-- Single Item --> */}
                <div className="col-lg-4 col-md-6 mb-50">
                    <div className="blog-style-one">
                        <div className="thumb">
                            <Link href="/single-blogs"><img src="./assets/img/blog/1.jpg" alt="Image Not Found"/></Link>
                        </div>
                        <div className="info">
                            <div className="meta">
                                <ul>
                                    <li>
                                        <Link href="/single-blogs">Md Sohag</Link>
                                    </li>
                                    <li>
                                        25 April, 2024
                                    </li>
                                </ul>
                            </div>
                            <h3 className="post-title"><Link href="/single-blogs">Miscovery incommode earnestly is commanded</Link></h3>
                            <Link href="/single-blogs" className="button-regular">
                                Continue Reading <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <!-- End Single Item --> */}
                {/* <!-- Single Item --> */}
                <div className="col-lg-4 col-md-6 mb-50">
                    <div className="blog-style-one">
                        <div className="thumb">
                            <Link href="/single-blogs"><img src="./assets/img/blog/2.jpg" alt="Image Not Found"/></Link>
                        </div>
                        <div className="info">
                            <div className="meta">
                                <ul>
                                    <li>
                                        <Link href="/single-blogs">Md Sohag</Link>
                                    </li>
                                    <li>
                                        25 April, 2024
                                    </li>
                                </ul>
                            </div>
                            <h3 className="post-title"><Link href="/single-blogs">Expression acceptance imprudence in mentions.</Link></h3>
                            <Link href="/single-blogs" className="button-regular">
                                Continue Reading <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <!-- End Single Item --> */}
                {/* <!-- Single Item --> */}
                <div className="col-lg-4 col-md-6 mb-50">
                    <div className="blog-style-one">
                        <div className="thumb">
                            <Link href="/single-blogs"><img src="./assets/img/blog/3.jpg" alt="Image Not Found"/></Link>
                        </div>
                        <div className="info">
                            <div className="meta">
                                <ul>
                                    <li>
                                        <Link href="/single-blogs">Md Sohag</Link>
                                    </li>
                                    <li>
                                        25 April, 2024
                                    </li>
                                </ul>
                            </div>
                            <h3 className="post-title"><Link href="/single-blogs">Considered imprudence of technical friendship.</Link></h3>
                            <Link href="/single-blogs" className="button-regular">
                                Continue Reading <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <!-- End Single Item --> */}
                {/* <!-- Single Item --> */}
                <div className="col-lg-4 col-md-6 mb-50">
                    <div className="blog-style-one">
                        <div className="thumb">
                            <Link href="/single-blogs"><img src="./assets/img/blog/4.jpg" alt="Image Not Found"/></Link>
                        </div>
                        <div className="info">
                            <div className="meta">
                                <ul>
                                    <li>
                                        <Link href="/single-blogs">Md Sohag</Link>
                                    </li>
                                    <li>
                                        25 April, 2024
                                    </li>
                                </ul>
                            </div>
                            <h3 className="post-title"><Link href="/single-blogs">Miscovery incommode earnestly is commanded</Link></h3>
                            <Link href="/single-blogs" className="button-regular">
                                Continue Reading <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <!-- End Single Item --> */}
                {/* <!-- Single Item --> */}
                <div className="col-lg-4 col-md-6 mb-50">
                    <div className="blog-style-one">
                        <div className="thumb">
                            <Link href="/single-blogs"><img src="./assets/img/blog/5.jpg" alt="Image Not Found"/></Link>
                        </div>
                        <div className="info">
                            <div className="meta">
                                <ul>
                                    <li>
                                        <Link href="/single-blogs">Md Sohag</Link>
                                    </li>
                                    <li>
                                        25 April, 2024
                                    </li>
                                </ul>
                            </div>
                            <h3 className="post-title"><Link href="/single-blogs">Expression acceptance imprudence in mentions.</Link></h3>
                            <Link href="/single-blogs" className="button-regular">
                                Continue Reading <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <!-- End Single Item --> */}
                {/* <!-- Single Item --> */}
                <div className="col-lg-4 col-md-6 mb-50">
                    <div className="blog-style-one">
                        <div className="thumb">
                            <Link href="/single-blogs"><img src="./assets/img/blog/6.jpg" alt="Image Not Found"/></Link>
                        </div>
                        <div className="info">
                            <div className="meta">
                                <ul>
                                    <li>
                                        <Link href="/single-blogs">Md Sohag</Link>
                                    </li>
                                    <li>
                                        25 April, 2024
                                    </li>
                                </ul>
                            </div>
                            <h3 className="post-title"><Link href="/single-blogs">Considered imprudence of technical friendship.</Link></h3>
                            <Link href="/single-blogs" className="button-regular">
                                Continue Reading <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <!-- End Single Item --> */}
            </div>
         
        </div>
    </div>
    </>
  );
}
