import { gameMap } from "./game_map/base.js";
import { Player } from "./player/base.js";
import { Kyo } from "./player/kyo.js";
class KOF{
    constructor(id){
        this.$kof = $('#'+id);
        this.gamemap = new gameMap(this);
        this.Players = [
            new Kyo(this,{
                id:0,
                x:200,
                y:0,
                width:120,
                height:200,
                color:'blue',

            }),
            new Kyo(this,{
                id:1,
                x:900,
                y:0,
                width:120,
                height:200,
                color:'red',  

            }),
            
        ];
        console.log(this.gamemap.ctx);
    }
    
    

}

export{
    KOF

}