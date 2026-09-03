import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

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

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/assets/img/favicon.png" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <title>Viralon</title>
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
      </SessionProvider>
    </>
  );
}

export default MyApp;
