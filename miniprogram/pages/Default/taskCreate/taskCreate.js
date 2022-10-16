// pages/Default/taskCreate/taskCreate.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str:'预计送达时间:',
    time: '12:01',
    changeArriveTime:0,
    index: null,
    picker: ['5公斤以下', '5~10公斤', '10~20公斤','20公斤以上'],
    index1: null,
    picker1: ['发件人现金支付', '收件人现金支付', '微信支付'],
    tip:0,
    description:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myDate = new Date();
    if(options.task==0)
    {
      this.setData({
        descriptionCategory:'送货'
      })
    }else{
      this.setData({
        descriptionCategory:'取件'
      })
    }
    this.setData({
      task:options.task,
      time:myDate.getHours()+1+':'+myDate.getMinutes()
    })
  },
  submit:function(){
    var that=this
    that.loadModal()
    console.log('需求表单已提交，正在查询')
    console.log(parseInt(that.data.tip))
    var timstr=''
    if(this.data.changeArriveTime==0)
    {
      timstr='即刻出发'
    }else{
      timstr=that.data.time
    }
    
    wx.cloud.callFunction({
      name: 'taskCreate',
      data: { 
        senderUsername:app.globalData.username,
        pickupLocation:that.data.sourceAddress+' '+that.data.sourceName+'（'+that.data.sourceSex+'） '+that.data.sourcePhone,
        deliveryLocation:that.data.destinAddress+' '+that.data.destinName+'（'+that.data.destinSex+'） '+that.data.destinPhone,
        description:'【'+that.data.descriptionCategory+'】'+'【'+timstr+'】'+that.data.description,
        //eta:that.data.time,
        weight:that.data.index,
        payMethod:that.data.index1,
        price:parseInt(that.data.tip)

      },
      success: res => {
        console.log('[云函数] [taskCreate] : ', res.result)
        that.hideLoadModal()
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2]; //获取到上一页面
        prevPage.onLoad();
        wx.navigateBack({
          delta: 0,
        })
      },
      fail: err => {
        console.error('[云函数] [taskCreate] 调用失败', err)
      }
    })
    
  },

  descriptionInput: function(e) {
    this.setData({
      description: e.detail.value
    });
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

  TimeChange(e) {
    this.setData({
      time: e.detail.value,
      changeArriveTime:1,
      str:''
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },  
  PickerChange1(e) {
    console.log(e);
    this.setData({
      index1: e.detail.value
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  sliderchange:function(e){
    console.log(e)
    this.setData({
      tip:e.detail.value
    })
  },
  toAddressDetail:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../addressDetail/addressDetail?task='+e.currentTarget.dataset.id,
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