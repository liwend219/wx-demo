
const { $Toast } = require('../../../dist/base/index');
var http = require('../../../libs/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'测试标题',
    content: '',
    date: '',
    endDate:'',
    openid:'',
    info:{
      title: '测试标题',
      content: '',
      date: '',
      openid: '',
      _id:'',
      types:0,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var d = new Date();
    let m;
    if (d.getMonth() < 10) {
      m = '0' + (d.getMonth() + 1)
    }
    if (options.data){
      this.setData({
        info: JSON.parse(options.data)
      })
    }else{
      this.setData({
        ["info.date"]: d.getFullYear() + '-' + m + '-' + d.getDate(),
        endDate: d.getFullYear() + '-' + m + '-' + d.getDate()
      })
      var self = this
      wx.getStorage({
        key: 'openid',
        success: function (result) {
          self.data.info.openid = result.data
        }
      })
    }
    this.setData({
      endDate: d.getFullYear() + '-' + m + '-' + d.getDate()
    })
    console.log(this.data.info)
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
  
  bindDateChange: function (e) {
    this.setData({
      ["info.date"]: e.detail.value
    })
  },
  saveDiary:function(){
    if(this.data.info.title == ""){
      $Toast({
        content: '标题不可为空',
        type: 'warning'
      });
      return 
    }else if(this.data.info.content == ""){
      $Toast({
        content: '内容不可为空',
        type: 'warning'
      });
      return 
    }
    console.log(this.data.info.openid)
    wx.request({
      url: http.roots + 'saveDiary',
      method: 'POST',
      data: this.data.info,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        console.log(res)
        if(res.data.sta == 1){
          $Toast({
            content: res.data.msg,
            type: 'success'
          });
          //返回上一层并刷新
          setTimeout(()=> {
            var pages = getCurrentPages();
            if (pages.length > 1) {
              var prePage = pages[pages.length - 2];
              prePage.onLoad()
              wx.navigateBack({
                delta: 1
              })
            } 
          },1000)
        }else{
          $Toast({
            content: res.data.msg,
            type: 'warning'
          });
        }
      }
    })
  },
  titleChange:function(e){
    this.setData({
      ["info.title"]: e.detail.detail.value
    })
  },
  contentChange:function(e){
    this.setData({
      ["info.content"]: e.detail.value
    })
  }
})