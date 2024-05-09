document.querySelectorAll(".carousel").forEach((carousel) => {
  const items = carousel.querySelectorAll(".carousel__item");
  const buttonsHtml = Array.from(items, () => {
      return `<span class="carousel__button"></span>`;
  });

  carousel.insertAdjacentHTML(
      "beforeend",
      `
          <div class="carousel__nav">
              ${buttonsHtml.join("")}
          </div>
      `
  );

  const buttons = carousel.querySelectorAll(".carousel__button");
  let currentIndex = 0; // Track the current item index

  const selectItem = (index) => {
      // un-select all the items
      items.forEach((item) =>
          item.classList.remove("carousel__item--selected")
      );
      buttons.forEach((button) =>
          button.classList.remove("carousel__button--selected")
      );

      items[index].classList.add("carousel__item--selected");
      buttons[index].classList.add("carousel__button--selected");
  };

  const advanceCarousel = () => {
      currentIndex = (currentIndex + 1) % items.length; // Increment index and wrap around
      selectItem(currentIndex);
  };

  buttons.forEach((button, i) => {
      button.addEventListener("click", () => {
          selectItem(i);
          currentIndex = i;
      });
  });

  // Select the first item on page load
  selectItem(0);

  // Set interval for automatic advancement
  const intervalTime = 3000; // Change this to adjust the interval time in milliseconds
  let intervalId = setInterval(advanceCarousel, intervalTime);

  // Pause the carousel on mouse hover
  carousel.addEventListener("mouseenter", () => {
      clearInterval(intervalId);
  });

  // Resume the carousel on mouse leave
  carousel.addEventListener("mouseleave", () => {
      intervalId = setInterval(advanceCarousel, intervalTime);
  });
});
