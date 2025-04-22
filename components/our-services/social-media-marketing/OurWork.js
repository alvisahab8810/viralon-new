import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css/free-mode";
import { Autoplay, Navigation, FreeMode, Pagination } from "swiper/modules";
export default function OurWork() {
  return (
    <div className="our-work-primary">
      <section className="our-work-section pt-100">
        <div className="container">
          <div className="row align-center  m-auto">
            <div className="col-lg-7 banner-one-item">
              <h2>
                Have a look at <strong>Our work</strong>
              </h2>
              <img src="/assets/img/icon/arrow.png" alt="Aroow"></img>
            </div>
         
          </div>
        </div>

        {/* <!-- Start Services
    ============================================= --> */}
        <div className="creative-services-area overflow-hidden pt-50">
        

          <div className="container">
            <div className="row">
              <div className="our-work-row mobile-none">
                <div className="our-work-items">
                    <img src="/assets/img/our-services/smm/img1.png" alt="Our Work Image"></img>
                </div>

                <div className="our-work-items">
                    <img src="/assets/img/our-services/smm/img2.png" alt="Our Work Image"></img>
                </div>

                <div className="our-work-items">
                    <img src="/assets/img/our-services/smm/img3.png" alt="Our Work Image"></img>
                </div>


                <div className="our-work-items">
                    <img src="/assets/img/our-services/smm/img4.png" alt="Our Work Image"></img>
                </div>


                <div className="our-work-items">
                    <img src="/assets/img/our-services/smm/img5.png" alt="Our Work Image"></img>
                </div>


                <div className="our-work-items mt-15">
                    <img src="/assets/img/our-services/smm/img1.png" alt="Our Work Image"></img>
                </div>

                <div className="our-work-items mt-15">
                    <img src="/assets/img/our-services/smm/img2.png" alt="Our Work Image"></img>
                </div>

                <div className="our-work-items mt-15">
                    <img src="/assets/img/our-services/smm/img3.png" alt="Our Work Image"></img>
                </div>


                <div className="our-work-items mt-15">
                    <img src="/assets/img/our-services/smm/img4.png" alt="Our Work Image"></img>
                </div>


                <div className="our-work-items mt-15">
                    <img src="/assets/img/our-services/smm/img5.png" alt="Our Work Image"></img>
                </div>
               
              </div>



              <div className="company-list desktop-none  our-work-mobile">
                    <div
                      className="scroller"
                      data-direction="left"
                      data-speed="slow"
                      data-lag="0"
                      data-animated="true"
                    >
                      <div className="scroller__inner">

                      <div className="our-work-items">
                          <img src="/assets/img/our-services/smm/img1.png" alt="Our Work Image"></img>
                      </div>

                      <div className="our-work-items">
                          <img src="/assets/img/our-services/smm/img1.png" alt="Our Work Image"></img>
                      </div>


                      <div className="our-work-items">
                          <img src="/assets/img/our-services/smm/img1.png" alt="Our Work Image"></img>
                      </div>


                      <div className="our-work-items">
                          <img src="/assets/img/our-services/smm/img1.png" alt="Our Work Image"></img>
                      </div>


                      <div className="our-work-items">
                          <img src="/assets/img/our-services/smm/img1.png" alt="Our Work Image"></img>
                      </div>


                      <div className="our-work-items">
                          <img src="/assets/img/our-services/smm/img1.png" alt="Our Work Image"></img>
                      </div>


                      <div className="our-work-items">
                          <img src="/assets/img/our-services/smm/img1.png" alt="Our Work Image"></img>
                      </div>


                      <div className="our-work-items">
                          <img src="/assets/img/our-services/smm/img1.png" alt="Our Work Image"></img>
                      </div>


                      <div className="our-work-items">
                          <img src="/assets/img/our-services/smm/img1.png" alt="Our Work Image"></img>
                      </div>


                      <div className="our-work-items">
                          <img src="/assets/img/our-services/smm/img1.png" alt="Our Work Image"></img>
                      </div>
                      
                      </div>
                    </div>
                  </div>
            </div>
          </div>
        </div>
        {/* <!-- End Services --> */}
      </section>
    </div>
  );
}
