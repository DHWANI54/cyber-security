const counters = document.querySelectorAll(".dash-grid strong");

const pulseCounter = () => {
  counters.forEach((counter) => {
    counter.animate(
      [
        { filter: "brightness(1)" },
        { filter: "brightness(1.5)" },
        { filter: "brightness(1)" }
      ],
      { duration: 1800, easing: "ease-in-out" }
    );
  });
};

setInterval(pulseCounter, 3600);
