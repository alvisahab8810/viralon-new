import Leftbar from "./Leftbar";

// ✅ Why this exists:
// Every /dashboard/* page used to render <Dashnav/><Leftbar/> itself, inside
// its own component tree. Since Next's Pages Router fully unmounts the old
// page and mounts a brand new one on every navigation, that sidebar was being
// destroyed and recreated from scratch on every single click — which is what
// caused the visible flicker when switching pages.
//
// This is Next's documented fix: a per-page persistent layout, attached via
// `Page.getLayout` (see pages/_app.js). Because DashboardLayout now sits
// *outside* the page component in the tree (in _app.js, which never
// remounts), React keeps this exact Leftbar instance mounted across page
// navigations — only `{children}` (the actual page content) swaps out. The
// sidebar no longer flashes/reflows on every route change.
export default function DashboardLayout({ children, role }) {
  return (
    <div className="main-nav">
      <Leftbar role={role} />
      <section className="content home">{children}</section>
    </div>
  );
}
