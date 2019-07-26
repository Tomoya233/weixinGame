cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    

    onPicked: function() {
        this.AudioPlayer.playPointSound();
        this.game.score += 20;
        this.node.destroy();
    },

    //碰撞函数
    onCollisionEnter: function (other, self) {
        if (other.node.groupIndex === 1) 
        { 
            this.onPicked();
        }
    },

    onLoad () {
        this.AudioPlayer = cc.find("Audio").getComponent("AudioManager");
    },

    start () {

    },

    update (dt) {
        //移动
        this.node.y -= dt * this.game.roll_speed;

        //超出边界清理
        if(this.node.y < -this.game.m_size.height)
        {
            this.node.destroy();
        }
    },
});
