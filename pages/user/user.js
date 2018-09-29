// pages/test2/test2.js
var http = require('../../libs/http.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    sex: ['男','女'],
    sexResult:'',
    mSex:'女'
  },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        var self = this
        wx.getUserInfo({
            success: res => {
                console.log(res)
                app.globalData.userInfo = res.userInfo
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            },
            fail: err => {
                console.log(err)
            }
        })
    // this.init()
    // wx.login({
    //     success: function (res) {
    //         if (res.code) {
    //         console.log(res.code)
    //             wx.getUserInfo({
    //                 success: res => {
    //                     console.log(res)
    //                     app.globalData.userInfo = res.userInfo
    //                     console.log(res)
    //                     this.setData({
    //                         userInfo: res.userInfo,
    //                         hasUserInfo: true
    //                     })
    //                 },
    //                 fail: err => {
    //                     console.log(err)
    //                 }
    //             })
    //         self.init()
    //         // code: 011gZwvf1L9McA0mYjxf14hyvf1gZwvm
    //           wx.request({
    //             url: http.roots +'saveOpenID',
    //             method:'POST',
    //             data:{
    //               code:res.code
    //             },
    //             header: {
    //               "Content-Type": "application/x-www-form-urlencoded"
    //             },
    //             success: function (res) {
    //               wx.setStorage({
    //                 key:'openid',
    //                 data: res.data.openid
    //               })
    //             }
    //           })
    //         }else{
    //             console.log('登录失败！' + res.errMsg)
    //         }
    //     },
    //     fail:function (err) {
    //         console.log("err")
    //     }
    // });
  },
  init:function(){
      console.log('haha')
        wx.getUserInfo({
            success: res => {
                console.log(res)
                app.globalData.userInfo = res.userInfo
                console.log(res)
                this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
                })
            },
            fail: err => {
                console.log(err)
            }
        })
        console.log(this.data.userInfo)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  handleFruitChange({ detail = {} }) {
    this.setData({
      mSex: detail.value
    });
    console.log(this.mSex)
  },
})