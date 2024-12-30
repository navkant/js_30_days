function setClockTime() {
    const secondHand = document.querySelector(".second-hand");
    const minHand = document.querySelector(".min-hand");
    const hourHand = document.querySelector(".hour-hand");
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const secondDegrees = (6 * seconds + 270) % 360;
    const minDegrees = (6 * minutes + 270) % 360;
    const hourDegrees = (30 * hours + 270) % 360;
    console.log(secondDegrees);
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minHand.style.transform = `rotate(${minDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setClockTime, 1000);
