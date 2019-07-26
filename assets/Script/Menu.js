cc.Class({
  extends: cc.Component,

  properties: {
    startButton: {
      default: null,
      type: cc.Button
    },
    helpButton: {
      default: null,
      type: cc.Button
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    this.AudioPlayer = cc.find('Audio').getComponent('AudioManager')
    this.startButton.node.on('touchend', this.startGame.bind(this))
    this.helpButton.node.on('touchend', this.help.bind(this))
    this.AudioPlayer.playBgMusic()
  },

  startGame: function () {
    // 调用系统方法加载Game场景
    cc.director.loadScene('Game')
  },

  help: function () {
    cc.director.loadScene('Help')
  },

  start () {

  }

  // update (dt) {},
})
