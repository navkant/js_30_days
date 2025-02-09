const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const button = document.querySelector(".ss-btn");

function getVideo() {
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((localMediaStream) => {
            console.log(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch((error) => {
            console.log(
                "Oh No!!, please give permission to access webcam and mic"
            );
        });
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;
    console.log(width, height);

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = redEffect(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 200);
}

getVideo();
video.addEventListener("canplay", paintToCanvas);

function takePhoto() {
    // played the sound
    snap.currentTime = 0;
    snap.play();

    // take the data out of canvas
    const data = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "handsome");
    link.textContent = "Download Image";
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild);
}

button.addEventListener("click", () => {
    console.log("button clicked");
    takePhoto();
});

function redEffect(pixels) {
    for (let i = 0; i <= pixels.data.length; i += 4) {
        pixels.data[i] = pixels.data[i] + 100;
        pixels.data[i + 1] = pixels.data[i + 1] - 50;
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
    }
    return pixels;
}
