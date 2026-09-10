import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import EnquiryPopup from "../components/common/EnquiryPopup";

// ✅ The legacy jQuery/GSAP/Swiper/Bootstrap asset bundle used to live here as
// next/script tags, but next/script inserts scripts via document.createElement
// — and dynamically-created scripts never honour the `defer` attribute, so
// there was never an actual load-order guarantee between jquery-3.6.0.min.js
// and its plugins (jquery.appear.js, progress-bar.min.js, etc). That's what
// caused the intermittent "$ is not defined" / "jQuery is not defined" errors,
// which Next 16 + Turbopack's different script timing turned into a
// reliably-reproducing bug. It now lives in pages/_document.js as real,
// server-rendered <script defer> tags, where the browser's native HTML parser
// enforces execution order per spec. See _document.js for details.

// The enquiry popup belongs to the public marketing site only. The admin
// dashboard, the post editor and the standalone campaign landing page (which
// carries its own popup and no site header) are left alone.
const NO_POPUP = ["/dashboard", "/posts", "/your-brands-bff", "/thank-you", "/test"];

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();
  const showPopup = !NO_POPUP.some(
    (p) => router.pathname === p || router.pathname.startsWith(p + "/")
  );

  return (
    <>
      <Head>
        {/* Favicon set from public/favicon. The .ico is the legacy fallback,
            the .svg is what modern browsers actually use, and the 96px PNG
            covers the few that take neither. */}
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#19132F" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <title>Viralon | Best Digital Marketing Agency For Revenue Growth</title>
      </Head>

      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TFHSH9W4');
          `,
        }}
      />
      {/* End Google Tag Manager */}

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-TFHSH9W4"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      {/* End Google Tag Manager */}

      <Toaster position="top-right" />

      <SessionProvider session={pageProps.session}>
        {getLayout(<Component {...pageProps} />, pageProps)}
        {showPopup && <EnquiryPopup key={router.asPath} />}
      </SessionProvider>
    </>
  );
}

export default MyApp;
