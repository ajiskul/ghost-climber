var tower,toweri, door,doori,ghost,ghosti, climber,climberi,invblock
var doorg,climberg,invg
var gameS=1
var edges
function preload(){
  toweri=loadImage("tower.png")
  climberi=loadImage("climber.png")
  ghosti=loadImage("ghost-standing.png")
  doori=loadImage("door.png")
}
function setup(){
  createCanvas(600,600)
  tower=createSprite(300,300)
  tower.addImage(toweri)
  ghost=createSprite(400,400)
  ghost.addImage(ghosti)
  ghost.scale=0.3
  edges=createEdgeSprites()
  doorg=new Group()
  climberg=new Group()
  invg=new Group()
}
function draw(){
  background("white")
  if(gameS===1){
    crDoor()
    tower.velocityY=1.5
    if(tower.y>400){
      tower.y=300
    }
    tower.visible=true
    ghost.visible=true
    ghost.velocityY=ghost.velocityY+0.5
    ghost.collide(edges)
    if(keyDown("space")){
      ghost.velocityY=-5
    }
    if(keyDown("left")){
      ghost.x=ghost.x-5
    }
    if(keyDown("right")){
      ghost.x=ghost.x+5
    }
    if(climberg.isTouching(ghost)){
      ghost.velocityY=0
    }
    if(invg.isTouching(ghost)){
      gameS=0
    }
  }else if(gameS===0){
    tower.visible=false
    ghost.visible=false
    invg.destroyEach()
    climberg.destroyEach()
    doorg.destroyEach()
    textSize(30)
    text("press r to restart", 250,300)
    if(keyDown("r")){
      gameS=1
      ghost.x=400
      ghost.y=400
    }
  }
  drawSprites()
}
function crDoor(){
  if(frameCount%100===0){
     door=createSprite(100,-50)
    door.addImage(doori)
    door.velocityY=2
    door.lifetime=400
    door.x=Math.round(random(100,400))
    
    climber=createSprite(100,10)
    climber.addImage(climberi)
    climber.velocityY=2
    climber.lifetime=400
    climber.x=door.x
    
    invblock=createSprite(100,climber.y+10,climber.width-30,climber.height-20)
    invblock.velocityY=2
    invblock.lifetime=400
    invblock.visible=false
    invblock.x=door.x
    
    door.depth=ghost.depth
    ghost.depth+=1
    climber.depth=ghost.depth
    ghost.depth+=1
    
    doorg.add(door)
    climberg.add(climber)
    invg.add(invblock)
    
     }
}