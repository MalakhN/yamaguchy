document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const slots = document.querySelectorAll(".icon-slot");
  const badges = document.querySelectorAll(".icon-badge");
  const stepAngle = 20;

  let mm = gsap.matchMedia();

  mm.add("(min-width: 1200px)", () => {
    gsap.set(".slide-2, .slide-3", {
      rotation: 45,
      opacity: 0
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".dial-section",
        start: "top top",
        end: "+=2500",
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          let activeIdx = 0;
          if (p >= 0.25 && p < 0.75) activeIdx = 1;
          else if (p >= 0.75) activeIdx = 2;

          badges.forEach((b, idx) => {
            b.classList.toggle("is-active", idx === activeIdx);
          });
        }
      }
    });

    tl.to(".dial-wheel", { rotation: -stepAngle, duration: 1, ease: "power2.inOut" }, "step1")
      .to(".icon-badge", { rotation: stepAngle, duration: 1, ease: "power2.inOut" }, "step1")
      .to(".slide-2", { rotation: 0, opacity: 1, duration: 1, ease: "power2.inOut" }, "step1")
      .to(".slide-1", { scale: 0.95, opacity: 0.35, duration: 1, ease: "power2.inOut" }, "step1")

      .to(".dial-wheel", { rotation: -stepAngle * 2, duration: 1, ease: "power2.inOut" }, "step2")
      .to(".icon-badge", { rotation: stepAngle * 2, duration: 1, ease: "power2.inOut" }, "step2")
      .to(".slide-3", { rotation: 0, opacity: 1, duration: 1, ease: "power2.inOut" }, "step2")
      .to(".slide-2", { scale: 0.95, opacity: 1, duration: 1, ease: "power2.inOut" }, "step2");

    const totalSteps = slots.length - 1;

    slots.forEach((slot) => {
      slot.addEventListener("click", () => {
        const index = Number(slot.dataset.index);
        const progress = index / totalSteps;
        const st = tl.scrollTrigger;
        const targetScroll = st.start + (st.end - st.start) * progress;

        gsap.to(window, {
          scrollTo: { y: targetScroll, autoKill: false },
          duration: 0.8,
          ease: "power2.inOut"
        });
      });
    });
  });
});