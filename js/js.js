
let cvs=document.getElementById("canvas")
let ctx=cvs.getContext("2d")
cvs.width=innerWidth
cvs.height=innerHeight-50
cvs.style.background="rgb(5, 122, 126)"
//звук удара шаров
function play1(){
    let audio=new Audio()
audio.src="sounds/e6e94ccf7efd18f.mp3"
audio.play()
}

let sum //сумма радиусов двух шаров
let sumPocket//сумма радиусов шара и лузы
let r=20 //радиус шара
let power=10//сила удара
let pocketR=r*1.2//радиус лузы

//переменные для построения пирамиды
let posBallX=innerWidth/4
let posBallY=innerHeight/4

//адаптация
if(innerWidth<600){
    r=15
    posBallX=innerWidth/2+r*4
    pocketR=r*1.2
    power=5
}

let score=0//табло счета

//вспомогательные переменные управления кооординатами
let move
let mouseX
let mouseX2
let mouseX3
let mouseY
let mouseY2
let mouseY3
let sss=0
let x
let y
let step=0
let distance

//объекты луз
let pocket1={
    x:30,
    y:30,
    color:"black",
    radius:pocketR,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    }
}
let pocket2={
    x:cvs.width/2,
    y:10,
    color:"black",
    radius:pocketR,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    }
}
let pocket3={
    x:cvs.width-30,
    y:30,
    color:"black",
    radius:pocketR,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    }
}
let pocket4={
    x:cvs.width-30,
    y:cvs.height-30,
    color:"black",
    radius:pocketR,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    }
}
let pocket5={
    x:cvs.width/2,
    y:cvs.height-10,
    color:"black",
    radius:pocketR,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    }
}
let pocket6={
    x:30,
    y:cvs.height-30,
    color:"black",
    radius:pocketR,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    }
}
let pockets=[]//массив луз
pockets.push(pocket1,pocket2,pocket3,pocket4,pocket5,pocket6)//массив луз

//объекты бортов
let board1={
    x:0,
    y:0,
    width:innerWidth,
    height:r+10,
    color:"rgb(150, 72, 8)",
    draw:function(){
        ctx.fillStyle=this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}
let board2={
    x:cvs.width-r-10,
    y:0,
    width:r+10,
    height:innerHeight,
    color:"rgb(150, 72, 8)",
    draw:function(){
        ctx.fillStyle=this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}
let board3={
    x:0,
    y:cvs.height-r-10,
    width:cvs.width,
    height:r+10,
    color:"rgb(150, 72, 8)",
    draw:function(){
        ctx.fillStyle=this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}
let board4={
    x:0,
    y:0,
    width:r+10,
    height:cvs.height,
    color:"rgb(150, 72, 8)",
    draw:function(){
        ctx.fillStyle=this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}
let boards=[]//массив бортов
boards.push(board1,board2,board3,board4)//массив бортов

//обьекты шаров
let ball={
    x:innerWidth*0.7,
    y:cvs.height/2,
    color:"white",
    radius:r,
    vx:0,
    vy:0,
    mass:10,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    },
    angle:function(){
        return Math.atan2(this.vy,this.vx)
    },
    speed:function(){
        return Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }
}
let ball2={
    x:posBallX,
    y:cvs.height/2-r*4,
    color:"black",
    radius:r,
    vx:0,
    vy:0,
    mass:10,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    },
    angle:function(){
        return Math.atan2(this.vy,this.vx)
    },
    speed:function(){
        return Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }
}
let ball3={
    x:ball2.x,
    y:ball2.y+r*2,
    color:"red",
    radius:r,
    vx:0,
    vy:0,
    mass:10,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    },
    angle:function(){
        return Math.atan2(this.vy,this.vx)
    },
    speed:function(){
        return Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }
}
let ball4={
    x:ball2.x,
    y:ball3.y+r*2,
    color:"blue",
    radius:r,
    vx:0,
    vy:0,
    mass:10,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    },
    angle:function(){
        return Math.atan2(this.vy,this.vx)
    },
    speed:function(){
        return Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }
}

