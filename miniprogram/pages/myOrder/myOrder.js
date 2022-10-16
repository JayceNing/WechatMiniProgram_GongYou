// pages/myOrder/myOrder.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0, 
    currentData2:0,
    identity:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.identity==1){
      this.setData({
        identity:1
      })
    }

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
          that.loadModal()
          db.collection('crowdsourcing').doc(e.currentTarget.dataset._id).remove({
            success: function(res) {
              console.log(res.data)
              that.hideLoadModal()
              that.onShow()
              wx.showToast({
                title: '删除成功',
              })
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  returnOrder:function(e){
    var that=this
    const db=wx.cloud.database()
    console.log(e.currentTarget.dataset._id)
    wx.showModal({
      title: '退还订单',
      content: '确定退还吗？退还后原订单变为待接受状态',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.loadModal()
      db.collection('crowdsourcing').doc(e.currentTarget.dataset._id).update({
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
        }
      })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  onTapOrder:function(e){
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '../crowdsourcing/crowdsourcingDetail/crowdsourcingDetail',
    success: function (res) {// 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('edit', {
        dataset:e.currentTarget.dataset
      })
      }
    })
  },
  bindchange: function(e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
    //点击切换，滑块index赋值
    checkCurrent: function(e) {
      const that = this;
  
      if (that.data.currentData === e.target.dataset.current) {
        return false;
      } else {
        that.setData ({
          currentData: e.target.dataset.current
        })
      }
    },
    checkCurrent2: function(e) {
      const that = this;
  
      if (that.data.currentData2 === e.target.dataset.current) {
        return false;
      } else {
        that.setData ({
          currentData2: e.target.dataset.current
        })
      }
    },
    changeMyIdentityTo0:function(){
      this.setData({
        identity:0
      })
    },
    changeMyIdentityTo1:function(){
      this.setData({
        identity:1
      })
    },
    toDefault:function(){
      wx.switchTab({
        url: '../Default/Default',
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
    // const db=wx.cloud.database()
    // var that=this
    // db.collection('crowdsourcing').where({
    //   _openid:app.globalData.openid,
    //   state:0
    // }).get({
    //   success: function(res) {
    //     // res.data 是包含以上定义的两条记录的数组
    //     console.log(res.data)
    //     that.setData({
    //       queryresult00:res.data
    //     })
    //   }
    // })
    this.queryList()
    this.queryList2()
  },
  async queryList() {
    var that = this;
  //由于需要同步获取数据，可能较慢，最好加入加载动画
    that.loadModal()
   //初始化云端环境
    const db = wx.cloud.database()
    //定义每次获取的条数
    const MAX_LIMIT = 20;
    //先取出集合的总数
    const countResult = await db.collection('crowdsourcing').where({
         _openid:app.globalData.openid,
       }).count()
    const total = countResult.total
    //计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // 承载所有读操作的 promise 的数组
    const arraypro = []
   //初次循环获取云端数据库的分次数的promise数组
    for (let i = 0; i < batchTimes; i++) {
      const promise = await db.collection('crowdsourcing').orderBy('time', 'desc').where({
        _openid:app.globalData.openid,
      }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
     //二次循环根据获取的promise数组的数据长度获取全部数据push到arraypro数组中
      for (let j = 0; j < promise.data.length;j++){
        arraypro.push(promise.data[j])
      }
    }
    // console.log(arraypro)
    //把数据传递至页面视图
    const queryresult00=[]
    const queryresult01=[]
    const queryresult02=[]
    arraypro.forEach((element, index, array) => {
      if(element.state==0){
        queryresult00.push(element)
      }else if(element.state==1){
        queryresult01.push(element)
      }else if(element.state==2){
        queryresult02.push(element)
      }
    })
    that.setData({
      queryresult00: queryresult00,
      queryresult01:queryresult01,
      queryresult02:queryresult02
    })
    that.hideLoadModal()
  },
  async queryList2() {
    var that = this;
  //由于需要同步获取数据，可能较慢，最好加入加载动画
    that.loadModal()
   //初始化云端环境
    const db = wx.cloud.database()
    //定义每次获取的条数
    const MAX_LIMIT = 20;
    //先取出集合的总数
    const countResult = await db.collection('crowdsourcing').where({
        taskRecipientOpenid:app.globalData.openid,
       }).count()
    const total = countResult.total
    //计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // 承载所有读操作的 promise 的数组
    const arraypro = []
   //初次循环获取云端数据库的分次数的promise数组
    for (let i = 0; i < batchTimes; i++) {
      const promise = await db.collection('crowdsourcing').orderBy('time', 'desc').where({
        taskRecipientOpenid:app.globalData.openid,
      }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
     //二次循环根据获取的promise数组的数据长度获取全部数据push到arraypro数组中
      for (let j = 0; j < promise.data.length;j++){
        arraypro.push(promise.data[j])
      }
    }
    // console.log(arraypro)
    //把数据传递至页面视图
    const queryresult10=[]
    const queryresult11=[]
    arraypro.forEach((element, index, array) => {
      if(element.state==1){
        queryresult10.push(element)
      }else if(element.state==2){
        queryresult11.push(element)
      }
    })
    that.setData({
      queryresult10: queryresult10,
      queryresult11:queryresult11
    })
    that.hideLoadModal()
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