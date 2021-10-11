// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var spriteFrame1_1;
var cnt1_1;
var isJumping;
var rightdir;
cc.Class({
    extends: cc.Component,

    properties: {
        //main character's jump height
        jumpHeight: 0,
        //main character's jump duration
        jumpDuration: 0,
        //maximal movement speed
        maxMoveSpeed: 0,
        //acceleration
        accel: 0,
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },

    },


    onKeyDown(event) {
        //set a flag when key pressed
        switch (event.keyCode) {

            case cc.macro.KEY.a:
                this.accLeft = true;
                rightdir = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                rightdir = true;
                break;
            case cc.macro.KEY.k:
                //initialize jump action
                isJumping = true;
                this.jumpAction = this.setJumpAction();
                this.node.runAction(this.jumpAction);
                break;
            case cc.macro.KEY.w:
                //initialize jump action
                isJumping = true;
                this.jumpAction = this.setJumpAction();
                this.node.runAction(this.jumpAction);
                break;
        }
    },

    onKeyUp(event) {
        //unset a flag when key released
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                this.xSpeed = 0;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                this.xSpeed = 0;
                break;
            case cc.macro.KEY.k:
            case cc.macro.KEY.w:
                window.setTimeout(function() {
                    isJumping = false;
                }, 500);
                break;

        }
    },

    setJumpAction: function() {
        //jump up
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        //jump down
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        //repeat
        //return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
        var callback = cc.callFunc(this.playJumpSound, this);
        return cc.sequence(callback, jumpUp, jumpDown);
    },
    playJumpSound: function() {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad: function() {
        //Acceleration direction switch
        this.accLeft = false;
        this.accRight = false;
        //The main character's current horizontal velocity
        this.xSpeed = 0;

        //Initialize the keyboard input listening
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        var self = this;
        cnt1_1 = 0;
        isJumping = false;
        rightdir = true;
    },

    onDestroy() {
        //Cancel keyboard input monitering
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    start() {

    },

    // update (dt) {},
    update: function(dt) {
        //update speed of each frame according to the current acceleration direction
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
            var self = this;
            if (!isJumping) {

                if (cnt1_1 % 12 == 0 || cnt1_1 % 12 == 1 || cnt1_1 % 12 == 2 || cnt1_1 % 12 == 3) {
                    cc.loader.loadRes("trump1-3_left", cc.SpriteFrame, function(err, spriteFrame) {
                        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                } else if (cnt1_1 % 12 == 4 || cnt1_1 % 12 == 5 || cnt1_1 % 12 == 6 || cnt1_1 % 12 == 7) {
                    cc.loader.loadRes("trump1-1_left", cc.SpriteFrame, function(err, spriteFrame) {
                        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                } else if (cnt1_1 % 12 == 8 || cnt1_1 % 12 == 9 || cnt1_1 % 12 == 10 || cnt1_1 % 12 == 11) {
                    cc.loader.loadRes("trump1-2_left", cc.SpriteFrame, function(err, spriteFrame) {
                        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                }
                cnt1_1++;
            } else {
                cc.loader.loadRes("trump2-2_left", cc.SpriteFrame, function(err, spriteFrame) {
                    self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
            }

        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
            var self = this;
            if (!isJumping) {
                if (cnt1_1 % 12 == 0 || cnt1_1 % 12 == 1 || cnt1_1 % 12 == 2 || cnt1_1 % 12 == 3) {
                    cc.loader.loadRes("trump1-3", cc.SpriteFrame, function(err, spriteFrame) {
                        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                } else if (cnt1_1 % 12 == 4 || cnt1_1 % 12 == 5 || cnt1_1 % 12 == 6 || cnt1_1 % 12 == 7) {
                    cc.loader.loadRes("trump1-1", cc.SpriteFrame, function(err, spriteFrame) {
                        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                } else if (cnt1_1 % 12 == 8 || cnt1_1 % 12 == 9 || cnt1_1 % 12 == 10 || cnt1_1 % 12 == 11) {
                    cc.loader.loadRes("trump1-2", cc.SpriteFrame, function(err, spriteFrame) {
                        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                }
                cnt1_1++;
            } else {
                cc.loader.loadRes("trump2-2", cc.SpriteFrame, function(err, spriteFrame) {
                    self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
            }


        } else {
            var self = this;
            if (isJumping) {
                if (rightdir) {
                    cc.loader.loadRes("trump2-2", cc.SpriteFrame, function(err, spriteFrame) {
                        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                } else {
                    cc.loader.loadRes("trump2-2_left", cc.SpriteFrame, function(err, spriteFrame) {
                        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                }

            } else {
                if (rightdir) {
                    cc.loader.loadRes("trump1-3", cc.SpriteFrame, function(err, spriteFrame) {
                        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                } else {
                    cc.loader.loadRes("trump1-3_left", cc.SpriteFrame, function(err, spriteFrame) {
                        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                }

            }
        }
        //restrict the movement speed of the main character to the maximum movement speed
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            //if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        //update the position of the main character according to the current speed
        var borderFlag = (this.node.x + this.xSpeed * dt > 438 || this.node.x + this.xSpeed * dt < -433);
        if (!borderFlag) this.node.x += this.xSpeed * dt;
    },
});