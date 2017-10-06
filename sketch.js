"use strict";

var WIDTH = 1200;
var HEIGHT = 800;
var vehicles = [];
var frame = 0;


function setup() {
    createCanvas(windowWidth-10,windowHeight-10);
    var vehicle = new Vehicle(200,200);
    vehicles.push(vehicle);

}
function draw() {
    background(200,200,200);
    
    for(var i=0;i<vehicles.length;i++){
        var v = vehicles[i]
        v.applyBehaviorSeekSeparate(vehicles);
        v.update();
        v.show();
        if (frameCount - frame > 60){
            frame = frameCount;
             vehicles.push(new Vehicle(Math.random()*WIDTH, Math.random()*HEIGHT));
            }
    }
    

}

function mouseClicked() {
    vehicles.push(new Vehicle(Math.random()*WIDTH, Math.random()*HEIGHT));
    console.log(vehicles)
}

