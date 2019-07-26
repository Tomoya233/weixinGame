cc.Class({
  extends: cc.Component,

  properties: {
    bg1: {
      default: null,
      type: cc.Node
    },

    bg2: {
      default: null,
      type: cc.Node
    },

    player: {
      default: null,
      type: cc.Node
    },

    obstaclesPrefab: {
      default: null,
      type: cc.Prefab
    },

    coinPrefab: {
      default: null,
      type: cc.Prefab
    },

    scoreDisplay: {
      default: null,
      type: cc.Label
    },

    jumpButton: {
      default: null,
      type: cc.Button
    },

    flashButton: {
      default: null,
      type: cc.Button
    },

    roll_speed: 300,

    mScoreTime: 10,

    is_enbale: true
  },

  onLoad: function () {
    this.AudioPlayer = cc.find('Audio').getComponent('AudioManager')

    this.cur_bg = this.bg1
    this.m_size = this.bg1.getContentSize()
    this.m_player = this.player.getComponent('Player')
    this.bg2.y += this.m_size.height
    this.makeobj = 0
    this.makeobjCd = 50
    this.scoretime = 0
    this.score = 0
    this.flashCd = 0
    this.flashtime = 0

    this.jumpButton.node.on('touchend', this.jump.bind(this))
    this.flashButton.node.on('touchend', this.flash.bind(this))
  },

  // onDestroy () {    },

  start: function () {
    if (this.is_enbale === true) {
      var manager = cc.director.getCollisionManager() // 获取碰撞管理器
      manager.enabled = true // 开启碰撞
      // manager.enabledDebugDraw = true; // 允许绘制碰撞的区域
    }
  },

  gameOver: function () {
    cc.eventManager.removeAllListeners()// 移除所有事件监听
    this.player.stopAllActions() // 停止player节点的跳跃动作
    cc.director.loadScene('Over')// 切换场景到结束场景
  },

  jump: function () {
    this.m_player.jump()
  },

  flash: function () {
    if (this.flashCd === 0) {
      this.roll_speed = 5000
      this.flashtime = 10
      this.AudioPlayer.playRushSound()
      this.m_player.untouchCd = 40
      this.m_player.untouch = true
      this.flashCd = 1000
    }
  },

  spawNewCoin: function (pos, rl) {
    // 使用给定的模板在场景中生成一个新节点
    var newCoin = cc.instantiate(this.coinPrefab)
    // 将新增的节点添加到 Canvas 节点下面
    this.node.addChild(newCoin)
    // 设置位置
    newCoin.setPosition(pos)
    const a = newCoin.getComponents('Coin')
    for (var obj of a) { obj.game = this }
  },

  // 生成障碍物
  spawNewObstacles: function (pos, rl) {
    // 使用给定的模板在场景中生成一个新节点
    var newObstacles = cc.instantiate(this.obstaclesPrefab)
    // 将新增的节点添加到 Canvas 节点下面
    this.node.addChild(newObstacles)
    // 设置位置
    newObstacles.setPosition(pos)
    const a = newObstacles.getComponents('Obstacles')
    for (var obj of a) { obj.game = this }
  },

  // 制作障碍物
  makeObject: function (time) {
    const randomNumber = Math.random()
    if (randomNumber > 0.8) {
      this.spawNewObstacles(cc.v2(-300, this.m_size.height), 1)
    } else if (randomNumber < 0.2) {
      this.spawNewObstacles(cc.v2(300, this.m_size.height), 2)
    } else if (randomNumber < 0.35) {
      this.spawNewCoin(cc.v2(300, this.m_size.height), 2)
    } else if (randomNumber > 0.65) {
      this.spawNewCoin(cc.v2(-300, this.m_size.height), 1)
    }
  },

  // 按时间加分数
  gainScore: function () {
    this.score += 1
    this.scoreDisplay.string = 'Score: ' + this.score
    cc.sys.localStorage.setItem('ScoreDis', this.scoreDisplay.string)
  },

  // 背景滚动
  backgroundChange: function (time) {
    var s = time * this.roll_speed
    this.bg1.y -= s
    this.bg2.y -= s
    if (this.cur_bg.y <= -this.m_size.height) { // 地图切换
      if (this.cur_bg === this.bg2) {
        this.bg2.y = this.bg1.y + this.m_size.height
        this.cur_bg = this.bg1
      } else {
        this.bg1.y = this.bg2.y + this.m_size.height
        this.cur_bg = this.bg2
      }
    }
  },

  speedChange: function () {
    if (this.score > 700) {
      this.roll_speed = 1000
      this.m_player.jumpDuration = 0.12
      this.m_player.mActTime = 12
      this.makeobjCd = 15
      this.mScoreTime = 2
    } else if (this.score > 500) {
      this.roll_speed = 700
      this.m_player.jumpDuration = 0.15
      this.m_player.mActTime = 15
      this.makeobjCd = 23
      this.mScoreTime = 4
    } else if (this.score > 300) {
      this.roll_speed = 600
      this.m_player.jumpDuration = 0.18
      this.m_player.mActTime = 18
      this.makeobjCd = 25
      this.mScoreTime = 6
    } else if (this.score > 150) {
      this.roll_speed = 500
      this.m_player.jumpDuration = 0.2
      this.m_player.mActTime = 20
      this.makeobjCd = 30
      this.mScoreTime = 8
    } else if (this.score > 75) {
      this.roll_speed = 400
      this.m_player.jumpDuration = 0.27
      this.m_player.mActTime = 27
      this.makeobjCd = 37
      this.mScoreTime = 9
    } else {
      this.roll_speed = 300
      this.m_player.jumpDuration = 0.3
      this.m_player.mActTime = 30
    }
  },

  flashUpdate: function () {
    if (this.flashCd > 0) {
      this.flashButton.getComponent(cc.Button).interactable = false
      this.flashCd--
    } else {
      this.flashButton.getComponent(cc.Button).interactable = true
    }
    if (this.m_player.untouchCd > 0) { this.m_player.untouchCd-- } else { this.m_player.untouch = false }
  },

  // called every frame
  update: function (dt) {
    this.backgroundChange(dt)
    if (this.flashtime <= 0) { this.speedChange() } else { this.flashtime-- }

    if (this.makeobj % this.makeobjCd === 0) { this.makeObject(dt) }
    if (this.scoretime % this.mScoreTime === 0) { this.gainScore() }

    this.makeobj++
    this.scoretime++

    this.flashUpdate()
  }

})
