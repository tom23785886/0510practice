// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var newMoney;
cc.Class({
    extends: cc.Component,

    properties: {
        // this property quotes the Prefab resource of stars
        moneyPrefab: {
            default: null,
            type: cc.Prefab
        },
        //the random scale of disappearing time for stars
        maxMoneyDuration: 0,
        minMoneyDuration: 0,
        //ground node for confirming the height of the generated star's position
        ground: {
            default: null,
            type: cc.Node
        },
        //player node for obtaining the jump height of the main character and controlling the movement switch of the main character
        player: {
            default: null,
            type: cc.Node
        },
        //reference of score label
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        }
    },


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad: function() {
        //obtain the anchor point of ground level on the y axis
        this.groundY = this.ground.y + this.ground.height / 2; //this.ground.top may also work
        //initialize timer
        this.timer = 0;
        this.moneyDuration = 0;
        //generate new money 
        this.spawnNewMoney();
        //initialize scoring
        this.score = 0;
    },
    spawnNewMoney: function() {
        //generate a new node in the scene with a preset template
        newMoney = cc.instantiate(this.moneyPrefab);
        //put the newly added node under the Canvas node
        newMoney.getComponent('Money').game = this;
        this.node.addChild(newMoney);
        //set up a random position for the money
        newMoney.setPosition(this.getNewMoneyPosition());
        newMoney.getComponent("Money").game = this;
        this.moneyDuration = this.minMoneyDuration + Math.random() * (this.maxMoneyDuration - this.minMoneyDuration);
        this.timer = 0;
    },

    getNewMoneyPosition: function() {
        var randX = 0;
        //According to the position of the ground level and the main character's jump height, randomly obtain an anchor point
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        //according to the width of the screen, randomly obtain an anchor of money on the x axis
        var maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        //return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    update: function(dt) {
        //update timer for each frame, when a new star is not generated after exceeding duration
        //invoke this logic of game failure
        if (this.timer > this.moneyDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },

    /*start() {

    },*/

    // update (dt) {},
    gainScore: function() {
        this.score += 1;
        //update the words of the scoreDisplay Label
        this.scoreDisplay.string = 'Score: ' + this.score;
        //play the scoring sound effect
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function() {
        this.player.stopAllActions(); //stop the jumping action of the player node
        //cc.game.restart();
        //newMoney.destroy();
        console.log("gameover");
        cc.director.loadScene("GreatGame");
        //cc.director.loadScene("GreatGame", onSceneLaunched);
    },
});