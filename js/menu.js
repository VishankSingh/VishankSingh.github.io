
const tl = gsap.timeline({paused: true});

function revealMenu() {
  revealMenuItems();

  const toggleBtn = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('close-menu');

  toggleBtn.onclick = function () {
    tl.reversed(!tl.reversed());
  };

  closeBtn.onclick = function () {
    tl.reversed(!tl.reversed());
  };
}

revealMenu();

function revealMenuItems() {
  tl.to(".menu-container", 0.01, {
    height: "100vh",
  });

  tl.to(".col-1", 1, {
    left: "-100%",
    ease: "expo.inOut",
  });

  tl.to(
    ".col-2",
    0.025,
    {
      left: "0px",
      ease: "expo.inOut",
    },
    "<"
  );

  tl.to(
    ".col-2 > .menu-item",
    1,
    {
      left: 0,
      ease: "expo.inOut",
      stagger: {
        amount: 0.25,
      },
    },
    "<"
  ).reverse();
}
