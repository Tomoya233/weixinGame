cc.Class({
  extends: cc.Component,

  properties: {
    jumpHeight: 0,

    position: 1,

    jumpDuration: 0,

    mActTime: 30

  },

  setJumpAction: function () {
    var jumpUp
    var jumpDown
    if (this.position === 1) {
      // 跳跃上升
      jumpUp = cc.moveBy(this.jumpDuration, cc.v2(300, this.jumpHeight)).easing(cc.easeQuadraticActionOut())
      // 下落
      jumpDown = cc.moveBy(this.jumpDuration, cc.v2(300, -this.jumpHeight)).easing(cc.easeQuadraticActionIn())
      // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法
      this.position = 2
    } else if (this.position === 2) {
      // 跳跃上升
      jumpUp = cc.moveBy(this.jumpDuration, cc.v2(-300, this.jumpHeight)).easing(cc.easeQuadraticActionOut())
      // 下落
      jumpDown = cc.moveBy(this.jumpDuration, cc.v2(-300, -this.jumpHeight)).easing(cc.easeQuadraticActionIn())
      // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法
      this.position = 1
    }
    return cc.sequence(jumpUp, jumpDown)
  },

  jump: function () {
    if (this.actTime === 0) {
      this.AudioPlayer.playJumpSound()
      this.node.runAction(this.setJumpAction())
      this.actTime = this.mActTime
      this.node.scaleY = -this.node.scaleY
      // this.trans = 0;
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    this.AudioPlayer = cc.find('Audio').getComponent('AudioManager')

    this.actTime = 0
    // this.jumpAction = this.setJumpAction();
    // this.node.runAction(this.jumpAction);
    this.node.scaleY = -this.node.scaleY
    this.untouch = false
    this.untouchCd = 0
  },

  // onDestroy () {},

  start () {

  },

  update (dt) {
    if (this.actTime > 0) {
      this.actTime--
    }
  }
})
