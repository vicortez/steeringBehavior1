"use strict";

var WIDTH = 1200;
var HEIGHT = 800;
var MOUSERADIUS = 20;
var seekerVehicles = [];
var runnerVehicles = [];
var seekerFrame = 0;
var runnerFrame = 0;
var wrong;
var coin;
var music;
var font;
var collected = 0;

function preload() {
    wrong = loadSound('ops.mp3');
    wrong.setVolume(0.6);
    coin = loadSound("coin.mp3");
    coin.setVolume(0.7);
    music = loadSound("rag.mp3");
    music.setVolume(0.2);
    font = loadFont('SteelworksVintage.otf');
}

function setup() {
    createCanvas(windowWidth-10,windowHeight-10);
    var vehicle = new Vehicle(200,200, 0);
    seekerVehicles.push(vehicle);
    noCursor();
    music.play();
    textSize(30);
}
function draw() {
    background(200,200,200,100);
    push();
    fill(0);
    text(Math.floor(frameCount/30)+collected, 30, 30);
    pop();
    push();
    fill(20,200,20)
    stroke(255) // RGB + transparency
    strokeWeight(5);
    ellipse(mouseX, mouseY, MOUSERADIUS, MOUSERADIUS);
    pop();
    
    for(var i=0;i<seekerVehicles.length;i++){
        var v = seekerVehicles[i]
        v.applyBehaviorSeekSeparateFromVehicles(seekerVehicles);
        v.update();
        v.show();
        if(checkSeekerCollision(v.pos)){
            wrong.play();
            noLoop();
            music.stop();
			cursor();
        }
    }
    for(var i = 0; i<runnerVehicles.length; i++){
        var v = runnerVehicles[i];
        v.applyBehaviorSeparate(mouseX,mouseY);
        v.update();
        v.show();
        if(checkRunnerCollision(v.pos)){
            coin.play();
            text("+1", 100, 30);
            collected++;
            runnerVehicles.splice(i,1);
        }
    }
    if (frameCount - seekerFrame > 60){
        seekerFrame = frameCount;
        seekerVehicles.push(new Vehicle(Math.random()*WIDTH, Math.random()*HEIGHT, 0)); //new seeker every second
        runnerVehicles.push(new Vehicle(Math.random()*WIDTH, Math.random()*HEIGHT, 1));
    }
    //if (frameCount - runnerFrame > 120){
        //runnerFrame = frameCount;
      //  runnerVehicles.push(new Vehicle(Math.random()*WIDTH, Math.random()*HEIGHT, 1)); //new runner every other second
    //}
    

}

function mouseClicked() {
    //runnerVehicles.push(new Vehicle(Math.random()*WIDTH, Math.random()*HEIGHT, 1));
    console.log(runnerVehicles)
    redraw();
}

function checkSeekerCollision(pos){
    var mouse = createVector(mouseX, mouseY);
    return p5.Vector.dist(pos, mouse) <= MOUSERADIUS ? true : false;
}

function checkRunnerCollision(pos){
    var mouse = createVector(mouseX, mouseY);
    return p5.Vector.dist(pos, mouse) <= MOUSERADIUS*2 ? true : false;
}

