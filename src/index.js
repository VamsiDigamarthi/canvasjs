import "./styles.css";

var btn = document.getElementById("startButton");

var canvas = document.getElementById("myCanvas1");
let context = canvas.getContext("2d");

var window_height = window.innerHeight - 70;

var window_width = window.innerWidth;

canvas.height = window_height;
//canvas.style.height = "800px";
canvas.width = window_width;

canvas.style.background = "#bbf";

class Circle {
  constructor(xpoint, ypoint, radius, color) {
    this.xpoint = xpoint;
    this.ypoint = ypoint;
    this.radius = radius;
    this.color = color;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.xpoint, this.ypoint, this.radius, 0, Math.PI * 2, false);
    context.strokeStyle = "grey";
    context.lineWidth = 3;
    context.fillStyle = this.color;
    context.fill();
    context.stroke();
    context.closePath();
  }
  update(context) {
    context.fillStyle = "black";
    context.fillRect(this.xpoint, this.ypoint, this.radius, this.color);
  }

  changeColor(newColor) {
    this.color = newColor;
    this.draw(context);
  }
  stop() {
    clearInterval(this.interval);
  }

  moveBlack(intence, c) {
    this.interval = setInterval(
      function (intence, c) {
        if (c.crashWith(intence)) {
          //console.log("hbb");
          c.stop();
          c.changeColor("#56f");
        } else {
          clear();
          intence.xpoint -= 6;
          circle.draw(context);
          circleSec.draw(context);
          circleThi.draw(context);
          first.update(context);
          second.update(context);
          third.update(context);
        }
      },
      20,
      intence,
      c
    );
  }

  clickCircle(xmouse, ymouse, intence, c) {
    const distance = Math.sqrt(
      (xmouse - this.xpoint) * (xmouse - this.xpoint) +
        (ymouse - this.ypoint) * (ymouse - this.ypoint)
    );
    if (distance < this.radius) {
      // this.changeColor("#56f");
      console.log("click");
      this.moveBlack(intence, c);
      //moveBlack(first);
      return true;
    } else {
      //this.changeColor("red");
      return false;
    }
  }
  crashWith(otherobj) {
    var myleft = this.xpoint;
    var myright = this.xpoint + this.radius;
    var mytop = this.ypoint;
    var mybottom = this.ypoint + this.color;
    var otherleft = otherobj.xpoint;
    var otherright = otherobj.xpoint + otherobj.radius;
    var othertop = otherobj.ypoint;
    var otherbottom = otherobj.ypoint + otherobj.color;
    var crash = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  }
}

let circle = new Circle(200, 100, 50, "red");
let circleSec = new Circle(200, 300, 50, "red");
let circleThi = new Circle(200, 500, 50, "red");
circle.draw(context);
circleSec.draw(context);
circleThi.draw(context);
let first = new Circle(800, 90, 50, 10);
let second = new Circle(800, 300, 50, 10);
let third = new Circle(800, 500, 50, 10);
first.update(context);
second.update(context);
third.update(context);

var interval;

btn.addEventListener("click", () => {
  circle.changeColor("red");
  circleSec.changeColor("red");
  circleThi.changeColor("red");
  context.clearRect(251.5, 90, 50, 10);
  context.clearRect(251.5, 300, 50, 10);
  context.clearRect(251.5, 500, 50, 10);
  first.xpoint = 800;
  first.ypoint = 90;
  second.xpoint = 800;
  second.ypoint = 300;
  third.xpoint = 800;
  third.ypoint = 500;
  // first.width(50);
  // first.height(10);

  first.update(context);
  second.update(context);
  third.update(context);
});

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
// var stop = function () {
//   clearInterval(interval);
// };

// function moveBlack(intence, c) {
//   interval = setInterval(
//     function (intence, c) {
//       if (c.crashWith(intence)) {
//         console.log("hbb");
//         c.stop();
//         c.changeColor("#56f");
//       } else {
//         clear();
//         intence.xpoint -= 1;
//         circle.draw(context);
//         circleSec.draw(context);
//         circleThi.draw(context);
//         first.update(context);
//         second.update(context);
//         third.update(context);
//       }
//     },
//     20,
//     intence,
//     c
//   );
// }

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  //console.log("click");
  circle.clickCircle(x, y, first, circle);
  circleSec.clickCircle(x, y, second, circleSec);
  circleThi.clickCircle(x, y, third, circleThi);
});
