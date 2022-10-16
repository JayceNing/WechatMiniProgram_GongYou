// pages/List/List.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.setData({mid: options.mid})
    if (that.data.mid == 0) {
      that.setData({list: app.globalData.recList})
      wx.setNavigationBarTitle({title: '收件列表'})
    } else {
      that.setData({list: app.globalData.picList})
      wx.setNavigationBarTitle({title: '派件列表'})
    }
  },

  toDetail: function(e) {
    const that = this
    let id = e.currentTarget.dataset['index'];
    wx.navigateTo ({
      url: '/pages/Detail/Detail?mid=' + that.data.mid + '&id=' + id
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

  }
})