let ball5={
    x:ball2.x,
    y:ball4.y+r*2,
    color:"pink",
    radius:r,
    vx:0,
    vy:0,
    mass:10,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    },
    angle:function(){
        return Math.atan2(this.vy,this.vx)
    },
    speed:function(){
        return Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }
}
let ball6={
    x:ball2.x,
    y:ball5.y+r*2,
    color:"yellow",
    radius:r,
    vx:0,
    vy:0,
    mass:10,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()

    },
    angle:function(){
        return Math.atan2(this.vy,this.vx)
    },
    speed:function(){
        return Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }
}
let ball7={
    x:ball2.x+34,
    y:ball2.y+r,
    color:"grey",
    radius:r,
    vx:0,
    vy:0,
    mass:10,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    },
    angle:function(){
        return Math.atan2(this.vy,this.vx)
    },
    speed:function(){
        return Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }
}
let ball8={
    x:ball7.x,
    y:ball7.y+r*2,
    color:"brown",
    radius:r,
    vx:0,
    vy:0,
    mass:10,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    },
    angle:function(){
        return Math.atan2(this.vy,this.vx)
    },
    speed:function(){
        return Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }
}

let ball9={
    x:ball8.x,
    y:ball8.y+r*2,
    color:"orange",
    radius:r,
    vx:0,
    vy:0,
    mass:10,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    },
    angle:function(){
        return Math.atan2(this.vy,this.vx)
    },
    speed:function(){
        return Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }
}

let ball10={
    x:ball9.x,
    y:ball9.y+r*2,
    color:"rgb(1,333,4,55)",
    radius:r,
    vx:0,
    vy:0,
    mass:10,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    },
    angle:function(){
        return Math.atan2(this.vy,this.vx)
    },
    speed:function(){
        return Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }
}

let ball11={
    x:ball7.x+34,
    y:ball7.y+r,
    color:"rgb(100,303,666,55)",
    radius:r,
    vx:0,
    vy:0,
    mass:10,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    },
    angle:function(){
        return Math.atan2(this.vy,this.vx)
    },
    speed:function(){
        return Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }
}

let ball12={
    x:ball11.x,
    y:ball11.y+r*2,
    color:"rgb(1000,100,10,500)",
    radius:r,
    vx:0,
    vy:0,
    mass:10,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    },
    angle:function(){
        return Math.atan2(this.vy,this.vx)
    },
    speed:function(){
        return Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }
}
let ball13={
    x:ball12.x,
    y:ball12.y+r*2,
    color:"#c61aff",
    radius:r,
    vx:0,
    vy:0,
    mass:10,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    },
    angle:function(){
        return Math.atan2(this.vy,this.vx)
    },
    speed:function(){
        return Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }
}
let ball14={
    x:ball11.x+34,
    y:ball11.y+r,
    color:"#008080",
    radius:r,
    vx:0,
    vy:0,
    mass:10,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    },
    angle:function(){
        return Math.atan2(this.vy,this.vx)
    },
    speed:function(){
        return Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }
}
let ball15={
    x:ball14.x,
    y:ball14.y+r*2,
    color:" #80ff00",
    radius:r,
    vx:0,
    vy:0,
    mass:10,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    },
    angle:function(){
        return Math.atan2(this.vy,this.vx)
    },
    speed:function(){
        return Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }
}
let ball16={
    x:ball14.x+34,
    y:ball14.y+r,
    color:" #8080ff",
    radius:r,
    vx:0,
    vy:0,
    mass:10,
    draw:function(){
        ctx.fillStyle=this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill()
    },
    angle:function(){
        return Math.atan2(this.vy,this.vx)
    },
    speed:function(){
        return Math.sqrt(this.vx*this.vx+this.vy*this.vy)
    }
}

//объект направляющей линии
let line={
    x:0,
    y:0,
    x2:0,
    y2:0,
    color:"white",
    draw:function(){
        ctx.strokeStyle=this.color
        ctx.beginPath()
        ctx.moveTo(this.x,this.y)
        ctx.lineTo(this.x2,this.y2)
        ctx.stroke()
    }
}

