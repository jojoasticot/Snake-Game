var inverse = {
    "right": "left",
    "left": "right",
    "up": "down",
    "down": "up"
}

// Creation de la classe snake et apple

class Snake{
    constructor(lst) { 
        this.lst = lst; // array of positions of every point of te snake. Ex: [[0,0],[0,1],[1,1]]
        this.hx = lst[lst.length-1][0]; //head x,y
        this.hy = lst[lst.length-1][1];
        this.current_direction = "right";
    }

    collision(){
        var i = 0;
        var result = false;
        while (i < this.lst.length-4 && !result){
            if(this.head().toString() === this.lst[i].toString()){
                result = true;
            }
            i++;
        }
        return result
    }

    head(){
        return [this.hx,this.hy]
    }

    rotate(dir){
        if(inverse[this.current_direction] != dir){
            if(dir == "left"){
                this.hx -= 1;
                this.lst.push(this.head());
                this.lst.shift();
            } else if (dir == "right"){
                this.hx += 1;
                this.lst.push(this.head());
                this.lst.shift();
            } else if (dir == "up"){
                this.hy -= 1;
                this.lst.push(this.head());
                this.lst.shift();
            } else if (dir == "down"){
                this.hy += 1;
                this.lst.push(this.head());
                this.lst.shift();
            }
            this.current_direction = dir;
            return [this.hx,this.hy]
        } else {
            return this.avancer();
        }
    }

    avancer(){
        return this.rotate(this.current_direction);
    }

    checkApple(apple){
        return apple.position().toString() == [this.hx,this.hy].toString()
    }
}

class Apple {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    position(){
        return [this.x,this.y]
    }

    isOnSnake(s){
        var isOn = false;
        var i = 0;
        while(i < s.lst.length && !isOn){
            if(s.lst[i].toString() == this.position().toString()){
                isOn = true;
            }
            i++;
        }
        return isOn
    }
}

// Creation du background du jeu

canvas = document.getElementById('cv');
ctx = canvas.getContext('2d');
ctx.rect(0, 0, 300, 300);
ctx.fill();

// Definition du snake et du x et y de la pomme

var s = new Snake([[0,4],[1,4],[2,4],[3,4],[4,4]]);
var xApple = Math.round(Math.random() * 8);
var yApple = Math.round(Math.random() * 8);

// On evite que la pomme soit sur le snake

while(yApple === 4 && xApple >=0 && xApple <= 4){
    var yApple = Math.round(Math.random() * 8);
}

// Creation de la pomme

var p = new Apple(xApple, yApple);

// Placement de la pomme sur la grille

ctx.fillStyle = "red";
ctx.beginPath();
ctx.arc(300/18 + (300/9) * (p.position()[0]), 300/18 + (300/9) * (p.position()[1]) , 300/18, 0, 2 * Math.PI);
ctx.fill();

// Placement du serpent sur la grille

for(var i = 0; i < s.lst.length; i++){
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(300/18 + (300/9) * (s.lst[i][0]), 300/18 + (300/9) * (s.lst[i][1]) , 300/18, 0, 2 * Math.PI);
    ctx.fill();
}

// creation pour replacer une pomme aléatoirement après que le snake l'ait touché

function replaceApple(){
    xApple = Math.round(Math.random() * 8);
    yApple = Math.round(Math.random() * 8);
    p = new Apple(xApple,yApple)

    while(p.isOnSnake(s)){
        xApple = Math.round(Math.random() * 8);
        yApple = Math.round(Math.random() * 8);
        p = new Apple(xApple,yApple)
    }

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(300/18 + (300/9) * (p.position()[0]), 300/18 + (300/9) * (p.position()[1]) , 300/18, 0, 2 * Math.PI);
    ctx.fill();
}

function main(event){
    if(event.keyCode === 38){ // up
        s.rotate("up");
        console.log(s.head());
        if(s.checkApple(p)){
            console.log("POOOOOME");
            replaceApple();
        }
    } else if(event.keyCode === 37){ // left
        s.rotate("left");
        console.log(s.head());
        if(s.checkApple(p)){
            console.log("POOOOOME");
            replaceApple();
        }
    } else if(event.keyCode === 39){ // right
        s.rotate("right");
        console.log(s.head());
        if(s.checkApple(p)){
            console.log("POOOOOME");
            replaceApple();
        }
    } else if(event.keyCode === 40){ // down
        s.rotate("down");
        console.log(s.head());
        if(s.checkApple(p)){
            console.log("POOOOOME");
            replaceApple();
        }
    } else { // none

    }
}

window.addEventListener("keydown", main);