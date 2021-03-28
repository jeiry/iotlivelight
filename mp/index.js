const app = getApp()
import {
  $wuxNotification
} from '../../miniprogram_npm/wux-weapp/index'
var mqtt = require('../../utils/mqtt.min.js') //根据自己存放的路径修改
var client = null;
Page({
  data: {
  },
  onLoad: function (options) {
    this.connectMqtt()
  },
  onUnload: function (options) {
    client.end()
  },
  connectMqtt: function () {
    const options = {
      connectTimeout: 4000, // 超时时间
      clientId: '123212',
      port: 8083, 
      username: 'xxx',
      password: 'xxx',
    }

    client = mqtt.connect('wx://t.yoyolife.fun/mqtt', options)
    client.on('reconnect', (error) => {
      console.log('正在重连:', error)
    })

    client.on('error', (error) => {
      console.log('连接失败:', error)
    })

    let that = this;
    client.on('connect', (e) => {
      console.log('成功连接服务器')
      //订阅一个主题
      client.subscribe('/home/r/croomlight', {
        qos: 0
      }, function (err) {
        if (!err) {
          // client.publish('message.queue', 'Hello MQTT')
          console.log("订阅成功")
        }
      })
    })
    client.on('message', function (topic, message) {
        console.log('received msg:' + message.toString());
        }.bind(this))

    },
    click(e){
      console.log(e.target.id)
      if(e.target.id == 1){
        client.publish('/home/r/croomlight', 'cama1')
      }else if(e.target.id == 2){
        client.publish('/home/r/croomlight', 'cama3')
      }else if(e.target.id == 3){
        client.publish('/home/r/croomlight', 'cama2')
      }else if(e.target.id == 4){
        client.publish('/home/r/croomlight', 'cama4')
      }
    }
})
