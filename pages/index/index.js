//index.js
const { $Toast } = require('../../dist/base/index');
//获取应用实例
const app = getApp()
var http = require('../../libs/http.js')
Page({
  data: {
    deleteItem:'',
    openid:'',
    diaryArr:[],
    current: 'tab1',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showBox:false,
    actions: [
      {
        name: '取消'
      },
      {
        name: '删除',
        color: '#ed3f14',
        loading: false
      }
    ],
    memoArr: [{
        id: 1,
        name: '香蕉',
        complete:false
    },{
        id: 2,
        name: '苹果',
        complete: false
    },{
        id: 3,
        name: '西瓜',
        complete: true
    },{
        id: 4,
        name: '葡萄',
        complete: false
    }],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  totest:function (){
    wx.navigateTo({
      url: '../test/test'
    })
  },
  newDiary:function(){
    wx.navigateTo({
      url: './diary/diary'
    })
  },
  onLoad: function () {
    console.log(this.route)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var self = this
    wx.getStorage({
      key: 'openid',
      success: function (result) {
        self.data.openid = result.data
        wx.request({
          url: http.roots + 'getDiary',
          method: 'POST',
          data: {
            openid: self.data.openid
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
              console.log(res)
            self.setData({
              diaryArr: res.data.data[0]
            })
          }
        })
      }
    })
    console.log(this.data.diaryArr)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  handleChange({ detail }) {
      console.log(detail)
    this.setData({
      current: detail.key
    });
  },

  modify:function(e){
    wx.navigateTo({
      url: './diary/diary?data=' + JSON.stringify(e.currentTarget.dataset.item)
    })
  },
  deletes:function(e){
      let t = e.currentTarget.dataset.item
      t.openid = this.data.diaryArr.openid
    this.setData({
        deleteItem: t,
        showBox : true
    })
    console.log(e.currentTarget.dataset.item)
  },
  confimDelete: function ({ detail }){
    console.log(detail)
    if (detail.index === 0) {
      this.setData({
        showBox: false
      });
    } else {
      const action = [...this.data.actions];
      action[1].loading = true;

      this.setData({
        actions: action
      });
      var self = this
        wx.request({
            url: http.roots + 'deleteDiary',
            method: 'POST',
            data: this.data.deleteItem,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
                if(res.data.sta == 1){
                    action[1].loading = false;
                    getCurrentPages()[getCurrentPages().length - 1].onLoad()
                    self.setData({
                        showBox: false,
                        actions: action
                    })
                    $Toast({
                        content: res.data.msg,
                        type: 'success'
                    });
                }else{
                    action[1].loading = false;
                    getCurrentPages()[getCurrentPages().length - 1].onLoad()
                    self.setData({
                        showBox: false,
                        actions: action
                    })
                    $Toast({
                        content: res.data.msg,
                        type: 'warning'
                    });
                }
            }
        })
    }
  },
  share:function(){
      wx.getShareInfo()
  },
    onShareAppMessage: function (ops) {
        if (ops.from === 'button') {
            // 来自页面内转发按钮
            console.log(ops.target)
        }
        return {
            title: 'xx小程序',
            path: 'pages/index/index',
            success: function (res) {
                // 转发成功
                console.log("转发成功:" + JSON.stringify(res));
            },
            fail: function (res) {
                // 转发失败
                console.log("转发失败:" + JSON.stringify(res));
            }
        }
    },
    changeMemo: function (e){
        
        let idx = e.currentTarget.dataset.idx - 1
        let item = 'memoArr[' + idx + '].complete';
        this.setData({
            [item]: !this.data.memoArr[idx].complete,
        })
    }
})
