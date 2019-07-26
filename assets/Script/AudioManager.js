cc.Class({
  extends: cc.Component,

  properties: {
    bgMusic: {
      url: cc.AudioClip,
      default: null
    },

    jumpAudio: {
      default: null,
      type: cc.AudioClip
    },

    pointAudio: {
      default: null,
      type: cc.AudioClip
    },

    rushAudio: {
      default: null,
      type: cc.AudioClip
    },

    boomAudio: {
      default: null,
      type: cc.AudioClip
    },

    songButton: {
      default: null,
      type: cc.Button
    },

    voiceOn: {
      default: null,
      type: cc.SpriteFrame
    },

    voiceOff: {
      default: null,
      type: cc.SpriteFrame
    }

  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    cc.loader.downloader.loadSubpackage('Music', function (err) {
      if (err) {
        return console.error(err)
      }
      console.log('load subpackage successfully.')
    })
    this.voice = true
    cc.game.addPersistRootNode(this.node)
    this.songButton.node.on('touchend', this.songChange.bind(this))
  },

  songChange: function () {
    if (this.voice === true) {
      this.voice = false
      this.stopBgMusic()
      this.songButton.node.getComponent(cc.Button).normalSprite = this.voiceOff
    } else {
      this.voice = true
      cc.audioEngine.resume(this.bgMusicChannel)
      this.songButton.node.getComponent(cc.Button).normalSprite = this.voiceOn
    }
  },

  playBgMusic () {
    this.bgMusicChannel = cc.audioEngine.playMusic(this.bgMusic, true, 0.5)
  },

  stopBgMusic () {
    cc.audioEngine.pause(this.bgMusicChannel)
  },

  playPointSound: function () {
    // 调用声音引擎播放声音
    if (this.voice === true) { cc.audioEngine.playEffect(this.pointAudio, false) }
  },

  playRushSound: function () {
    // 调用声音引擎播放声音
    if (this.voice === true) { cc.audioEngine.playEffect(this.rushAudio, false) }
  },

  playBoomSound: function () {
    // 调用声音引擎播放声音
    if (this.voice === true) { cc.audioEngine.playEffect(this.boomAudio, false) }
  },

  playJumpSound: function () {
    // 调用声音引擎播放声音
    if (this.voice === true) { cc.audioEngine.playEffect(this.jumpAudio, false) }
  },

  start () {

  }

  // update (dt) {},
})