//объект табло счета
let tablo={
    x:pocket1.x+100,
    y:pocket1.y-r/2,
    color:"blue",
    size:"20px Righteous, cursive ",
    draw:function(){
        ctx.fillStyle=this.color
        ctx.font=this.size
        ctx.fillText("HITS:",this.x,this.y)
        ctx.fillStyle='white'
        ctx.font=this.size
        ctx.fillText(score,this.x+80,this.y)
    }
}

//объект стартовой надписи
let start={
    x:cvs.width/2,
    y:cvs.height/2,
    color:"rgba(255, 0, 0, 0.411)",
    font:"40px Righteous, cursive ",
    draw:function(){
        ctx.fillStyle=this.color
        ctx.fillRect(0,0,cvs.width,cvs.height)
        ctx.fillStyle="white"
        ctx.font=this.font
        ctx.textAlign="center"
        ctx.fillText("START",this.x,this.y)
    }
}

//функция проверки столкновения
function boom(dist,sum){
    if(dist<=sum){
        return true
    }else{return false}
    }
    //функция вычисления дистанции между двумя шарами
function dist(ballA,ballB){
    sum=ballA.radius+ballB.radius
     distance=Math.sqrt(Math.pow(ballA.x-ballB.x,2)+Math.pow(ballA.y-ballB.y,2))
     
    return distance

}
//функция вычисления дистанции между шаром и лузой
function distPocket(pocket,ball){
    sumPocket=ball.radius+pocket.radius
     let distP=Math.sqrt(Math.pow(ball.x-pocket.x,2)+Math.pow(ball.y-pocket.y,2))
     
    return distP

}


//массив шаров
let bl=[]
bl.push(ball,ball2,ball3,ball4,ball5,ball6,ball7,ball8,ball9,ball10,ball11,ball12,ball13,ball14,ball15,ball16)

//функция:если шар не сталкивается другими шарами возвращаем на исходную позицию
function iii(e){    
        if(bl[e].vx>0.5&&bl[e].vx<1||bl[e].vx<-0.5&&bl[e].vx>-1||bl[e].vy>0.5&&bl[e].vy<1||bl[e].vy<-0.5&&bl[e].vy>-1){
            return 1
        }
        if(bl[e].vx>1||bl[e].vx<-1||bl[e].vy>1||bl[e].vy<-1){
            return 2
        }
        if(bl[e].vx<0.1&&bl[e].vx>-0.1||bl[e].vy<0.1&&bl[e].vy>-0.1){
            return 0
        }
}

//адаптация
if(innerWidth<=600){
    pocket2.x=board4.width-r
    pocket2.y=cvs.height/2
    pocket5.x=board2.x+r
    pocket5.y=cvs.height/2
    //перерисовываем пирамиду
    posBallX=innerWidth/2+r*4
    posBallY=innerHeight/5
    for(let i=1;i<bl.length-10;i++){
        bl[i].x=posBallX
        bl[i].y=posBallY
        posBallX-=r*2
    }
    posBallX
    posBallX=innerWidth/2+r*3
    posBallY=innerHeight/5+r*1.7
    for(let i=6;i<bl.length-6;i++){
        bl[i].x=posBallX
        bl[i].y=posBallY
        posBallX-=r*2
    }
    posBallX=innerWidth/2+r*2
    
    posBallY=innerHeight/5+r*3.5
    for(let i=10;i<bl.length-3;i++){
        bl[i].x=posBallX
        bl[i].y=posBallY
        posBallX-=r*2
    }
    posBallX=innerWidth/2+r
    posBallY=innerHeight/5+r*5.3
    for(let i=13;i<bl.length-1;i++){
        bl[i].x=posBallX
        bl[i].y=posBallY
        posBallX-=r*2
    }
    posBallX=innerWidth/2
    posBallY=innerHeight/5+r*7
    bl[15].x=posBallX
    bl[15].y=posBallY
    bl[0].x=posBallX
    bl[0].y=innerHeight*0.7
}


start.draw()//запускаем стартовую надпись необходимо для стартового клика иначе звуки могут не работать

