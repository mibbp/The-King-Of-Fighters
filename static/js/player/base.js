import { gameObject } from '/static/js/game_object/base.js';


class Player extends gameObject{
    constructor(root, info) {
        super();

        this.root = root;
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;

        this.direction = 1; //正方向朝右

        this.vx = 0;
        this.vy = 0;

        this.speedx = 400;  // 水平速度
        this.speedy = -1000;  // 跳起的初始速度

        this.gravity = 50;


        this.ctx = this.root.gamemap.ctx;

        this.pressKeys = this.root.gamemap.controller.pressKeys;

        this.status = 3;    // 0: idle, 1: 向前，2：向后，3：跳跃，4：攻击，5：被打，6：死亡

        this.animations = new Map();
        this.frame_current_cnt=0;

    }

    start() {

    }

    updateControl(){
        let w, a, d, space;
        if (this.id === 0) {
            w = this.pressKeys.has('w');
            a = this.pressKeys.has('a');
            d = this.pressKeys.has('d');
            space = this.pressKeys.has(' ');
        } else {
            w = this.pressKeys.has('ArrowUp');
            a = this.pressKeys.has('ArrowLeft');
            d = this.pressKeys.has('ArrowRight');
            space = this.pressKeys.has('Enter');
        }

        if (this.status === 0 || this.status === 1) {
            if (space) {
                this.status = 4;
                this.vx = 0;
                this.frame_current_cnt = 0;
            } else if (w) {
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = -this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = this.speedy;
                this.status = 3;
                // this.frame_current_cnt = 0;
            } else if (d) {
                this.vx = this.speedx;
                this.status = 1;
            } else if (a) {
                this.vx = -this.speedx;
                this.status = 1;
            } else {
                this.vx = 0;
                this.status = 0;
            }
        }

    }


    updateMove(){
        if(this.status===3)this.vy += this.gravity;
        
        this.x += this.vx*this.timeDelta/1000;
        this.y += this.vy*this.timeDelta/1000;

        if(this.y>450){
            this.y = 450;
            this.vy = 0;
            if(this.status===3) this.status = 0;
        }

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.root.gamemap.$canvas.width()) {
            this.x = this.root.gamemap.$canvas.width() - this.width;
        }

    }

    update(){
        this.updateMove();
        this.updateControl();

        this.render();
    }
    render(){
        let status = this.status;
        let obj =this.animations.get(status);
        if(obj&&obj.loaded){
            let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
            let image = obj.gif.frames[k].image;
            this.ctx.drawImage(image, this.x, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);
            
        }
        if(status === 4){
            if(parseInt(this.frame_current_cnt / obj.frame_rate) === obj.frame_cnt-1){
                this.status=0;
            }
        }
        this.frame_current_cnt++;
    }


}


export{
    Player
}