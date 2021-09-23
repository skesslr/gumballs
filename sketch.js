var fft, peakDetect;
let gumballs = [];
let t = 0;
let coinsInserted = 0;
let gumballColors = 
    [[0,204,0], //green
     [204,0,0], //red
     [255,128,0], //orange
     [255,255,0], //yellow
     [0,128,255], //pink
     [255,102,178],//blue
     [250,250,250], //white
     [128,0,128], //purple
    ];

let hsbGumballColors = 
    [120, //green
     0, //red
     30, //orange
     60, //yellow
     320, //pink
     210,//blue
     270 //purple
    ];

function preload() {
    mySound = loadSound('/music.m4a');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //populate gumball array
  for(let i = 2; i < 360; i++){
    let x = random(-150,150)
    let y = random(-30,150)
    let radius = 40;
    if (dist(x, y, 0, 0) < 130){
      
      let colorIndex = Math.floor(random(gumballColors.length));
      
      let hsbColorIndex = Math.floor(random(hsbGumballColors.length));
      
      gumballs.push(new Gumball(x, y, radius, hsbGumballColors[hsbColorIndex], random(-2,2),random(-2,2)));
      
    }      
  }

  
  //show coins
  shape1 = new Coin(width/2, height/2 + 250, 50, 50);
  shape2 = new Coin(width/2 + 60, height/2 + 250, 50, 50);
  shape3 = new Coin(width/2-60, height/2 + 250, 50, 50);
  
  //setup audio
  //   fft = new p5.FFT();
  //   peakDetect = new p5.PeakDetect(500,10000, 0.05, 60);
  amp = new p5.Amplitude(.6);
  
  
}