//функция прорисовки всего содержимого
function draw(){
   
    
    
    ctx.clearRect(0,0,cvs.width,cvs.height)//очищаем все содержимое
    //борта
    for(let i=0;i<boards.length;i++){
        boards[i].draw()
    }
    //лузы
for(let i=0;i<pockets.length;i++){
pockets[i].draw()
}
//шары
for(let i=0;i<bl.length;i++){
bl[i].draw()
}

tablo.draw()
line.draw()

 //если забиты все шары выводим сообщение вы выиграли и перезагружаем страницу
if(score==15){
score=0
alert('ВЫ ВЫИГРАЛИ!!! жми ОК для перезагрузки')
    location.reload()
}

//движение шаров 
for(let i=0;i<bl.length;i++){
    bl[i].x+=bl[i].vx/power
    bl[i].y+=bl[i].vy/power

    bl[i].vx=bl[i].vx*0.99//трение
    bl[i].vy=bl[i].vy*0.99
}
//столкновение с бортами
for(let i=0;i<bl.length;i++){
    
        if(bl[i].x-r<=boards[3].x+boards[3].width){bl[i].vx=-bl[i].vx}
        if(bl[i].x+r>=boards[1].x){bl[i].vx=-bl[i].vx}
        if(bl[i].y-r<=boards[0].y+boards[0].height){bl[i].vy=-bl[i].vy}
        if(bl[i].y+r>=boards[2].y){bl[i].vy=-bl[i].vy}
}
//при попадании в лузу плюсуем счет и удаляем шар из массива
//если шар попал в лузу и при этом небыло столкновения с шаром возвращаем шар на исходные координаты
if(sss>0){
    for(let p=0;p<pockets.length;p++){
        for(let i=0;i<bl.length;i++){
            let goal=distPocket(pockets[p],bl[i])
            if(goal<=sumPocket){
                bl.splice(i,1)
                score++
                
            }
        }
    }
}else{
    for(let p=0;p<pockets.length;p++){
        for(let i=0;i<bl.length;i++){
            let goal=distPocket(pockets[p],bl[i])
            if(goal<=sumPocket){
                
                move=1
                
            }
        }
    }
}

//проверка столкновения шаров
for(let i=0;i<bl.length-1;i++){
                    
    for(let n=i+1;n<bl.length;n++){
        let ddd=dist(bl[i],bl[n])
        distance=ddd
        b=boom(distance,sum)
        
        //если шары слиплись отодвигаем их друг от друга
        if(b==true){
            if(bl[i].x<bl[n].x){
                bl[i].x=bl[i].x-0.5
            }
            if(bl[i].x>bl[n].x){
                bl[i].x=bl[i].x+0.5
            }
            if(bl[i].y<bl[n].y){
                bl[i].y=bl[i].y-0.5
            }
            if(bl[i].y>bl[n].y){
                bl[i].y=bl[i].y+0.5
            }

            if(bl[n].x<bl[i].x){
                bl[n].x=bl[n].x-0.5
            }
            if(bl[n].x>bl[i].x){
                bl[n].x=bl[n].x+0.5
            }
            if(bl[n].y<bl[i].y){
                bl[n].y=bl[n].y-0.5
            }
            if(bl[n].y>bl[i].y){
                bl[n].y=bl[n].y+0.5
            }
        }
        //если шары столкнулись задаем новое направление и воспроизводим звук
        if(b==true){
            
           play1()
           sss++ 
            let theta1 = bl[i].angle();
            let theta2 = bl[n].angle();
            let phi = Math.atan2(bl[n].y - bl[i].y, bl[n].x - bl[i].x);
            let m1 = bl[i].mass;
            let m2 = bl[n].mass;
            let v1 = bl[i].speed();
            let v2 = bl[n].speed();

            let dx1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.cos(phi) + v1*Math.sin(theta1-phi) * Math.cos(phi+Math.PI/2);
            let dy1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.sin(phi) + v1*Math.sin(theta1-phi) * Math.sin(phi+Math.PI/2);
            let dx2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.cos(phi) + v2*Math.sin(theta2-phi) * Math.cos(phi+Math.PI/2);
            let dy2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.sin(phi) + v2*Math.sin(theta2-phi) * Math.sin(phi+Math.PI/2);

            bl[i].vx = dx1F;                
            bl[i].vy = dy1F;                
            bl[n].vx = dx2F;                
            bl[n].vy = dy2F;
            
           
            
            
        }
       
    }
    //если шары имеют скорость больше чем 1 то запрещаем удары обнулив координаты (дожидаемся остановки шаров чтобы начать следующий ход)
    for(let i=0;i<bl.length;i++){
        if(bl[i].vx>1||bl[i].vx<-1||bl[i].vy<-1||bl[i].vy>1){
            line.x=0
            line.y=0
            line.x2=0
            line.y2=0
            mouseX=0
            mouseY=0    
            
        }
    }
    
    
    
    
}

requestAnimationFrame(draw)//loop
}

