// pages/Pickup/boxDetail/boxDetail.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ScreenHeight80Percent:app.globalData.WindowHeight*0.75,
    ScreenHeight90Percent:app.globalData.WindowHeight*0.84,
    packageList:[
      {
        id:'7891369825864',
        sender:'宁欣宇',
        receiver:'王洁'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },
  scanQRCode:function(){
    var that=this
    wx.scanCode({
      onlyFromCamera: true,
      success: (scres) => {
        that.data.setInter=setInterval(
          function () {
            that.data.packageList.push(
              {
                id:'4316939825864',
                sender:'姜洪烨',
                receiver:'黄之睿'
              }
            )
            that.setData({
              packageList:that.data.packageList
            })
            wx.showToast({
              title: '添加成功',
            })
            clearInterval(that.data.setInter)
          }
    , 1000);   
        console.log('扫码结果',scres)
      
      }
    })
  },
  toTaskCreate:function(){
    wx.navigateTo({
      url: '../../Default/taskCreate/taskCreate',
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