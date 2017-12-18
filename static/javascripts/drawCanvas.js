function drawCanvas() {

  const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    POINT = 200;

  let canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d'),
    circleArr = [],
    colors = ["rgba(170,255,0,0.5)", "rgba(255,255,0,0.5)", "rgba(255,0,0,0.5)", , "rgba(190,242,2,0.5)", "rgba(0,178,255,0.5)", "rgba(192,250,56,0.5)", "rgba(255,0,170,0.5)", "rgba(170,0,255,0.5)", "rgba(0,170,255,0.5)"];


  function num(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  function Circle(x, y, r, moveX, moveY, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.moveX = moveX;
    this.moveY = moveY;
    this.color = color;
  }

  function initCircle(x, y, r, moveX, moveY, color) {
    let circle = new Circle(x, y, r, moveX, moveY, color);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    return circle;
  }

  function drawCircle() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    circleArr.forEach(function (circle) {
      ctx.beginPath();
      ctx.fillStyle = circle.color;
      ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    });
  }

  function move() {
    circleArr.forEach(function (circle) {
      circle.x += circle.moveX;
      circle.y += circle.moveY;
      if (circle.x >= WIDTH - circle.r || circle.x <= circle.r) {
        circle.moveX *= -1;
      }
      if (circle.y >= HEIGHT - circle.r || circle.y <= circle.r) {
        circle.moveY *= -1;
      }
    });
  }

  function init() {

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    for (let i = 0; i < POINT; i++) {
      circleArr.push(initCircle(num(0, WIDTH), num(0, HEIGHT), num(2, 4), num(-10, 10) / 4 || 0.5, num(-10, 10) / 4 || 0.5, colors[num(0, 7)]));
    }

    setInterval(function () {
      move();
      drawCircle();
    }, 10);

  }

  init();

}

module.exports = drawCanvas;
