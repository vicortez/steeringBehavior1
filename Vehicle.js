class Vehicle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(Math.random(),Math.random());
        this.acc = createVector();
        this.target = createVector(x, y);
        this.radius = 10;
        this.maxSpeed = 10;
        this.maxForce = 0.3;
    }
    
    show(){
        var angle = this.vel.heading() + Math.PI/2;
        push();
        translate(this.pos.x, this.pos.y);
        rotate(angle);
        fill(0,200,200,80)
        stroke(255,0,0) // RGB + transparency
        strokeWeight(1);
        beginShape();
        vertex(0, -this.radius * 2);
        vertex(-this.radius, this.radius * 2);
        vertex(this.radius, this.radius * 2);
        endShape(CLOSE);
        pop();
        //ellipse(this.pos.x,this.pos.y,this.radius,this.radius); //x y width height 
    }
    
    update(){
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    applyBehaviorSeek(){
        var seek = this.seek(this.target);
        this.applyForce(seek);
    }
    
    applyBehaviorSeekSeparate(vehicles){
        var seek = this.seek(this.target);
        var separate = this.separate(vehicles);
        //separate.mult(3);
        //var steer = p5.Vector.sub(seek, separate);
        //steer.setMag(this.maxForce);
        //this.applyForce(steer);
        
        //console.log("separate: " + separate + " seek " + seek + " steer " + steer);
        seek.mult(0.8);
        //separate.mult(1);
        this.applyForce(seek);
        this.applyForce(separate);
    }

    applyForce(force){
        this.acc.add(force);
    }
    
    separate(vehicles){
        var personalSpaceRadius = this.radius * 5;
        var sum = createVector();
        var steer = createVector();
        var count=0;
        for(var i=0;i<vehicles.length;i++){
            var distance = p5.Vector.dist(this.pos, vehicles[i].pos);
            if(distance > 0 && distance < personalSpaceRadius){ //too close to my personal space!
                var desired = p5.Vector.sub(this.pos, vehicles[i].pos);
                desired.setMag(this.maxSpeed);
                desired.div(distance);
                sum.add(desired);
                count++;
            }
        }
        if(count > 0){
            sum.div(count);
            sum.setMag(this.maxSpeed);
            steer = p5.Vector.sub(sum, this.vel);
            steer.setMag(this.maxForce);
        }
        this.applyForce(steer);
        return steer;
    }

    seek(target){
        this.target = createVector(mouseX, mouseY);
        var desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSpeed);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.setMag(this.maxForce);
        return steer;
    }
}