export const SCROLL_REVEAL_EVENT = "wedding:scroll-reveal";

export function requestScrollReveal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SCROLL_REVEAL_EVENT));
  }
}
