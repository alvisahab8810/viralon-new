// Retired: the dashboard shell was rebuilt to match tourwatchout's backend UI,
// which has no separate top navbar — the logo and logout live in the sidebar
// (see components/Leftbar.js) instead. This component now renders nothing so
// every existing "<Dashnav /><Leftbar />" page doesn't need to be touched.
export default function Dashnav() {
  return null;
}
