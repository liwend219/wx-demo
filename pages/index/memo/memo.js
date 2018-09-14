// pages/index/memo/memo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    content: '',
    date: '',
    endDate:''
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
    this.setData({
      date: d.getFullYear() + '-' + m + '-' + d.getDate(),
      endDate: d.getFullYear() + '-' + m + '-' + d.getDate()
    })
    
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
      date: e.detail.value
    })
  },
  saveMemo:function(){
    // localStorage.
  }
})