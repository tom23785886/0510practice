// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //When the distance between the star and main character is less than this value, collection of the point will be considered
        pickRadius: 0,
    },

    getPlayerDistance: function() {
        //judge the distance according to the position of the player node
        var playerPos = this.game.player.getPosition();
        //calculate the distance between two nodes according to their positions
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    onPicked: function() {
        //When the money is being collected, invoke the interface in the Game script to generate a new money
        this.game.spawnNewMoney();
        //invoke the scoring method of the Game script
        this.game.gainScore();
        //then destroy the current money's node
        this.node.destroy();
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
    update: function(dt) {
        //judge if the distance between the star and main character is less than the collecting distance for each frame
        if (this.getPlayerDistance() < this.pickRadius) {
            //invoke collecting behavior
            this.onPicked();
            return;
        }
        //update the transparency of the star according to the timer in the Game script
        var opacityRatio = 1 - this.game.timer / this.game.moneyDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
        console.log(this.node.opacity);
    },
});