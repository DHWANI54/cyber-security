const navbar = document.querySelector("#navbar");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#navMenu");
const mouseGlow = document.querySelector(".mouse-glow");

const setNavState = () => {
  navbar.classList.toggle("scrolled", window.scrollY > 16);
};

setNavState();
window.addEventListener("scroll", setNavState, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("pointermove", (event) => {
  document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
  document.documentElement.style.setProperty("--my", `${event.clientY}px`);
  if (mouseGlow) {
    mouseGlow.style.opacity = "1";
  }
});
