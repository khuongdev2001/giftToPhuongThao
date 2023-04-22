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
    document.ontouchstart = function (event) {
        play();
        handleClickHeart(event.touches[0].clientX, event.touches[0].clientY);
    }
}
else {
    document.onclick = function (event) {
        play();
        handleClickHeart(event.clientX, event.clientY);
    }

}

function handleClickHeart(x, y) {
    const currentImage = Math.floor(Math.random() * 7) + 1;
    const TWO_PI = 2 * Math.PI;
    let length = 0;
    for (let i = 0; i < TWO_PI; i += 0.3) {
        length++;
        const r = 0.3;
        heartClicked.push({
            velocity: {
                x: r * 16 * Math.pow(Math.sin(i), 3),
                y: -r * (13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i))
            },
            element: drawCircle(x, y, currentImage)
        });
    }
    removeHeartClicked(length);
}

function drawCircle(x, y, currentImage) {
    const objectImage = {
        src: `images/lover_${currentImage}-modified.webp`,
        size: 0.47,
        color: "#fff"
    };
    const circle = two.makeCircle(0, 0, 100);
    const image = two.makeImageSequence(objectImage.src, 0, 0);
    image.scale = objectImage.size;
    const particle = two.makeGroup(circle, image);
    particle.position.set(x, y);
    particle.scale = 0.2;
    particle.border = 10;
    particle.linewidth = 5;
    return particle;
}

function removeHeartClicked(length) {
    setTimeout(() => {
        for (let i = 0; i < length; i++) {
            if (typeof heartClicked[i] != 'undefined') {
                // console.log(heartClicked[i]);
                heartClicked[i].element.remove();
            }
        }
        heartClicked.splice(0, length);
    }, 700);
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



function handleLoadImage() {
    alert("Thảo ơi! nào thông báo hiển thị thêm 1 lần nữa rồi hả click nha!")
    const countImage = 7;
    let countCurrent = 0;
    for (let i = 1; i < countImage + 1; i++) {
        const image = (new Image());
        image.src = `images/lover_${i}-modified.webp`;
        image.onload = function () {
            countCurrent += 1;
            if (countCurrent == countImage) {
                alert("Thảo ơi tui đã lấy hết ảnh về rồi ạ! => Chúc P.Thảo Ngủ Khỏe ạ")
            }
        }
    }
}

handleLoadImage();