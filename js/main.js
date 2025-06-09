// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  // Hero Lottie
  lottie.loadAnimation({
    container: document.getElementById("hero-page-lottie"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "assets/lottie/Hero/HeroPage.json",
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  });

  gsap.registerPlugin(ScrollTrigger);

  setupProjectScroller();
  setupAboutTrigger();
  setupExperienceAnimation();
  setupFooterAnimation();
});

function setupProjectScroller() {
  const imgEl = document.getElementById("proj-img");
  const txtType = document.querySelector(".proj-type");
  const txtTitle = document.querySelector(".proj-title");
  const txtDesc = document.querySelector(".proj-desc");
  const txtTools = document.querySelector(".proj-tools");

  document.querySelectorAll(".section-trigger").forEach((section) => {
    const { image, type, title, desc, tools } = section.dataset;

    const animate = () => {
      imgEl.src = image;
      txtType.textContent = type;
      txtTitle.textContent = title;
      txtDesc.textContent = desc;
      txtTools.textContent = tools;

      gsap.fromTo(
        imgEl,
        { clipPath: "circle(0% at 50% 50%)", scale: 1.2, opacity: 0 },
        {
          clipPath: "circle(75% at 50% 50%)",
          scale: 1,
          opacity: 1,
          duration: 2.5,
          ease: "elastic.out(1,0.5)",
        }
      );

      [txtType, txtTitle].forEach((el, i) =>
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.1 * i,
            ease: "power1.out",
          }
        )
      );
      [txtDesc, txtTools].forEach((el, i) =>
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.3 + 0.1 * i,
            ease: "power1.out",
          }
        )
      );
    };

    ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      onEnter: animate,
      onEnterBack: animate,
    });
  });

  ScrollTrigger.create({
    trigger: "#hero",
    start: "bottom bottom",
    onLeaveBack: () => {
      gsap.to(imgEl, {
        clipPath: "circle(0% at 50% 50%)",
        scale: 1.2,
        opacity: 0,
        duration: 0.5,
      });
      [".proj-type", ".proj-title", ".proj-desc", ".proj-tools"].forEach(
        (sel) => gsap.to(sel, { opacity: 0, duration: 0.3 })
      );
    },
  });
}

function setupAboutTrigger() {
  let loaded = false;
  const disp = document.querySelector(".project-display");
  ScrollTrigger.create({
    trigger: "#about",
    start: "top center",
    onEnter: () => {
      if (!loaded) {
        lottie.loadAnimation({
          container: document.getElementById("lottie-about"),
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "assets/lottie/AboutMe/aboutme.json",
          rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
        });
        loaded = true;
      }
      gsap.to(disp, { autoAlpha: 0, duration: 0.5 });
    },
    onLeaveBack: () => gsap.to(disp, { autoAlpha: 1, duration: 0.5 }),
  });
}

function setupExperienceAnimation() {
  gsap.set(".experience-section", { autoAlpha: 0, y: 20 });
  ScrollTrigger.create({
    trigger: "#experience",
    start: "top 80%",
    onEnter: () =>
      gsap.to(".experience-section", {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power1.out",
      }),
  });
}
