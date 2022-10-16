// pages/crowdsourcing/crowdsourcing.js
const app=getApp()
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
    const db=wx.cloud.database()
    var that=this
    that.loadModal()
    db.collection('crowdsourcing').orderBy('time', 'desc').where({state:0}).get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
        that.setData({
          queryresult:res.data
        })
        that.hideLoadModal()
      }
    })
  },
  
  onTapOrder:function(e){
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: './crowdsourcingDetail/crowdsourcingDetail',
    success: function (res) {// 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('edit', {
        dataset:e.currentTarget.dataset
      })
      }
    })
  },
  loadModal:function() {
    this.setData({
      loadModal: true
    })
    var that=this
    setTimeout(function() {
      if(that.data.loadModal==true){
        that.hideLoadModal()
      wx.showToast({
        title: '网络出错',
        icon:'error'
      })
      }
    }, 10000)
  },
  hideLoadModal:function(){
    this.setData({
      loadModal: false
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