import React from "react";
import Link from "next/link";

export default function Work() {
  return (
    <>
      <section className="work-area">
        <div className="container">
          <div className="container">
            <div className="row">
              {/* <!-- Column 1 --> */}
              <div className="col-md-6">
                <div className="image-container mb-4">
                  <Link href="https://rageemakeup.com/">
                    <img
                      src="./assets/img/our-work/img1.png"
                      alt="Ragee Makeup Website"
                    />
                    <div className="image-text">RAGEE MAKEUP</div>
                  </Link>
                </div>

                <div className="image-container mb-4">
                  <Link href="https://sapphireauditorium.com/">
                    <img
                      src="./assets/img/our-work/img4.png"
                      alt="Sapphire Auditorium"
                    />
                  </Link>
                </div>

                <div className="image-container mb-4">
                  <Link href="https://tourwatchout.com/">
                    <img
                      src="./assets/img/our-work/img5.png"
                      alt="Tourwatchout Website"
                    />
                    <div className="image-text">TOURWATCHOUT </div>
                  </Link>
                </div>

                <div className="image-container mb-4">
                  <Link href="http://www.hitechindustries.net.in/ass_items.php">
                    <img
                      src="./assets/img/our-work/img8.png"
                      alt="Hitech Website"
                    />
                  </Link>
                </div>
              </div>
              {/* <!-- Column 2 --> */}
              <div className="col-md-6">
                <div className="image-container mb-4">
                  <Link href="https://rageemakeup.com/">
                    <img
                      src="./assets/img/our-work/img2.png"
                      alt="Ragee Makeup "
                    />
                  </Link>
                </div>
                {/* <!-- Colomoto Website --> */}
                <div className="image-container mb-4">
                  <Link href="http://www.hitechindustries.net.in/ass_items.php">
                    <img
                      src="./assets/img/our-work/img3.png"
                      alt="Hitech Industries "
                    />
                    <div className="image-text">HITECH INDUSTRY</div>
                  </Link>
                </div>

                <div className="image-container mb-4">
                  <Link href="https://tourwatchout.com/">
                    <img
                      src="./assets/img/our-work/img6.png"
                      alt="Tourwatchout  "
                    />
                    {/* <div className="image-text">HiTech Industry
                  </div> */}
                  </Link>
                </div>

                <div className="image-container mb-4">
                  <Link href="http://colomoto.in/">
                    <img src="./assets/img/our-work/img7.png" alt="ColoMoto" />
                    <div className="image-text">COLOMOTO</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
