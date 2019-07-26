cc.Class({
    extends: cc.Component,

    properties: {
        backButton:{
            default: null,
            type: cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.AudioPlayer = cc.find("Audio").getComponent("AudioManager");
        this.backButton.node.on('touchend', this.back.bind(this));
    },

    back: function(){
        cc.director.loadScene('Menu');
    },

    start () {

    },

    // update (dt) {},
});
