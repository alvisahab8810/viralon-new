// import React from "react";
// import Link from "next/link";
// import Head from "next/head";

// export default function ThankYou() {
//   return (
//     <>
//       <Head>
//         <title>Thank You</title>
//         <meta
//           name="description"
//           content="Your submission has been received successfully."
//         />
//         <link
//           href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
//           rel="stylesheet"
//           integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
//           crossorigin="anonymous"
//         />
//         <link
//           rel="icon"
//           type="image/x-icon"
//           href="/assets/images/favicon-32x32.png"
//         />
//       </Head>

//       <section className="thank-you-wrapper">
//         <div className="container">
//           <div className="row">
//             <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
//               <div className="thank-you-page-logo">
//                 <Link href="/">
//                   <img src="../assetss/images/logo.png" alt="Viralon Logo" />
//                 </Link>
//               </div>

//               <div className="thank-you-page-content">
//                 <h1>
//                   Your submission is received and we will contact you soon
//                 </h1>
//                 <Link href="/" className="thankyou-btn arrow-icon">
//                   Go back to Homepage
//                 </Link>
//               </div>

//               <div className="thank-you-copy">
//                 <p>
//                   &copy; {new Date().getFullYear()} Viralon Digital Services
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <style jsx>{`
//         /* thank you page design */
//         html,
//         body {
//           height: 100%;
//         }

//         .thank-you-wrapper {
//           position: relative;
//           height: 100%;
//           text-align: center;
//           background-color: #f2f2f2;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 40px 20px;
//         }

//         .thank-you-wrapper > .container {
//           width: 780px;
//           margin: 0 auto;
//         }

//         .thank-you-page-logo img {
//           width: 150px;
//         }

//         .thank-you-page-content {
//           position: relative;
//           width: 100%;
//           background: #f2f2f2;
//           padding: 90px;
//           margin: 30px 0;
//           box-sizing: border-box;
//           box-shadow: 0 15px 10px rgba(119, 119, 119, 0.3);
//         }

//         .thank-you-page-content h1 {
//           position: relative;
//           width: 100%;
//           margin-bottom: 45px;
//           padding-top: 110px;
//           font-size: 30px;
//           font-weight: 300;
//           line-height: 40px;
//           color: #333;
//         }

//         .thank-you-page-content h1::before {
//           content: "\f00c";
//           top: 0;
//           left: 50%;
//           transform: translateX(-50%);
//           position: absolute;
//           font-family: "FontAwesome";
//           font-size: 60px;
//           color: green;
//           height: 100px;
//           width: 100px;
//           border: 2px solid green;
//           border-radius: 50%;
//           line-height: 100px;
//           text-align: center;
//         }

//         .thank-you-wrapper .thankyou-btn {
//           display: inline-block;
//           background-color: #ff5702 !important;
//           color: #fff;
//           text-decoration: none;
//           border: none;
//           padding: 13px 25px 13px 55px;
//           border-radius: 4px;
//           font-size: 16px;
//           font-weight: 500;
//           cursor: pointer;
//           position: relative;
//           transition: all 0.3s ease;
//         }

//         .thankyou-btn:hover {
//           background-color: #e64a00;
//           transform: translateY(-2px);
//         }

//         .arrow-icon::before {
//           position: absolute;
//           left: 25px;
//           top: 20px;
//           content: "";
//           display: inline-block;
//           height: 10px;
//           width: 10px;
//           border-style: solid;
//           border-color: #fff;
//           border-width: 0px 1px 1px 0px;
//           transform: rotate(131deg);
//           transition: border-width 150ms ease-in-out;
//         }

//         .arrow-icon::after {
//           content: "";
//           display: inline-block;
//           width: 20px;
//           background-color: #fff;
//           height: 1px;
//           position: absolute;
//           left: 25px;
//           top: 25px;
//         }

//         .thank-you-copy {
//           margin-top: 20px;
//         }

//         .thank-you-copy p {
//           margin: 0;
//           padding: 0;
//           font-size: 15px;
//           color: #666;
//         }

//         @media (max-width: 768px) {
//           .thank-you-page-content {
//             padding: 50px 25px;
//           }

//           .thank-you-page-content h1 {
//             font-size: 24px;
//             padding-top: 80px;
//           }

//           .thankyou-btn {
//             padding: 10px 20px 10px 50px;
//             font-size: 14px;
//           }
//         }
//       `}</style>
//     </>
//   );
// }




