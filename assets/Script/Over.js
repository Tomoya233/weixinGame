cc.Class({
    extends: cc.Component,

    properties: {
        againButton:{
            default: null,
            type: cc.Button
        },
        exitButton:{
            default: null,
            type: cc.Button
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:


    onLoad () {
        this.AudioPlayer = cc.find("Audio").getComponent("AudioManager");
        this.disScore();
        this.againButton.node.on('touchend', this.startGame.bind(this));
        this.exitButton.node.on('touchend', this.endGame.bind(this));
    },

    disScore: function () {
        this.score =  cc.sys.localStorage.getItem("ScoreDis");//读取本地存储的积分
       // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = this.score.toString();//显示
    },

    startGame: function () {
        //调用系统方法加载Game场景
        cc.director.loadScene('Game');
    },

    endGame: function(){
        //cc.director.end();
        cc.game.end();
    },

    start () {

    },

    // update (dt) {},
});
