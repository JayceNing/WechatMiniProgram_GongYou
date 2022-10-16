// pages/task/taskDetail/taskDetail.js
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
    this.setData({
      id:options.id,
      createdAt:options.createdAt,
      deliveryLocation:options.deliveryLocation,
      description:options.description,
      payMethod:options.payMethod,
      pickupLocation:options.pickupLocation,
      senderUsername:options.senderUsername,
      senderNickname:options.senderNickname,
      senderPhone:options.senderPhone,
      price:options.price,
      weight:options.weight,
      receiverUsername:options.receiverUsername
    })

  },
  taskAccept:function(){
    var that=this
    if(app.globalData.username===null){
      wx.showToast({
        title: '请先登陆账号',
        icon:'error'
      })
    }else if(app.globalData.username==this.data.senderUsername){
      wx.showToast({
        title: '不能接受自己发布的任务',
        icon:'none'
      })
    }else{
      this.loadModal()
      wx.cloud.callFunction({
        name: 'getOnePackage',
        data: { 
          id:that.data.id
        },
        success: res => {
          console.log('[云函数] [getOnePackage] : ', res.result)
          wx.cloud.callFunction({
            name: 'taskAccept',
            data: { 
              id:that.data.id,
              senderUsername:res.result.sender.username,
              pickupLocation:res.result.pickupLocation,
              deliveryLocation:res.result.deliveryLocation,
              description:res.result.description,
              //eta:that.data.time,
              weight:res.result.weight,
              payMethod:res.result.payMethod,
              price:res.result.price,
              receiverUsername:app.globalData.username
            },
            success: res => {
              console.log('[云函数] [taskAccept] : ', res.result)
              that.hideLoadModal()
              wx.showToast({
                title: '接受成功',
              })
              let pages = getCurrentPages();
              let prevPage = pages[pages.length - 2]; //获取到上一页面
              prevPage.onLoad();
              wx.navigateBack({
                delta: 0,
              })
            },
            fail: err => {
              console.error('[云函数] [taskAccept] 调用失败', err)
            }
          })
         
        },
        fail: err => {
          console.error('[云函数] [getOnePackage] 调用失败', err)
        }
      })
    }

  },
  contactSender:function(){
    wx.showToast({
      title: '请拨打备注中的电话',
      icon:'none'
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