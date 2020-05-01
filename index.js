//-------variables----------- 
const GAME_WIDTH=700;
const GAME_HEIGTH=500;

const level=[
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
 
];
const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    GAMEOVER:2,

  };
  var   SCORE=0;
//-----function---------
function buildLevel(game,level){
    let Rectangles=[];
    level.forEach((row,rowIndex) => {
        row.forEach((rectangle,rectangleIndex) => {
            if(rectangle===1){
                let position={
                    x:50*rectangleIndex,
                    y:25*rowIndex,
                }
                Rectangles.push(new Rectangle(game,position));
            }
        });
    });
    return Rectangles;
}
function detectionCollision(ball,gameObject){
    let bottomOfBall=ball.position.y+ball.size;
    let topOfBall=ball.position.y-6;

    let leftOfObject=gameObject.position.x+1;
    let rightOfObject=gameObject.position.x+gameObject.width;
    let TopOfObject=gameObject.position.y;
    let ButtomOfObject=gameObject.position.y+gameObject.heigth+1;
    let right=ball.position.x+ball.size+2;
    if(
        bottomOfBall>=TopOfObject &&
        topOfBall<=ButtomOfObject
        &&ball.position.x>=leftOfObject
        &&right <=rightOfObject
    ){
        return true;
    }else{
        return false;
    }
}
//------classes 
class Game{
    constructor(gameWidth,gameHeight){
        this.gamestate=GAMESTATE.PAUSED;
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.ball=new Ball(this);
        this.paddle=new Paddle(this);
         new InputHandler(this.paddle,this);
        this.rectangle=buildLevel(this,level);
        
    }
    update(dt){
        if(this.gamestate==GAMESTATE.GAMEOVER)
      {  if(confirm("GAME OVER")){
        location.reload();
      }else{
        location.reload();
      }
         
    }
    if(SCORE==28){
        if(confirm("you win ")){
        location.reload();
    }else{
      location.reload();
    }
    }
        if(this.gamestate==GAMESTATE.PAUSED)
        return;
        this.ball.update(dt);
        this.paddle.update(dt);
        this.rectangle.forEach(object => {
            object.update(dt);
        });
    
    }
    draw(ctx){
        
        this.ball.draw(ctx);
        this.paddle.draw(ctx); 
        this.rectangle.forEach(object => {
            object.draw(ctx);
        });
        this.rectangle=this.rectangle.filter(object=>object.existe);
}
  pause(){
 if(this.gamestate==GAMESTATE.PAUSED){
     this.gamestate=GAMESTATE.RUNNING;
 }else{
    this.gamestate=GAMESTATE.PAUSED;
 }
  }
}
//----------------------
 class Paddle {

    constructor(game){
      this.width=150;
      this.heigth=20;
      this.speedMax=5;
      this.speed=0;
    
    this.position={
     x:game.gameWidth/2-this.width/2,
     y:game.gameHeight-this.heigth-10,
    }
   }
   moveleft(){
       this.speed=-this.speedMax;
   }
   moveright(){
    this.speed=this.speedMax;
}
stop(){
    this.speed=0;
}
    draw(ctx){
    ctx.fillStyle='#4682B4';
    ctx.fillRect(this.position.x,this.position.y,this.width,this.heigth);
    }
    update(dl){

        this.position.x+=this.speed;
        if(this.position.x<0)this.position.x=0;
      if(this.position.x+this.width>GAME_WIDTH)
      this.position.x=GAME_WIDTH-this.width;
    }
}
//----------------------
class Ball{
    constructor(game){
     this.image= document.getElementById("img_ball");
    this.gameHeight=game.gameHeight;
    this.gameWidth=game.gameWidth;
    this.game=game;
     this.position={
         x:350,
         y:470,
     }
     this.speed={
         x:3,y:3,
     }
     this.size=15;
    }
    stop(){
        this.speed={
            x:0,y:0,
        }
    }
    draw(ctx){
        ctx.drawImage(this.image,this.position.x,this.position.y,this.size,this.size);
    }
    update(dt){
       this.position.x+=this.speed.x;
       this.position.y+=this.speed.y;
       if(this.position.x+this.size>this.gameWidth || this.position.x<0){
           this.speed.x=-this.speed.x;
       }
       if(this.position.y+this.size>this.gameHeight|| this.position.y<0){
           this.speed.y=-this.speed.y;
       }
       let bottomOfBall=this.position.y+this.size;
       let topOfPaddle=this.game.paddle.position.y;
       let leftOfPaddle=this.game.paddle.position.x;
       let rightOfPaddle=this.game.paddle.position.x+this.game.paddle.width;
       if(
           bottomOfBall>=topOfPaddle &&this.position.x>=leftOfPaddle
           && this.position.x+this.size<=rightOfPaddle
       ){
           this.speed.y=-this.speed.y;
           this.position.y=this.game.paddle.position.y-this.size;
       }
       if(this.position.y+this.size>this.gameHeight){
           this.game.gamestate=GAMESTATE.GAMEOVER;
       }
    }
}
//----------------------
class Rectangle{
    constructor(game,position){
        this.image= document.getElementById("img_rec");
        
        this.game=game;
        this.position=position
        this.width=50;
        this.heigth=25;
        this.existe=true;
       }
       draw(ctx){
        ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.heigth);
    }
    update(dt){
        let t=detectionCollision(this.game.ball,this);
      if(t)
      {
         this.game.ball.speed.y=-this.game.ball.speed.y;
         this.existe=false;
         SCORE=SCORE+1;
         document.getElementById("score").innerHTML="SCORE : "+SCORE;
        
      }
    }

}
//----------------------
class InputHandler{
    constructor(paddle,game){
        document.addEventListener("keydown",event=>{
            switch(event.keyCode){
                case 37 :
              
                paddle.moveleft();
                break;
                case 39 :
                
                paddle.moveright();
                break;
                case 32 :
                 game.pause();
                 break;
            }
        });
        document.addEventListener("keyup",event=>{
            switch(event.keyCode){
                case 37 :
                if(paddle.speed<0)
                paddle.stop();
                break;
                case 39 :
                if(paddle.speed>0)
                paddle.stop();
                break;
               
            }
        });
    }
}
// implementation
let canvas = document.getElementById("game");
let ctx=canvas.getContext("2d");
let game =new Game(GAME_WIDTH,GAME_HEIGTH);
let LastTime=0;
function    gameWork(timestamp){
    let dt=timestamp-LastTime;
    LastTime=timestamp;
    ctx.clearRect(0,0,700,500);
    game.draw(ctx);
    game.update(dt); 
    requestAnimationFrame(gameWork);

}
requestAnimationFrame(gameWork);

document.getElementById("score").innerHTML="SCORE : "+SCORE;