// pages/User/userInfo/userInfo.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    this.setData({
      userinfo:app.globalData.userinfo
    })
    //that.loadModal()
    // wx.cloud.callFunction({
    //   name: 'getUserInfo',
    //   data: { 
    //     token:app.globalData.token
    //   },
    //   success: res => {
    //     console.log('[云函数] [getUserInfo] : ', res.result)
    //     that.hideLoadModal()
    //     that.setData({
    //       username:res.result.username,
    //       nickname:res.result.nickname,
    //       phone:res.result.phone
    //     })
    //   },
    //   fail: err => {
    //     console.error('[云函数] [getUserInfo] 调用失败', err)
    //   }
    // })

  },
  userrealnameInput: function(e) {
    this.setData({
      //userrealname:e.detail.value,
      'userinfochange.userrealname': e.detail.value
    });
  },
  phoneInput: function(e) {
    this.setData({
      //phone:e.detail.value,
      'userinfochange.phone': e.detail.value
    });
  },
  changeUserInfo:function(){
    this.setData({
      state:1
    })
  },
  submit:function(){
    const db=wx.cloud.database()
    var that=this
    var phonereg = /(\d{11})+$/;
    if (this.data.userinfochange.userrealname === '') {
      wx.showToast({
        title: '请输入真实姓名',
        icon: 'none',
        duration: 2000,
        mask: true
      });
    }else if(this.data.userinfochange.phone===''){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }else if (!phonereg.test(this.data.userinfochange.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }else{

      this.loadModal()
      if(app.globalData.userinfo){
        db.collection('user_info').where({_openid:app.globalData.openid}).update({
          // data 传入需要局部更新的数据
          data: {
            userinfo:this.data.userinfochange
          },
          success: function(res) {
            console.log(res.data)
            that.hideLoadModal()
            wx.showToast({
              title: '修改成功',
            })
            that.setData({
              state:0
            })
            app.globalData.userinfo=that.data.userinfochange
              that.setData({
                userinfo:that.data.userinfochange
              })
  
          }
        })
      }else{
        db.collection('user_info').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            userinfo:this.data.userinfochange
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
            that.hideLoadModal()
            wx.showToast({
              title: '修改成功',
            })
            that.setData({
              state:0
            })
            app.globalData.userinfo=that.data.userinfochange
            that.setData({
              userinfo:that.data.userinfochange
            })
          }
        })
      }
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