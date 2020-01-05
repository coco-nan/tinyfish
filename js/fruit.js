  fruitObj = function () {
    this.alive = [];//bool
    this.x = [];
    this.y = [];
    this.aneNO = [];
    this.l = [];
    this.spd =[];
    this.fruitTyper = [];
    this.orange = new Image();
    this.blue = new Image ();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++){
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNO[i] = 0; 
        this.l[i] = 0;
        this.spd[i] = Math.random() * 0.01 + 0.005;
        this.fruitTyper[i] = "";
    }
    this.orange.src = "./src/fruit.png";
    this.blue.src = "./src/blue.png";

};

fruitObj.prototype.draw = function () {
    for (var i = 0; i < this.num; i++) {
        //draw
        //find an ane, grow
        //判断当前果实是否有生命
        if(this.alive[i]){
            if(this.fruitTyper[i] == "blue"){
                var pic = this.blue;
            }
            else{
                pic = this.orange;
            }
            //判断当前果实的大小
            if(this.l[i] <= 15){
                var No = this.aneNO[i]
                this.x[i] = ane.headx[No];
                this.y[i] = ane.heady[No];
                this.l[i] += this.spd[i] * deltaTime;
                
            }else{
                this.y[i] -= this.spd[i] * 3 * deltaTime;
               
            }
            ctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,this.l[i],this.l[i]);
            
            if(this.y[i] < 10){
                this.alive[i] = false ;
            }
        }
    
    }

}


fruitObj.prototype.born = function(i) {
    this.aneNO[i] = Math.floor(Math.random() * ane.num);
    // this.x[i] = ane.headx[aneId];
    // this.y[i] =  ane.heady[aneId];
    this.l[i] = 0 ;
    this.alive[i] = true;
    var ran = Math.random();
    if(ran < 0.2)
    {this.fruitTyper[i] = "blue";}
    else{
        this.fruitTyper[i] ="orange"
    }

}

fruitObj.prototype.dead = function(i) {
    this.alive[i] = false;
}

function fruitObjMonitor() {
    var sum = 0;
    for(var i = 0; i < fruitObj.num;i++){
        if ( fruit.alive[i]) sum++; 
    }
    if(sum < 15) {
        sendFruit();
       
    }
}
function sendFruit () {
    for(var i = 0; i < fruit.num; i++ ){
        if(!fruit.alive[i]) 
            {
                fruit.born(i);
                return;
            }
        
    }
}