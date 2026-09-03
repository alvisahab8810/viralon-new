import Document, { Html, Head, Main, NextScript } from "next/document";

// ✅ Why this file exists:
// public/assets/js/main.js was a jQuery "glue" script from the original
// template — it wired up jQuery + ~12 jQuery plugins (isotope, magnific-popup,
// circleProgress, count-to, appear, scrolla, YTPlayer, validnavs, tooltip,
// preloader...). Auditing every selector it uses against the actual React
// markup on this site found real, live usage of exactly ONE of them —
// ".popup-youtube" (now replaced by components/common/VideoPopupLink.js,
// a small jQuery-free React modal). Every other selector in main.js
// (.testimonial-style-one-carousel, #gallery-masonary, .timer/.fun-fact,
// .progressbar, .player, .animate, validnavs, etc.) matches nothing on any
// page — dead template leftovers, not features anyone was using. The mobile
// nav uses Bootstrap 5's native data-bs-toggle="offcanvas" already (see
// components/header/Header.js) and never depended on jQuery either.
//
// So jQuery and every one of its plugins have been removed outright rather
// than "load-order fixed" — there was nothing real left depending on them.
// Bootstrap's JS bundle stays: it's vanilla JS (Bootstrap 5 dropped the
// jQuery dependency years ago) and several pages genuinely use its
// data-bs-* modal/offcanvas behavior.
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const pathname = ctx.pathname || "";
    const isYourBrandsPage = pathname === "/your-brands-bff";
    const isDashboardPage = pathname.startsWith("/dashboard");
    const isLoginPage = pathname === "/dashboard/login";
    return {
      ...initialProps,
      isYourBrandsPage,
      isLoginPage,
      skipMarketingAssets: isYourBrandsPage || isDashboardPage,
    };
  }

  render() {
    const { isYourBrandsPage, isLoginPage, skipMarketingAssets } = this.props;

    return (
      <Html lang="en">
        <Head>
          {isLoginPage && (
            <>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
              <link
                href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
                rel="stylesheet"
              />
            </>
          )}
          {!skipMarketingAssets && (
            <>
              <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
              <link rel="stylesheet" href="/assets/css/style.css" />
              <link rel="stylesheet" href="/assets/css/custome.css" />
              <link rel="stylesheet" href="/assets/css/validnavs.css" />
              <link rel="stylesheet" href="/assets/css/responsive.css" />
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Icons+Round"
              />
              <link
                href="https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css"
                rel="stylesheet"
              />
              <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
              />
              <link href="/assets/css/font-awesome.min.css" rel="stylesheet" />
              <link href="/assets/css/flaticon-set.css" rel="stylesheet" />
              <link href="/assets/css/swiper-bundle.min.css" rel="stylesheet" />
              <link href="/assets/css/animate.min.css" rel="stylesheet" />
              <link href="/assets/css/helper.css" rel="stylesheet" />
              <link href="/assets/css/unit-test.css" rel="stylesheet" />
            </>
          )}
        </Head>
        <body>
          <Main />

          {/* Bootstrap 5's JS bundle is plain vanilla JS (no jQuery dependency) —
              still needed wherever data-bs-* attributes are used. jQuery and
              every plugin that used to load alongside it have been removed —
              see the note above. */}
          {!isYourBrandsPage && <script src="/assets/js/bootstrap.bundle.min.js" defer />}

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
