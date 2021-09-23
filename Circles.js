class Gumball {
  constructor(x, y, r, hsbc, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.hsbc = hsbc;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.hsbc_ = hsbc;
  }
  
  
  show() {
    
    //gumball
    strokeWeight(2)
    //TODO
    colorMode(HSB); 
    stroke(this.hsbc, 60,100);
    fill(this.hsbc, 80,93);
    circle(this.x, this.y, this.r);
    
    //reflection
    push();
    noStroke();
    colorMode(RGB);
    fill(256,100);
    beginShape();
      vertex(this.x + 3 * this.r/40, this.y -15 * this.r/40);
      vertex(this.x + 6 * this.r/40, this.y - 2 * this.r/40) ;
      vertex(this.x + 12 * this.r/40, this.y - 5 * this.r/40);
    endShape();
    pop();
      
  }
  
  resize(size) {
    this.r = size;
  }

  recolor(newhsbc) {
    this.hsbc = newhsbc;
  }
  
  animateGumballs(slowdown) {

      //bounce gumballs
    
    if (dist(this.x + this.xspeed, this.y, 0, 0) > 130) {
            this.xspeed = -this.xspeed;

      } 
    if (dist(this.x, this.y + this.yspeed, 0, 0) > 130) {
            this.yspeed = -this.yspeed;
      }
    
      this.x += this.xspeed * slowdown;
      this.y += this.yspeed * slowdown;
    
    
      
    }
}
class Coin {
  constructor(x, y, w, h) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.inSlot = false; // Is it in the slot
    this.x = x;
    this.y = y;
    this.w = w;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  over() {
    // Is mouse over object
    if (mouseX > (this.x - this.w/2) && mouseX < (this.x + this.w/2) && mouseY > this.y - this.w/2 && mouseY < this.y + this.w/2) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
      if (this.x >  windowWidth/2 -15 && this.x < windowWidth/2 + 15 && this.y > windowHeight/2 + 75 && this.y < windowHeight/2 + 105 )
      {
        this.inSlot = true;
      } else {
        this.inSlot = false;
      }
    }
    
    //insert coin    
    if (this.inSlot) {
      if (!this.dragging){
        this.insert();
        this.inSlot = false;
      }
    }
  }
  
  insert(){
    this.x = -100;
    this.w = 0;
  }

  show() {
    // Different fill based on state
    if (this.inSlot) {
      fill(25);
    } else if (this.dragging) {
      fill(50);
    } else if (this.rollover) {
      fill(100);
    } else {
      fill(175);
    }
    circle(this.x, this.y, this.w);
  }
  

  pressed() {
    // Did I click on the rectangle?
    if (this.rollover) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}