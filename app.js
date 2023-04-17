const two = new Two({
    fullscreen: true,
    type: Two.Types.canvas
})

const heartClicked = [];
const colors = ["#2ecc71", "#e74c3c", "#f1c40f", "#fd79a8", "#e84393"];

two.appendTo(document.body);

two.bind("update", function () {
    heartClicked.forEach(({ velocity, element }) => {
        element.position.x += velocity.x;
        element.position.y += velocity.y;
    });
})

if ('ontouchstart' in document.documentElement) {
    window.ontouchstart = function (event) {
        play();
        handleClickHeart(event.touches[0].clientX, event.touches[0].clientY);
    }
}
else {
    window.onclick = function (event) {
        play();
        handleClickHeart(event.clientX, event.clientY);
    }

}

function handleClickHeart(x, y) {
    for (let i = 0; i < 10; i++) {
        const objectImage = {
            src: "images/lover-modified.png",
            size: 0.6,
        };
        if (x > two.width / 2) {
            objectImage.src = "images/me-modified.png";
            objectImage.size = 0.18;
        }
        const radius = Math.PI * 2 / 10;
        const circle = two.makeCircle(0, 0, 100);
        const image = two.makeImageSequence(objectImage.src, 0, 0);
        image.scale = objectImage.size;
        const particle = two.makeGroup(circle, image);
        particle.position.set(x, y);
        particle.scale = 0.15;
        particle.border = 10;
        particle.linewidth = 5;

        heartClicked.push({
            velocity: {
                x: 5 * Math.cos(radius * i),
                y: 5 * Math.sin(radius * i)
            },
            element: particle
        });
    }
    removeHeartClicked();
}

function removeHeartClicked() {
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            if (typeof heartClicked[i] != 'undefined') {
                // console.log(heartClicked[i]);
                heartClicked[i].element.remove();
            }
        }
        heartClicked.splice(0, 10);
    }, 1000);
}


function randomColors() {
    return colors[Math.floor(Math.random() * colors.length)];
}

two.play();

function play() {
    const audio = document.getElementById("audio");
    if (audio.paused) {
        audio.play();
    }
}