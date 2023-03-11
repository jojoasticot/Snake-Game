var inverse = {
    "right": "left",
    "left": "right",
    "up": "down",
    "down": "up"
}

export class Snake{
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
  };

export class Apple {
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
            if(s.lst[i].toString() == this.position()){
                isOn = true;
            }
        }
        return isOn
    }
}
