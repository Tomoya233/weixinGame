cc.Class({
  extends: cc.Component,

  properties: {
  },

  onCollisionEnter: function (other, self) {
    if (other.node.groupIndex === 1) { // 表示是PLAYER类型撞到了，道具拾取成功
      this.node.removeFromParent()// 消失
      this.AudioPlayer.playBoomSound()
      if (this.game.m_player.untouch === false) { this.game.gameOver() }
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    this.AudioPlayer = cc.find('Audio').getComponent('AudioManager')
  },

  start () {

  },

  update (dt) {
    // 移动
    this.node.y -= dt * this.game.roll_speed

    // 超出边界清理
    if (this.node.y < -this.game.m_size.height) {
      this.node.destroy()
    }
  }

})