//управление мышкой
cvs.onmousedown=function(e){
    mouseX=e.clientX
    mouseY=e.clientY
    for(let i=0;i<bl.length;i++){
        if(mouseX>=bl[i].x-ball.radius&&mouseX<=bl[i].x+ball.radius&&mouseY<=bl[i].y+ball.radius&&mouseY>=bl[i].y-ball.radius){
            line.x=bl[i].x
        line.y=bl[i].y
            
        }
        
}}
cvs.onmousemove=function(e){
    mouseX2=e.clientX
    mouseY2=e.clientY
    line.x2=line.x-(mouseX2-line.x)
    line.y2=line.y-(mouseY2-line.y)
}

cvs.onmouseup=function(e){
    mouseX3=e.clientX
    mouseY3=e.clientY
    for(let i=0;i<bl.length;i++){
        
        if(mouseX>=bl[i].x-ball.radius&&mouseX<=bl[i].x+ball.radius&&mouseY<=bl[i].y+ball.radius&&mouseY>=bl[i].y-ball.radius){
            bl[i].vx=-(mouseX3-mouseX) //вектор скорости задается по разности коодинат отрезка направляющей line
            bl[i].vy=-(mouseY3-mouseY)
            
            
            step=i

            sss=0
            
        }
    }
    
    
    distance3=Math.sqrt(Math.pow(line.x2-line.x,2)+Math.pow(line.y2-line.y,2))
}
//управление сенсором
cvs.addEventListener("touchstart", function(e){
    
    mouseX=e.changedTouches[0].clientX
    mouseY=e.changedTouches[0].clientY
    for(let i=0;i<bl.length;i++){
        if(mouseX>=bl[i].x-ball.radius&&mouseX<=bl[i].x+ball.radius&&mouseY<=bl[i].y+ball.radius&&mouseY>=bl[i].y-ball.radius){
            line.x=bl[i].x
        line.y=bl[i].y
            
        }
        
    }
    
    
    
        cvs.addEventListener("touchmove",function(e){
    
    
            mouseX2=e.changedTouches[0].clientX
            mouseY2=e.changedTouches[0].clientY
            line.x2=line.x-(mouseX2-line.x)
            line.y2=line.y-(mouseY2-line.y)
        
        })
    
        cvs.addEventListener("touchend",function(e){
            mouseX3=e.changedTouches[0].clientX
            mouseY3=e.changedTouches[0].clientY
            for(let i=0;i<bl.length;i++){
                
                if(mouseX>=bl[i].x-ball.radius&&mouseX<=bl[i].x+ball.radius&&mouseY<=bl[i].y+ball.radius&&mouseY>=bl[i].y-ball.radius){
                    bl[i].vx=-(mouseX3-mouseX)
                    bl[i].vy=-(mouseY3-mouseY)
                    
                    
                    step=i

                    sss=0
                    
                }
            }
            
            
            distance3=Math.sqrt(Math.pow(line.x2-line.x,2)+Math.pow(line.y2-line.y,2))
    
        })
    
    })

    //отдельный интервал для проверки:если шар не столкнулся с другим шаром возвращаем на исходную позицию
    setInterval(
        function(){
            
            if(move==0){
                x=bl[step].x
                y=bl[step].y
            }
            if(move==1&&sss==0){
                bl[step].x=x
                bl[step].y=y
                bl[step].vx=0
                bl[step].vy=0
            }
            move=iii(step)
        }
    ,1)
    //функция старта
    function ggg(){
        draw()
        document.onclick=null
    }
    document.onclick=ggg
    
    