import React, { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

export default function ThankYou() {
  useEffect(() => {
    // ❄️ Disable refresh (F5, Ctrl+R, Cmd+R)
    const disableRefresh = (e) => {
      if (
        e.key === "F5" ||
        (e.ctrlKey && e.key.toLowerCase() === "r") ||
        (e.metaKey && e.key.toLowerCase() === "r")
      ) {
        e.preventDefault();
        alert("Page refresh is disabled on this page.");
      }
    };

    // ❄️ Disable right-click
    const disableRightClick = (e) => e.preventDefault();

    window.addEventListener("keydown", disableRefresh);
    window.addEventListener("contextmenu", disableRightClick);

    return () => {
      window.removeEventListener("keydown", disableRefresh);
      window.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);


  useEffect(() => {
    // ✅ Cleanup for leftover Bootstrap modal & backdrop
    const cleanModalArtifacts = () => {
      // remove modal-open class & inline styles from body
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      // remove any modal backdrops left behind
      const backdrops = document.querySelectorAll(".modal-backdrop");
      backdrops.forEach((el) => el.remove());
    };

    cleanModalArtifacts();

    // optional safety: run again after small delay
    const timer = setTimeout(cleanModalArtifacts, 300);
    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      <Head>
        <title>Thank You</title>
        <meta
          name="description"
          content="Your submission has been received successfully."
        />
        <link
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
          integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
          crossOrigin="anonymous"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="/assets/images/favicon-32x32.png"
        />
      </Head>

      <section className="thank-you-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="thank-you-page-logo">
                <Link href="/">
                  <img src="../assetss/images/logo.png" alt="Viralon Logo" />
                </Link>
              </div>

              <div className="thank-you-page-content">
                <h1>
                  Your submission is received and we will contact you soon
                </h1>
                <Link href="/" className="thankyou-btn arrow-icon">
                  Go back to Homepage
                </Link>
              </div>

              <div className="thank-you-copy">
                <p>
                  &copy; {new Date().getFullYear()} Viralon Digital Services
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* thank you page design */
        html,
        body {
          height: 100%;
        }

        .thank-you-wrapper {
          position: relative;
          height: 100%;
          text-align: center;
          background-color: #f2f2f2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .thank-you-wrapper > .container {
          width: 780px;
          margin: 0 auto;
        }

        .thank-you-page-logo img {
          width: 150px;
        }

        .thank-you-page-content {
          position: relative;
          width: 100%;
          background: #f2f2f2;
          padding: 90px;
          margin: 30px 0;
          box-sizing: border-box;
          box-shadow: 0 15px 10px rgba(119, 119, 119, 0.3);
        }

        .thank-you-page-content h1 {
          position: relative;
          width: 100%;
          margin-bottom: 45px;
          padding-top: 110px;
          font-size: 30px;
          font-weight: 300;
          line-height: 40px;
          color: #333;
        }

        .thank-you-page-content h1::before {
          content: "\f00c";
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          position: absolute;
          font-family: "FontAwesome";
          font-size: 60px;
          color: green;
          height: 100px;
          width: 100px;
          border: 2px solid green;
          border-radius: 50%;
          line-height: 100px;
          text-align: center;
        }

        .thank-you-wrapper .thankyou-btn {
          display: inline-block;
          background-color: #ff5702 !important;
          color: #fff;
          text-decoration: none;
          border: none;
          padding: 13px 25px 13px 55px;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }

        .thankyou-btn:hover {
          background-color: #e64a00;
          transform: translateY(-2px);
        }

        .arrow-icon::before {
          position: absolute;
          left: 25px;
          top: 20px;
          content: "";
          display: inline-block;
          height: 10px;
          width: 10px;
          border-style: solid;
          border-color: #fff;
          border-width: 0px 1px 1px 0px;
          transform: rotate(131deg);
          transition: border-width 150ms ease-in-out;
        }

        .arrow-icon::after {
          content: "";
          display: inline-block;
          width: 20px;
          background-color: #fff;
          height: 1px;
          position: absolute;
          left: 25px;
          top: 25px;
        }

        .thank-you-copy {
          margin-top: 20px;
        }

        .thank-you-copy p {
          margin: 0;
          padding: 0;
          font-size: 15px;
          color: #666;
        }

        @media (max-width: 768px) {
          .thank-you-page-content {
            padding: 50px 25px;
          }

          .thank-you-page-content h1 {
            font-size: 24px;
            padding-top: 80px;
          }

          .thankyou-btn {
            padding: 10px 20px 10px 50px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}
