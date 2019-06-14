class Game{
  constructor(){
    this.intervalId = ""
    this.fps=60
    this.counter=0
    this.canvas = ""
    this.ctx =""
    this.img = new Image();
    this.img.src = "images/car.png";
    this.xCar = 210;
    this.yCar = 430;
    this.key_right = 39;
    this.key_left = 37;
    this.obstacles = [];
  }

  initGame= (id)=>{
    this.canvas=document.getElementById(id);
    this.ctx= this.canvas.getContext("2d");
    this.start();
  }


  start= ()=>{
    this.intervalId = setInterval(()=>{
      this.counter++;
      this.clear();
      this.draw();
      this.listener();
      this.colisions();
      if (this.counter % 200 == 0) {
        this.generateObstacle();
      }
    },1000/this.fps)
  }

  clear= ()=>{
    this.ctx.clearRect(0, 0, 470, 550);
  }

  stop= ()=>{
    clearInterval(this.intervalId)
  }

  draw = ()=>{
    this.drawBackground()
    this.drawLine();
    this.drawObstacles()
    this.drawCar()
  }

  drawBackground = ()=>{
    this.ctx.beginPath();
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(0, 0, 30, 550);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(440, 0, 30, 550);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(30, 0, 10, 550);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(430, 0, 10, 550);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(40, 0, 10, 550);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(420, 0, 10, 550);
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(50, 0, 370, 550);
    this.ctx.closePath();
  }

  drawCar = ()=>{
    this.ctx.drawImage(this.img, this.xCar, this.yCar, 50, 100);

  }

  drawObstacles = ()=>{
    this.obstacles.forEach(element => {
        element.draw(this.ctx);
      });
  }

  drawLine = ()=>{
    this.ctx.setLineDash([40, 30]);
    this.ctx.lineDashOffset = -this.counter;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "white";
    this.ctx.moveTo(230, 0);
    this.ctx.lineWidth = 10;
    this.ctx.lineTo(230, 550);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  generateObstacle = () => {
    this.obstacles.push(
      new Obstacle(
        Math.floor(Math.random() * 250),
        Math.floor(Math.random() * 250)
      )
    );
  }

  listener = ()=>{
    document.onkeydown = (e) => {
      e.preventDefault();
      switch (e.keyCode) {
        case this.key_left:
          if (this.xCar >= 40) {
            this.xCar -= 10;
            break;
          }
        case this.key_right:
          if (this.xCar <= 380) {
            this.xCar += 10;
            break;
          }
      }
    }
  }

  colisions = () => {
    this.obstacles.forEach(element => {
        if (
          this.xCar + 50 >= element.x &&
          element.x + element.width >= this.xCar &&
          this.yCar + 100 >= element.y &&
          element.y + 30 >= this.yCar
        ) {
          clearInterval(this.intervalId);
          this.obstacles = [];
          this.offsetCounter = 0;
        }
      }
    );

  }
}


class Obstacle{
  constructor(x, width){
    this.x = x;
    this.y = -30;
    this.height = 30;
    this.width = width;
    this.color = "red";
  }

  draw = (ctx)=>{
    console.log("tpm")
    ctx.fillStyle = "brown";
    ctx.fillRect(this.x, this.y++, this.width, this.height);
  }

}