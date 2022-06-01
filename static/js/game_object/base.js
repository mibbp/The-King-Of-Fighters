let gameObjects = [];

class gameObject{
    constructor(){
        gameObjects.push(this);
        this.timeDelta = 0;
        this.hasCallStart = false;

    }
    start(){//初始执行一次

    }
    update(){//每一帧执行一次除了第一次 

    }
    destory(){//删除当前对象
        for(let i=0;i<gameObjects.length;i++){
            if(gameObjects[i]===this){
                gameObjects.splice(i,1);
                break;
            }
        }
    }

}


let lastTimeStamp;

let gameObjectFrame = (timeStamp) => {
    for(let obj of gameObjects){
        if(!obj.hasCallStart){
            obj.start();
            obj.hasCallStart=true;
        }
        else{
            obj.timeDelta=timeStamp-lastTimeStamp;
            obj.update();
        }
    }
    lastTimeStamp=timeStamp;
    requestAnimationFrame(gameObjectFrame);
}


requestAnimationFrame(gameObjectFrame);

export{
    gameObject
}

