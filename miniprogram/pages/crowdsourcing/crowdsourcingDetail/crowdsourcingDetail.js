// pages/crowdsourcing/crowdsourcingDetail/crowdsourcingDetail.js
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
    var that = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('edit', function (data) {
    //console.log(data.dataset)
    that.setData(
      data.dataset
    )
    });
    that.setData({
      globalDataOpenid:app.globalData.openid
    })
  },
  deleteOrder:function(e){
    var that=this
    const db=wx.cloud.database()
    console.log(e.currentTarget.dataset._id)
    wx.showModal({
      title: '删除订单',
      content: '确定删除吗？删除后不可恢复哦',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //that.loadModal()
          db.collection('crowdsourcing').doc(that.data._id).remove({
            success: function(res) {
              console.log(res.data)
              //that.hideLoadModal()
              
              wx.showToast({
                title: '删除成功',
              })
              wx.navigateBack({
                delta: 0,
              })
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  returnOrder:function(){
    var that=this
    const db=wx.cloud.database()
    wx.showModal({
      title: '退还订单',
      content: '确定退还吗？退还后原订单变为待接受状态',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.loadModal()
      db.collection('crowdsourcing').doc(that.data._id).update({
        // data 传入需要局部更新的数据
        data: {
          state: 0,
          taskRecipientOpenid:'',
          taskRecipientUserInfoPhone:'',
          taskRecipientUserInfoName:'',
          taskReceivedTime:''
        },
        success: function(res) {
          console.log('退还成功',res)
          that.hideLoadModal()
          that.onShow()
          wx.showToast({
            title: '退还成功',
          })
          wx.navigateBack({
            delta: 0,
          })
        }
      })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  taskAccept:function(){
    var that=this
    var myDate = new Date();
    var time =myDate.getFullYear()+'年'+(myDate.getMonth()+1)+'月'+myDate.getDate()+'日'+myDate.getHours()+'时'+myDate.getMinutes()+'分'
    console.log(time)
    console.log(app.globalData.userinfo)
    const db=wx.cloud.database()
    if(that.data._openid==app.globalData.openid){
      wx.showToast({
        title: '不能接受自己的订单',
        icon:'error'
      })
    }else{
      that.loadModal()
      db.collection('crowdsourcing').doc(that.data._id).update({
        // data 传入需要局部更新的数据
        data: {
          state: 1,
          taskRecipientOpenid:app.globalData.openid,
          taskRecipientUserInfoPhone:app.globalData.userinfo.phone,
          taskRecipientUserInfoName:app.globalData.userinfo.userrealname,
          taskReceivedTime:time
        },
        success: function(res) {
          console.log('更新成功',res)
          that.hideLoadModal()
          wx.showToast({
            title: '接单成功',
          })
          wx.navigateTo({
            url: '../../myOrder/myOrder?identity=1',
          })
        }
      })

    }

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