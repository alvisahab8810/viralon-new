import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
export default function Employes() {
  return (
    <>
      <div className="employee_section ">
        <div className="container pt-80">
          <h2 className="text-center marcellus-regular">
            Hear From Our Employees
          </h2>

          <Swiper
            spaceBetween={20}
            centeredSlides={true}
            loop={true}
            slidesPerView={5}
            // autoplay={{
            //   delay: 2500,
            //   disableOnInteraction: false,
            // }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              240: {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              840: {
                slidesPerView: 1.7,
                spaceBetween: 20,
              },
              1240: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            modules={[Autoplay, Navigation]}
            className="swiper mySwiper emp-row pt-50"
          >
            <SwiperSlide className="emp-bx">
              <div className="employee_card">
                <img
                  alt="Employee 1"
                  height="100"
                  src="./assets/img/careers/riya.webp"
                  width="100"
                />

                <p>
                  Viralon offers a supportive environment and incredible
                  opportunities for growth and learning. It's been a rewarding
                  journey to develop my skills and contribute to meaningful
                  projects.
                </p>

                <h5 className="marcellus-regular">Riya Tiwari</h5>
                <h6 className="emp-desg">Graphic Designer</h6>
              </div>

              <div className="quote-bx">
                <img src="./assets/img/icon/quote.png" alt="Quote Icon"></img>
              </div>
            </SwiperSlide>
            <SwiperSlide className="emp-bx">
              <div className="employee_card">
                <img
                  alt="Employee 2"
                  height="100"
                  src="./assets/img/careers/deep.webp"
                  width="100"
                />

                <p>
                  Viralon has been a fantastic place to grow as a video editor.
                  The supportive environment and opportunities to work on
                  diverse projects have truly enhanced my creativity and skills.
                </p>

                <h5 className="marcellus-regular">Deep Sharma</h5>
                <h6 className="emp-desg">Sr. Motion Graphic Artist</h6>
              </div>
              <div className="quote-bx">
                <img src="./assets/img/icon/quote.png" alt="Quote Icon"></img>
              </div>
            </SwiperSlide>
            <SwiperSlide className="emp-bx">
              <div className="employee_card">
                <img
                  alt="Employee 4"
                  height="100"
                  src="./assets/img/careers/vaishu.webp"
                  width="100"
                />

                <p>
                  Joining Viralon as a new employee has been an exciting
                  experience. The welcoming environment and supportive team have
                  made it easy to settle in and start contributing creatively.
                </p>

                <h5 className="marcellus-regular">Vaishnavi Tiwari</h5>
                <h6 className="emp-desg">Graphic Designer</h6>
              </div>
              <div className="quote-bx">
                <img src="./assets/img/icon/quote.png" alt="Quote Icon"></img>
              </div>
            </SwiperSlide>
            <SwiperSlide className="emp-bx">
              <div className="employee_card">
                <img
                  alt="Employee 4"
                  height="100"
                  src="./assets/img/careers/anurag.webp"
                  width="100"
                />

                <p>
                  Working at Viralon has been an enriching experience. The
                  collaborative environment and focus on innovation have helped
                  me grow and stay ahead in the digital marketing landscape.
                </p>

                <h5 className="marcellus-regular">Anurag Srivastava</h5>
                <h6 className="emp-desg">Digital Marketing Executive </h6>
              </div>
              <div className="quote-bx">
                <img src="./assets/img/icon/quote.png" alt="Quote Icon"></img>
              </div>
            </SwiperSlide>
            <SwiperSlide className="emp-bx">
              <div className="employee_card">
                <img
                  alt="Employee 3"
                  height="100"
                  src="./assets/img/careers/riyaz.webp"
                  width="100"
                />

                <p>
                  Viralon provides an excellent platform for growth and
                  innovation. The collaborative environment and challenging
                  projects have helped me enhance my skills and excel in my role
                  as a developer.
                </p>

                <h5 className="marcellus-regular">Riyaz Ali</h5>
                <h6 className="emp-desg">Web Developer</h6>
              </div>
              <div className="quote-bx">
                <img src="./assets/img/icon/quote.png" alt="Quote Icon"></img>
              </div>
            </SwiperSlide>
            <SwiperSlide className="emp-bx">
              <div className="employee_card">
                <img
                  alt="Employee 1"
                  height="100"
                  src="./assets/img/careers/riya.webp"
                  width="100"
                />

                <p>
                  Viralon offers a supportive environment and incredible
                  opportunities for growth and learning. It's been a rewarding
                  journey to develop my skills and contribute to meaningful
                  projects.
                </p>

                <h5 className="marcellus-regular">Riya Tiwari</h5>
                <h6 className="emp-desg">Graphic Designer</h6>
              </div>

              <div className="quote-bx">
                <img src="./assets/img/icon/quote.png" alt="Quote Icon"></img>
              </div>
            </SwiperSlide>
            <SwiperSlide className="emp-bx">
              <div className="employee_card">
                <img
                  alt="Employee 2"
                  height="100"
                  src="./assets/img/careers/deep.webp"
                  width="100"
                />

                <p>
                  Viralon has been a fantastic place to grow as a video editor.
                  The supportive environment and opportunities to work on
                  diverse projects have truly enhanced my creativity and skills.
                </p>

                <h5 className="marcellus-regular">Deep Sharma</h5>
                <h6 className="emp-desg">Sr. Motion Graphic Artist</h6>
              </div>
              <div className="quote-bx">
                <img src="./assets/img/icon/quote.png" alt="Quote Icon"></img>
              </div>
            </SwiperSlide>
            <SwiperSlide className="emp-bx">
              <div className="employee_card">
                <img
                  alt="Employee 4"
                  height="100"
                  src="./assets/img/careers/vaishu.webp"
                  width="100"
                />

                <p>
                  Joining Viralon as a new employee has been an exciting
                  experience. The welcoming environment and supportive team have
                  made it easy to settle in and start contributing creatively.
                </p>

                <h5 className="marcellus-regular">Vaishnavi Tiwari</h5>
                <h6 className="emp-desg">Graphic Designer</h6>
              </div>
              <div className="quote-bx">
                <img src="./assets/img/icon/quote.png" alt="Quote Icon"></img>
              </div>
            </SwiperSlide>
            <SwiperSlide className="emp-bx">
              <div className="employee_card">
                <img
                  alt="Employee 4"
                  height="100"
                  src="./assets/img/careers/anurag.webp"
                  width="100"
                />

                <p>
                  Working at Viralon has been an enriching experience. The
                  collaborative environment and focus on innovation have helped
                  me grow and stay ahead in the digital marketing landscape.
                </p>

                <h5 className="marcellus-regular">Anurag Srivastava</h5>
                <h6 className="emp-desg">Digital Marketing Executive </h6>
              </div>
              <div className="quote-bx">
                <img src="./assets/img/icon/quote.png" alt="Quote Icon"></img>
              </div>
            </SwiperSlide>
            <SwiperSlide className="emp-bx">
              <div className="employee_card">
                <img
                  alt="Employee 3"
                  height="100"
                  src="./assets/img/careers/riyaz.webp"
                  width="100"
                />

                <p>
                  Viralon provides an excellent platform for growth and
                  innovation. The collaborative environment and challenging
                  projects have helped me enhance my skills and excel in my role
                  as a developer.
                </p>

                <h5 className="marcellus-regular">Riyaz Ali</h5>
                <h6 className="emp-desg">Web Developer</h6>
              </div>
              <div className="quote-bx">
                <img src="./assets/img/icon/quote.png" alt="Quote Icon"></img>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
