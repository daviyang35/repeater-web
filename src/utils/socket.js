import { message } from 'antd'

let Socket;
(function () {
  const $ = function () { }
  const eventPolling = {} // 事件池, 根据 id 注册注销监听
  let objInstance = null // 单例自定义对象, 在销毁前有且仅有唯一一个
  let socketInstance = null // 单例
  // let sendMessageStack = null // 发送的消息栈，当 readyState === CONNECTING || readyState === CLOSING 时入栈，等待 OPEN 后发送
  let waitSendMessage = null // 等待发送的消息，只留存一条
  let timer = null
  const timespan = 500 // checkState 状态监测的周期
  const waitNum = (10 * 1000) / timespan // 等待的次数 => 等待秒数/监测周期
  let num = 0 // 计数器
  const shade = $('body')

  function createConnection (url, isSecret = false) {
    const protocol = isSecret ? 'wss' : 'ws'
    // IE10+, FireFox7+
    try {
      socketInstance = new WebSocket(`${protocol}://${url}`)
    } catch (e) {
      console.log(e)
    }
  }

  function getMessage (evt) {
    console.log(evt)
    console.log(typeof evt.data)
    if (typeof evt.data === 'string') {
      // {id: 0000, success: true, data: {exitCode:1}}
      const data = JSON.parse(evt.data)

      // for (let event in eventPolling) { // 发广播
      //     eventPolling[event].onMessage && eventPolling[event].onMessage(data)
      // }

      // 错误消息，丢弃
      // {id: 0000, success: true, message: ''}
      if (!data.success) {
        alertError(data.message, function () {
          objInstance.destroy(3333)
        })
        return
      }

      if (data.success && data.data) {
        console.log('收到双工消息', data)
        const code = data.data.exitCode
        const id = data.id
        removeShade()
        if (code === 0) {
          // 精准点播
          eventPolling[id] && eventPolling[id].onMessage && eventPolling[id].onMessage(data)
        } else if (code === 1) {
          alertError('进程异常退出')
        } else if (code === 2) {
          alertError('文件上传失败，请重试')
        } else if (code === 11) {
          alertError('进程被占用，请勿重复操作')
        } else if (code === 12) {
          // pm和产品让取消提示
          // alertError('操作被用户关闭')
        }
      }
    }
  }

  function getError (evt) {
    // for (let event in eventPolling) { // 发广播
    //     eventPolling[event].onMessage && eventPolling[event].onError(evt)
    // }

    // 错误
    console.log(evt, this)
  }

  function registerListener (listener) {
    eventPolling[listener.id] = listener
  }

  function registerEvent () {
    socketInstance.onopen = function socketOpen (e) {
      console.log('socket open', e)
    }

    socketInstance.onclose = function socketClose (e) {
      console.log('socket close', e, e.code, e.reason, e.wasClean)
      if (e.code === 3333) {
        // 自定义错误关闭，已打印错误消息并开始关闭连接
        return
      }
      if (e.code !== 1000) {
        // 非正常关闭
        objInstance && objInstance.destroy()
        alertError(`code: ${e.code} 服务发生错误，请重试或联系客服！`)
      }
    }
    /**
     {
       "id": "", // 请求 ID
       "success": true, // 执⾏结果，为 true 时 具体响应在 data 中
       "message": "", // 执⾏失败时的错误描述
       "data": {}
     }
     */
    socketInstance.addEventListener('message', getMessage)
    socketInstance.addEventListener('error', getError)
  }

  function registerOffEvent () {
    socketInstance && socketInstance.removeEventListener('message', getMessage)
    socketInstance && socketInstance.removeEventListener('error', getError)
  }

  function clearTimer () {
    if (timer) {
      clearInterval(timer)
      timer = null
      num = 0
    }
  }

  function alertError (msg, callback) {
    message.error(msg, 2, callback)
  }

  function checkState () {
    const that = this
    if (!timer) {
      timer = setInterval(function () {
        num++
        console.log(
          '触发状态监测',
          num,
          socketInstance.readyState === WebSocket.OPEN
        )
        if (socketInstance.readyState === WebSocket.OPEN) {
          clearTimer()
          waitSendMessage && that.sendMsg(waitSendMessage)
          waitSendMessage = null
        }
        if (num === waitNum) {
          // 长时间无法open,
          clearTimer()
          alertError('长时间未打开连接，请重试或联系客服！', function () {
            that.destroy()
          })
        }
      }, timespan)
    }
  }

  // function retry(socket) {
  //   if (timer) {
  //     clearTimer();
  //   }
  //   createConnection(socket.url, socket.isSecret);
  // }

  function showShade (msg) {
    console.log(shade, msg)
    // if ($('.ax-no-shade').length) {
    //   $('.ax-no-shade').html(`<span>${msg}</span>`);
    // } else {
    //   shade.append(`<div class="ax-no-shade"><span>${msg}</span></div>`);
    // }
  }

  function removeShade () {
    // shade.find('.ax-no-shade').remove();
  }

  /**
   * 重复实例化(wsUrl相同)只会添加监听者
   * url既可以写在config, 也可以写在第二个参数
   */
  Socket = function (config, wsUrl = '127.0.0.1:51005/ws') {
    const _config = Object.assign(
      {
        onMessage: null,
        onError: null,
        id: 0, // 注册事件池的id
        url: wsUrl,
        isSecret: false, // 是否加密
        elem: null, // 注册的代理DOM元素，可精细化控制，暂时不用
      },
      config
    )

    registerListener(_config)

    // CONNECTING == 0, OPEN == 1, CLOSING == 2, CLOSED == 3
    if (!!socketInstance && socketInstance.readyState < 2) {
      return objInstance
    }

    this.config = _config

    createConnection(this.config.url, this.config.isSecret)
    registerEvent.call(this)
    this.instance = socketInstance
    objInstance = this
  }

  Socket.prototype.getInstance = function () {
    return this.instance
  }

  /**
   *
   * @param {Objecy} msg
   * msg: {
   *  id: '',  自定义Id， enumer.js -> EnumSocketId
   *  method: '',  sign|capture|(readCard|getUID)|print
   *  param: {
   *      uid: '',  学员Id
   *      url: '',
   *      token: '',
   *      data: '',
   *  }
   * }
   */
  Socket.prototype.sendMsg = function (msg) {
    console.log('发送消息:', msg, socketInstance)
    console.log(
      '当前状态:',
      this.instance.readyState,
      this.instance.readyState === WebSocket.OPEN
    )
    const that = this
    if (this.instance.readyState === WebSocket.OPEN) {
      // 可发送消息时， 启用遮罩
      showShade(msg.business)
      // sendMessageStack = msg
      this.instance.send(JSON.stringify(msg))
    } else if (this.instance.readyState === WebSocket.CONNECTING) {
      showShade('等待连接服务')
      // 保存到消息栈， 可以重试
      waitSendMessage = msg
      checkState.call(this)
    }
      // else if (this.instance.readyState === WebSocket.CLOSING) {
      //     console.log('socket closing')
    // }
    else {
      // 消息扔掉，重启连接
      console.log('当前状态：', this.instance.readyState)
      alertError('连接已开始断开或已经断开，请重试或联系客服！', function () {
        that.destroy()
      })
    }
  }

  // 注销监听
  Socket.prototype.off = function (id) {
    if (id) {
      eventPolling[id] = null
      delete eventPolling[id]
      return
    }
    for (const key in eventPolling) {
      eventPolling[key] = null
      delete eventPolling[key]
    }
  }

  // 销毁
  Socket.prototype.destroy = function (code = 1000) {
    clearTimer() //清理定时器
    this.off() // 注销监听
    registerOffEvent() // 释放事件
    this.instance && this.instance.close(code) // code 默认 1000 , 可自定义
    socketInstance = null
    objInstance = null
    removeShade() // 移除遮罩
  }
})()

const SocketCon = (config) => {
  return new Socket(config)
}

export default SocketCon
