const muteBtn = document.getElementById("mute-btn");
const playIcon = document.getElementById("play");
const pauseIcon = document.getElementById("pause");
const video = document.getElementById("bg-video");
const loader = document.getElementById("loader");
const loaderText = document.getElementById("loader-text");


muteBtn.addEventListener("click", () => {
  if (playIcon.style.display === "none") {
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
    video.muted = false;
  } else {
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
    video.muted = true;
  }
});

document.addEventListener("click", () => {
  loader.classList.add("hidden");
  video.muted = false;
  video.play().catch((err) => {
    console.warn("Ошибка автозапуска видео:", err);
    video.muted = true;
  });
}, { once: true });



document.body.addEventListener("click", () => {
  if (video.muted) {
    video.muted = false;
    video.play();
  }
}, { once: true });

document.addEventListener("click", () => {
  loader.classList.add("hidden");

  const isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;

  if (isMobile) {
    loaderText.textContent = "Этот сайт не поддерживается на мобильных устройствах.";
  } else {
    video.muted = false;
    video.play().catch((err) => {
      console.warn("Ошибка автозапуска видео:", err);
      video.muted = true;
    });
  }
}, { once: true });
