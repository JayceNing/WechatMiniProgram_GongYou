// miniprogram/pages/me/register/register.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    nickname:'',
    phone:''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },

  // 用户名
  usernameInput: function(e) {
    this.setData({
      username: e.detail.value
    });
  },
  codeInput: function(e) {
    this.setData({
      code: e.detail.value
    });
  },
  codeInputAgain: function(e) {
    this.setData({
      codeAgain: e.detail.value
    });
  },
  // 昵称
  nicknameInput: function(e) {
    this.setData({
      nickname: e.detail.value
    });
  },
   // 电话号
   phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  submit:function(){ 
    var phonereg = /(\d{11})+$/;
    if (this.data.username === '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 2000,
        mask: true
      });
    }else if(this.data.code==null){
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }else if(this.data.code.length<6){
      wx.showToast({
        title: '密码长度需大于6位',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if(this.data.codeAgain==null){
      wx.showToast({
        title: '请再次输入密码',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }else if (this.data.code!=this.data.codeAgain) {
      wx.showToast({
        title: '密码输入不一致',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }else if(this.data.nickname===''){
      wx.showToast({
        title: '请输入昵称',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }else if(this.data.phone===''){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }else if (!phonereg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }else{
      this.register()
    }
  },
  register:function(){
    var that=this
    that.loadModal()
    console.log('注册表单已提交，正在查询')
    wx.cloud.callFunction({
      name: 'register',
      data: { 
        username:that.data.username,
        password:that.data.code,
        nickname:that.data.nickname,
        phone:that.data.phone
      },
      success: res => {
        console.log('[云函数] [register] : ', res.result)
        that.hideLoadModal()
        if(res.result.statusCode==201){
          wx.showToast({
            title: '注册成功',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 0,
            })
          }, 2000)
        }else if(res.result.statusCode==409){
          wx.showToast({
            title: '用户名已存在',
            icon: 'error',
            duration: 2000,
            mask: true
          })
        }else{
          wx.showToast({
            title: '网络出错',
            icon: 'error',
            duration: 2000,
            mask: true
          })
        }
      },
      fail: err => {
        console.error('[云函数] [register] 调用失败', err)
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