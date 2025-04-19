import React from 'react'

export default function Blogs() {
  return (
    <section className='blog-lists-section'>
      <div id="blog" className="blog-area pt-100 bottom-less" >
        <div className="container" >
            <div className="row" >
                <div className="col-lg-8 offset-lg-2" >
                    <div className="site-heading text-center" >
                        <h2>Latest Blogs</h2>
                        <div className="devider" ></div>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                        dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="container" >
            <div className="row" >

                {/* <!-- Single item --> */}
                <div className="single-item col-lg-4 col-md-6" >
                    <div className="item" >
                        <div className="thumb" >
                            <a href="#" ><img src="/assets/img/seo/blogs/1.jpg" alt="Thumb"/></a>
                            <div className="date" ><strong>18</strong> <span>Apr</span></div>
                        </div>
                        <div className="info" >
                            <div className="meta" >
                                <ul>
                                    <li>
                                        <a href="#"><i className="fas fa-user-circle"></i> User</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fas fa-comments"></i> 26 Comments</a>
                                    </li>
                                </ul>
                            </div>
                            <h4>
                                <a href="#" >Discovery earnestly public commanded mentions.</a>
                            </h4>
                            <p>
                                Possession ye no mr unaffected remarkably at. Wrote house in never fruit up. Pasture imagine my garrets.  
                            </p>
                        </div>
                    </div>
                </div>
                {/* <!-- End Single item --> */}

                {/* <!-- Single item --> */}
                <div className="single-item col-lg-4 col-md-6" >
                    <div className="item" >
                        <div className="thumb" >
                            <a href="#" ><img src="/assets/img/seo/blogs/2.jpg" alt="Thumb"/></a>
                            <div className="date" ><strong>25</strong> <span>Aug</span></div>
                        </div>
                        <div className="info" >
                            <div className="meta" >
                                <ul>
                                    <li>
                                        <a href="#"><i className="fas fa-user-circle"></i> Admin</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fas fa-comments"></i> 35 Comments</a>
                                    </li>
                                </ul>
                            </div>
                            <h4>
                                <a href="#" >Considered imprudence of he friendship boisterous.</a>
                            </h4>
                            <p>
                                Possession ye no mr unaffected remarkably at. Wrote house in never fruit up. Pasture imagine my garrets.  
                            </p>
                        </div>
                    </div>
                </div>
                {/* <!-- End Single item --> */}

                {/* <!-- Single item --> */}
                <div className="single-item col-lg-4 col-md-6" >
                    <div className="item" >
                        <div className="thumb" >
                            <a href="#" ><img src="/assets/img/seo/blogs/3.jpg" alt="Thumb"/></a>
                            <div className="date" ><strong>05</strong> <span>Jul</span></div>
                        </div>
                        <div className="info" >
                            <div className="meta" >
                                <ul>
                                    <li>
                                        <a href="#"><i className="fas fa-user-circle"></i> user</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fas fa-comments"></i> 12 Comments</a>
                                    </li>
                                </ul>
                            </div>
                            <h4>
                                <a href="#" >Overcame breeding or my concerns removing desirous.</a>
                            </h4>
                            <p>
                                Possession ye no mr unaffected remarkably at. Wrote house in never fruit up. Pasture imagine my garrets.  
                            </p>
                        </div>
                    </div>
                </div>
                {/* <!-- End Single item --> */}

            </div>
        </div>
    </div>
    </section>
  )
}
