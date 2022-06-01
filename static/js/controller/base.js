export class Controller {
    constructor($canvas){
        this.$canvas=$canvas;

        this.pressKeys = new Set();
        this.start(); 
    }
    start(){
        let outer = this;
        this.$canvas.keydown(function(e){
            outer.pressKeys.add(e.key);
            
        });
        this.$canvas.keyup(function(e){
            outer.pressKeys.delete(e.key);
            
        });

    }
}
// export{
//     Controller
// }