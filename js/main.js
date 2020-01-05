document.body.onload = game;

//canvas容器
var can1;
var can2;
//容器宽高
var canWidth;
var canHeight;
//画笔
var ctx1;
var ctx2;
//上次时间，和时间间隔
var lastTime;
var deltaTime;

var bgPic = new Image();
//海草，果实
var ane;
var fruit;
//鱼妈妈
var mom;
//妈妈位置
var mx;
var my;
//鱼宝宝
var baby;

var babyTail =[];
var babyEye = [];
var babyBody =[];

var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];

//分值
var data;

var wave;
var halo;

var dust;
var dustPic = [];

//游戏内容
function game(){
    //初始化
    init();
    //上一帧时间
    lastTime = Date.now();
    //初始化间隔时间
    deltaTime = 0;
    //循环
    gameloop();
}

function init() {
    //获得canvas context
    can1 = document.getElementById("canvas1");//画fishes.dust,ui
    ctx1 = can1.getContext('2d');

    can2 = document.getElementById("canvas2");//bg,ane,fruits
    ctx2 = can2.getContext('2d');

    can1.addEventListener("mousemove",onMouseMove,false);

    bgPic.src = "./src/background.jpg";

    canWidth = can1.width;
    canHeight = can1.height;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();

    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    for(var i = 0 ; i < 8 ; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = './src/babyTail' + i + '.png';
    }

    for(var i =0 ; i <2;i++) {
        babyEye[i] = new Image();
        babyEye[i].src = './src/babyEye' + i + '.png';
    }
    for(var i = 0; i< 20; i++){
        babyBody[i] = new Image();
        babyBody[i].src = './src/babyFade' + i + '.png';
    }

    for(var i = 0 ; i < 8 ; i++) {
        momTail[i] = new Image();
        momTail[i].src = './src/bigTail' + i + '.png';
    }
    for(var i =0 ; i <2;i++) {
        momEye[i] = new Image();
        momEye[i].src = './src/bigEye' + i + '.png';
    }
    data = new dataObj();

    for(var i =0 ; i <8;i++) {
        momBodyOra[i] = new Image();
        momBodyOra[i].src = './src/bigSwim' + i + '.png';
        momBodyBlue[i] = new Image();
        momBodyBlue[i].src = './src/bigSwimBlue' + i + '.png';
    }

    ctx1.font = '30px Verdana';
    ctx1.textAlign = 'center';

    wave = new waveObj();
    wave.init();

    halo = new haloObj();
    halo.init();
    

    for(var i = 0; i < 7; i++){
        dustPic[i] = new Image();
        dustPic[i].src = './src/dust' + i + ".png"; 
    }
    dust = new dustObj();
    dust.init();


}

function gameloop() {
    //针对动画效果的api
    //屏幕刷屏频率为60hz==》每秒刷新60次  ==》16.7ms（刷新一次）
    //requestAnimFrame刷新时间可以跟浏览器的一致
    requestAnimFrame(gameloop)//setInterval,setTimeout,frame per second
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if(deltaTime > 50)deltaTime = 40;

    //绘制背景
    drawBackground();
    //绘制海葵
    ane.draw();
    //监视果实
    fruitObjMonitor();
    //绘制果实
    fruit.draw();


    //鱼
    ctx1.clearRect(0,0,canWidth,canHeight);
    mom.draw();
    baby.draw();
    momFruitsCollision();
    momBabyCollision();

    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}

function onMouseMove(e) {
    if(!data.gameOver){
        if(e.offSetX || e.layerX) {
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
            
       }
    }
  
}