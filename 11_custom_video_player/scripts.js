// Get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggled");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// Build out functions
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton(e) {
    const icon = this.paused ? "►" : "❚ ❚";
    toggle.textContent = icon;
}

function skip(skipTime = null) {
    if (!skipTime) {
        video.currentTime += parseFloat(this.dataset.skip);
    } else {
        video.currentTime += skipTime;
    }
}

function handleRangeUpdate(e) {
    console.log(this.name);
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function handleScrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function setVolume(increase) {
    if (increase) {
        if (video.volume < 1) {
            console.log("increasing volume");
            video.volume += 0.05;
        }
    } else {
        if (video.volume > 0.05) {
            console.log("decreasing volume");
            video.volume -= 0.05;
        }
    }
}

function handleArrowKeys(e) {
    if (e.key === "ArrowLeft") {
        skip(-10);
    } else if (e.key === "ArrowRight") {
        skip(10);
    } else if (e.key === "ArrowUp") {
        setVolume(true);
    } else if (e.key === "ArrowDown") {
        setVolume(false);
    }
}

// Hook up the evnet listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
    range.addEventListener("mousedown", handleRangeUpdate)
);

progress.addEventListener("click", handleScrub);
window.addEventListener("keydown", handleArrowKeys);
