/* 
File    :-  snake.js
author  : - Ritesh Singh 
email   :-  developer.ritesh.acc@gmail.comp
Desc    :-  I developed this proect while learning Basics Of JavaScript
            Concepts which I learned and implemented are :- 
		    Data Types , Variables , Loops , Conditional Satatements , Functions ,
		    JSON , DOM Manipulation , Classes , JS Objects , OOPs , Event Handling , 
		    HTML Canvas
*/
             // Ps :- I am learning JS so kindly excude me , for this small/mini project
/* ----------------------------------------Start-----------------------------------------------*/ 

/* Global Functions || Extra Functions || Extra Variables   */
 
/* End Of Global Functions || Extra Functions || Extra Variables   */

/* Defining Game Class - OOPs Implementation */

class snakeGame
{

	  constructor()     // Constructor For Initiliazing All The Objects
	  {
		  this.score = 0;
		  this.gameOver = false;
          this.disp = document.getElementById('score');	
          this.p = document.getElementById('bar');		  
		 /*  <-------------Starting Of DOM Manipulation------------>
             Getting Gamecanvas From The HTML Document
             And Also Initiliazing The Context To Draw Elements			 
		 */
         this.canvas = document.getElementById('gamecanvas');    												 
		 this.canvas.height=500;
         this.canvas.width=1000;		 
         this.pen = this.canvas.getContext('2d');
		 
		 /*  <-------------End Of DOM Manipulation------------> */
		 
		 
         /* <-----------Starting Of JSON Object Creation--------->
		     Creating JSON Object Which Will Be Used To Draw The Snake
		 */
         this.snake = {
			 init_len:3,
			 color:'red',
			 cells:[],
			 direction:'right',
			 w:67,
			 h:67,
			 snakeBorn:function()
			 {
				 for(let i=this.init_len; i>0; i--)
				 {
			         this.cells.push({x:i,y:0});     		 
				 }
			 }
		 };
         this.snake.snakeBorn(); // making initial small baby snake
		 
		 /* <-----------End  Of JSON Object Creation---------> */
		 
        
		
        /*    <-------------------Starting Event Listner---------------->
                Adding Event Listner TO The Document 
                To Change The Direction Of The Snake On User Event				
        */ 		
        document.addEventListener('keydown',ev=>this.ListenToEvent(ev));
		 /*    <-------------------End Of Event Listner----------------> */
		 
		 this.Food = this.getFood();
	  } //End Of Constructor()
	  
	  
	  ListenToEvent(e)
	  {
		  if(e.key=='ArrowUp')
		  {
			  this.snake.direction='up';
		  }
		  else if(e.key=='ArrowDown')
		  {
			  this.snake.direction='down';
		  }
		  else if(e.key=='ArrowLeft')
		  {
			  this.snake.direction='left';
		  }
		  else if(e.key=='ArrowRight')
		  {
			  this.snake.direction='right';
		  }
		  
	  }
	  draw()
	  {
		 this.pen.clearRect(0,0,1000,1000);
		 this.pen.fillStyle = this.snake.color;
		 for(let i=0; i<this.snake.cells.length; i++)
		{
		 this.pen.fillRect(this.snake.cells[i].x*67,this.snake.cells[i].y*67,this.snake.w-3.5,this.snake.h-3.5); 
		}	
           
         // Draw Food 
		 this.pen.fillStyle = this.Food.color;
		 this.pen.fillRect(this.Food.x*67,this.Food.y*67,this.snake.w,this.snake.h);
	  }
	  
	  update()
	  {
		  
		  //Check Snake Eaten Food or Not
		  
		  if(this.Food.x == this.snake.cells[0].x  && this.Food.y== this.snake.cells[0].y)
		  {
			  this.Food = this.getFood();
			  console.log("Snake Eaten The Food");
			  this.score++;
			  var sco = this.score*1;
			  this.disp.innerText=" Your Score - "+sco;
			  var st = sco+'%';
			  this.p.style.width=st;
			  this.p.innerText=sco;
			  
		  }
		  else
		  {
			  this.snake.cells.pop()
		  }
		  
		  if(this.snake.direction=="right")
		  {
		      this.snake.cells.unshift({x:this.snake.cells[0].x+1,y:this.snake.cells[0].y});
		  }
		  else if(this.snake.direction=="left")
		  {
		      this.snake.cells.unshift({x:this.snake.cells[0].x-1,y:this.snake.cells[0].y});
		  }
		  else if(this.snake.direction=="down")
		  {
		      this.snake.cells.unshift({x:this.snake.cells[0].x,y:this.snake.cells[0].y+1});
		  }
		  else if(this.snake.direction=="up")
		  {
		      this.snake.cells.unshift({x:this.snake.cells[0].x,y:this.snake.cells[0].y-1});
		  }
		  
		  var last_x = this.canvas.width/67;
		  var last_y = this.canvas.height/67;
		  if(this.snake.cells[0].x < 0 || this.snake.cells[0].x >last_x || this.snake.cells[0].y<0 || this.snake.cells[0].y>last_y)
		  {
			  this.gameOver = true;
		  }
		   
	  }
	  
	  getFood()
	  {
		  var x_cor = Math.round(Math.random()*(this.canvas.width-67)/67);
          var y_cor = Math.round(Math.random()*(this.canvas.height-67)/67);
          var Food = {
			    x: x_cor,
                y: y_cor,
				color:'blue',
                				
		  };		  
		  return Food;
	  }
	  
	  gameLoop()
	  {
		  if(this.gameOver!=true)
		  {
		  this.draw();
		  this.update();
		  }
		  else
		  {
			  clearInterval(loop);
			  alert("Game Over");
		  }
          		  
	  }
};
/* -------------------------------Driver Calling Area----------------------------------------*/

 document.addEventListener('keydown' ,game);
 function game(e)
 {
	 if(e.key=='s')
	 {
		 game = new snakeGame();
         loop = setInterval(function(){game.gameLoop();},200);
	 }
 }

/* ----------------------------------------End-----------------------------------------------*/ 