function draw() {
    
    if (coinsInserted == 3) {
        background(256,15)
    } else {
        background(256)
    }
  
    if(mySound.isPlaying()){
    push();
    colorMode(HSB);
    
    background(map(noise(t), 0, 1, 0,360), 30, 100, .15);
    pop();
    } else {
      background(256,20)
    }
      
  
    var vol = amp.getLevel()

    t += 0.01;
  
      rectMode(CENTER)  
  
      //GLOBE
      push();
      strokeWeight(4)
      stroke(100,180,300, 70)
      fill(100,300,300, 10);
      translate(width/2,height/2)
      if(mySound.isPlaying()){
        circle(0,-130,map(vol,0,1,280,400))
      }else{
      circle(0,-130,300)
        
      }
      pop();
      
      //GUMBALLS
      push();
      console.log(height)
      translate(width/2,height/2 - 130)
      for (let i = 0; i < gumballs.length; i++){
        gumballs[i].show();
        
        if(mySound.isPlaying()){
            gumballs[i].animateGumballs(1);
            gumballs[i].resize(map(vol,0,1,20,100));
            gumballs[i].recolor((noise(t) * 360 + gumballs[i].hsbc_%50), 0 , 360, 0, 360);
        } else {
            if (coinsInserted == 3){
              gumballs[i].resize(40);
              gumballs[i].animateGumballs(.5);
              gumballs[i].recolor(gumballs[i].hsbc_);
          }      
        }
      }
      pop();
      
      //REFLECTION
      push();
  
      if(mySound.isPlaying()){  
        translate(width/2,height/2)
        strokeWeight(0);
        fill(255,200);
        beginShape();
        vertex(map(vol,0,1,-125,-145),map(vol,0,1,-140,-160));
        vertex(map(vol,0,1,-90,-110),map(vol,0,1,-160,-180));
        vertex(map(vol,0,1,-70,-90),map(vol,0,1,-220,-240));
        vertex(map(vol,0,1,-100,-120),map(vol,0,1,-190,-210));
        endShape();

        strokeWeight(0);
        fill(255,200);
        beginShape();
        vertex(map(vol,0,1,-123,-143),map(vol,0,1,-120,-140));
        vertex(map(vol,0,1,-88,-108),map(vol,0,1,-140,-160));
        vertex(map(vol,0,1,-68,-88),map(vol,0,1,-200,-220));
        vertex(map(vol,0,1,-98,-118),map(vol,0,1,-170,-190));
        endShape();
      } else {
        translate(width/2,height/2)
        strokeWeight(0);
        fill(255,200);
        beginShape();
        vertex(-135,-150);
        vertex(-100,-170);
        vertex(-80,-230);
        vertex(-110,-200);
        endShape();

        strokeWeight(0);
        fill(255,200);
        beginShape();
        vertex(-133,-130);
        vertex(-98,-150);
        vertex(-78,-210);
        vertex(-108,-180);
        endShape();
      }
      pop();
      
      //FORMAT_BASE + DOME
      push();
      translate(width/2,height/2)
      if(mySound.isPlaying()){  
        colorMode(RGB)
        fill(256);
        strokeWeight(0)
      } else {
        colorMode(RGB)
        fill(160, 0, 0);
        strokeWeight(2)
        stroke(200,0,0) 
      }
  
      //DOME
      if(mySound.isPlaying()){
        arc(0, map(vol,0,1,-272,-332), 20, 20, PI, TWO_PI); //dome tip
        arc(0, map(vol,0,1,-250,-310), 160, 50, PI, TWO_PI); //dome        
      }else{
        arc(0, -282, 20, 20, PI, TWO_PI); //dome tip
        arc(0, -260, 160, 50, PI, TWO_PI); //dome        
      }
        
      //NECK
      if(mySound.isPlaying()){
        quad(-80,map(vol,0,1,-3,57), 80,map(vol,0,1,-3,57), 95, 190,-95, 190); // neck
        rect(0, map(vol,0,1,-3,57), 200, 28) // top of neck
        arc(0, 200, 300, map(vol,0,1,80,40), PI, TWO_PI); // base   
      }else{
        quad(-80,7, 80,7, 95, 190,-95, 190); // neck
        rect(0, 7, 200, 28) // top of neck
        arc(0, 200, 300, 80, PI, TWO_PI); // base      
      }
      
      pop();
      
      //COIN TAKER    
      push();
      translate(width/2,height/2)
      
      if(mySound.isPlaying()){
          
          colorMode(HSB)
          noStroke();
        
          fill(map(noise(t), 0, 1, 0,360), 30, 100, .8)
          circle(0, map(vol,0,1,90,120), 50);
        
          //PAUSE BUTTON
          fill(256);
          rect(-6, map(vol,0,1,90,120),  7,20)
          rect(6, map(vol,0,1,90,120),  7,20)
      } else{
        if (coinsInserted == 3) {
          
          //METAL RECTANGLE
          strokeWeight(2)
          stroke(200)
          fill(180)
          rect(0, 90, 70, 100)

          //COIN SLOT
          fill(256)
          circle(0, 90, 50);
          
          //PLAY BUTTON
          fill(180)
          noStroke();
          triangle(-7, 80, -7, 100,10,90);
          }else {
          
          //METAL RECTANGLE
          strokeWeight(2)
          stroke(200)
          fill(180)
          rect(0, 90, 70, 100)
          
          //COIN SLOT
          stroke(190)
          fill(140)
          circle(0, 90, 50)
          
          fill(20)
          textAlign(CENTER, CENTER);
          textSize(15);
          text("75¢", 0,126)
            
          textSize(15);
          text("insert", 0,55)
      }

    }
      pop();
  
  push();
  //translate(windowWidth/2, windowHeight/2)
  //show coin
  stroke(100)
  shape1.over();
  shape1.update();
  shape1.show();
  
  shape2.over();
  shape2.update();
  shape2.show();
  
  shape3.over();
  shape3.update();
  shape3.show();
  pop();
  
}

function mousePressed() {
  shape1.pressed();
  shape2.pressed();
  shape3.pressed();
}

function mouseReleased() {
  shape1.released();
  shape2.released();
  shape3.released();
  if (shape1.inSlot){
    coinsInserted += 1;
    console.log(coinsInserted);
    //shape1.inSlot = false;
  }
  
  if (shape2.inSlot){
    coinsInserted += 1;
    console.log(coinsInserted);
    //shape1.inSlot = false;
  }
  
  if (shape3.inSlot){
    coinsInserted += 1;
    console.log(coinsInserted);
    //shape1.inSlot = false;
  }
  
  if(coinsInserted === 3){
    console.log("SUCCESS");
    
    if(mySound.isPlaying()){
        mySound.pause();
    } else{
      mySound.play();
    }
    
  }
  
}