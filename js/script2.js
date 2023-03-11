var game = 
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 2, 0, 0], // 1,1,1,1 = snake ; 2 = apple
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

var table = document.getElementById("table");
var scoreHTML = document.getElementById("score");
var HscoreHTML = document.getElementById("Hscore");
var Hscore = 0;
var score = 0;

for(var i = 0; i < game.length; i++){
    var ligne = document.createElement("tr");
    for(var j = 0; j < game[i].length; j++){
        var point = document.createElement("td");
        ligne.appendChild(point);
        switch(game[i][j]){
            case 0: 
            point.classList.add("vide");
            break;

            case 1: 
            point.classList.add("snake");
            break;

            case 2: 
            point.classList.add("apple");
            break;
        }
    }
    table.appendChild(ligne);
}

var hx = hy = 4;
var dir = 39;
var inwait = undefined;
var snake = [[4,1],[4,2],[4,3],[4,4]];
var inverse = {
    37: 39,
    38: 40,
    39: 37,
    40: 38
}

function changer_vitesse(a){
    switch(a){
        case "lent":
        
        break;

        case "normal":
        
        break;

        case "rapide":
        
        break;
    }
}

function highScore(s){
    if(s >= Hscore){
        Hscore = s;
    }
}

function setup(e){
    if((e.keyCode >= 37 && e.keyCode <= 40) || e.keyCode === 82){
        inwait = e.keyCode;
    }
}

addEventListener('keydown', setup);

function reset(){
    game = 
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 2, 0, 0], // 1,1,1,1 = snake ; 2 = apple
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    
    for(var i = 0; i < game.length; i++){
        for(var j = 0; j < game[i].length; j++){
            table.childNodes[i+3].childNodes[j].removeAttribute("class");
            switch(game[i][j]){
                case 0:
                table.childNodes[i+3].childNodes[j].classList.add("vide");
                break;

                case 1:
                table.childNodes[i+3].childNodes[j].classList.add("snake");
                break;

                case 2:
                table.childNodes[i+3].childNodes[j].classList.add("apple");
                break;
            }
        }
    }
    
    hx = hy = 4;
    dir = 39;
    snake = [[4,1],[4,2],[4,3],[4,4]];
    inwait = undefined;
    score = 0;
    scoreHTML.innerText = 0;
}

function check(pos){
    var last = snake.shift();
    switch(game[pos[0]][pos[1]]){
        case 0:
        table.childNodes[last[0]+3].childNodes[last[1]].classList.remove("snake"); // supprime le snake et le
        table.childNodes[last[0]+3].childNodes[last[1]].classList.add("vide"); // remplace par du vide
        game[last[0]][last[1]] = 0;

        table.childNodes[hy+3].childNodes[hx].classList.remove("vide"); // supprime le vide et le 
        table.childNodes[hy+3].childNodes[hx].classList.add("snake"); // remplace par un bloc de snake
        game[pos[0]][pos[1]] = 1;
        break;

        case 1:
        if(pos.toString() != last.toString()){
            reset();
        }
        break;

        case 2:
        snake.unshift(last);
        var ap = replaceApple();
        table.childNodes[ap[0]+3].childNodes[ap[1]].classList.remove("vide"); // supprime le vide et le
        table.childNodes[ap[0]+3].childNodes[ap[1]].classList.add("apple"); // remplace par une pomme

        table.childNodes[hy+3].childNodes[hx].classList.remove("apple"); // supprime la pomme et la
        table.childNodes[hy+3].childNodes[hx].classList.add("snake"); // remplace par le snake
        score++;
        scoreHTML.innerText = score;
        highScore(score);
        HscoreHTML.innerText = Hscore;
        game[pos[0]][pos[1]] = 1;
        break;
    }
}

function border(){
    var result = false;
    if(hx < 0 || hx > game[0].length - 1 || hy < 0 || hy > game.length - 1){
        result = true;
    }
    return result
}

function casesLibres(){
    var result = [];
    for(var i = 0; i < game.length; i++){
        for(var j = 0; j < game[i].length; j++){
            if(game[i][j] === 0){
                result.push([i,j]);
            }
        }
    }
    return result
}

function replaceApple(){
    var caseslibres = casesLibres();
    var posApple = caseslibres[Math.round(Math.random() * (caseslibres.length - 1))];
    game[posApple[0]][posApple[1]] = 2;
    return posApple
}

function checkdir(){
    if(inverse[inwait] != dir){
        dir = inwait;
    }
}

function victory(){
    if(score == 85){
        alert("Bravo !");
        reset();
    }
}

function main(){
    checkdir();
    victory();
    switch(dir){
        case 39: // right
        hx++;
        if(border()){
            reset();
        } else {
            snake.push([hy,hx]);
            check([hy,hx]);
        }
        break;

        case 40: // down
        hy++;
        if(border()){
            reset();
        } else {
            snake.push([hy,hx]);
            check([hy,hx]);
        }
        break;
        
        case 37: // left
        hx--;
        if(border()){
            reset();
        } else {
            snake.push([hy,hx]);
            check([hy,hx]);
        }
        break;
        
        case 38: // up
        hy--;
        if(border()){
            reset();
        } else {
            snake.push([hy,hx]);
            check([hy,hx]);
        }
        break;

        case 82: // r
        reset();
        break;
    }
}

setInterval(main,200);