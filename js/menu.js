
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

  tl.to(".col-1", 0.7, {
    left: "-100%",
    ease: "power4.inOut",
  });

  tl.to(
    ".col-2",
    0.025,
    {
      left: "0px",
      ease: "power4.inOut",
    },
    "<"
  );

  tl.to(
    ".col-2 > .menu-item",
    0.7,
    {
      left: 0,
      ease: "power4.inOut",
      stagger: {
        amount: 0.3,
      },
    },
    "<"
  ).reverse();
}

