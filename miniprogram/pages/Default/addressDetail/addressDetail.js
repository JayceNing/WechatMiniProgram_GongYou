// pages/Default/addressDetail/addressDetail.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['北京市', '北京市', '海淀区'],
    addressDetail:'',
    name:'',
    phone:'',
    sex:'先生',
    mapHeight:350,
    currentData: 0, 
    selectPerson: true,
    setting: { // 使用setting配置，方便统一还原
			rotate: 0,
			skew: 0,
			enableRotate: false,
    },
    location: {
			latitude: 39.930063,
			longitude: 119.569736,
    },
    scale: 16,
		isOverLooking: false,
		is3D: true,
		isShowScale: false,
		isShowCompass: false,
		minScale: 3,
    maxScale: 20,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db=wx.cloud.database()
    var that=this
    db.collection('address_save').where({
      _openid: app.globalData.openid
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log('常用地址',res.data)
        that.setData({
          queryresult:res.data
        })
      }
    })
    this.setData({
      task:options.task
    })
    this.tapGetLocation()

  },
  onTapAddressSave:function(e){
    console.log(e.currentTarget.dataset)
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2]; //获取到上一页面
    if(this.data.task==0){
      prevPage.setData({
        sourceAddress:e.currentTarget.dataset.chooseaddress,
        sourceAddressDetail:e.currentTarget.dataset.addressdetail,
        sourceName:e.currentTarget.dataset.name,
        sourceSex:e.currentTarget.dataset.sex,
        sourcePhone:e.currentTarget.dataset.phone,
        'markers[1]':{
          id: 1,
          latitude:e.currentTarget.dataset.chooseaddress.latitude,
          longitude: e.currentTarget.dataset.chooseaddress.longitude,
          iconPath: "/images/location.png",
          width: 40,
          height: 40,
        }
      })
    }else{
      prevPage.setData({
        destinAddress:e.currentTarget.dataset.chooseaddress,
        destinAddressDetail:e.currentTarget.dataset.addressdetail,
        destinName:e.currentTarget.dataset.name,
        destinSex:e.currentTarget.dataset.sex,
        destinPhone:e.currentTarget.dataset.phone,
        'markers[2]':{
          id: 2,
          latitude:e.currentTarget.dataset.chooseaddress.latitude,
          longitude: e.currentTarget.dataset.chooseaddress.longitude,
          iconPath: "/images/location.png",
          width: 40,
          height: 40,
        }
      })
    }
    wx.navigateBack({
      delta: 0,
    })

  },
  chooseAddress:function(){
    var that=this
    wx.chooseLocation({
      latitude: that.data.latitude,
      longitude:that.data.longitude,
      success(res){
        console.log('chooseLocation',res)
        that.setData({
          'location.latitude':res.latitude,
          'location.longitude':res.longitude,
          chooseAddress:{
            name:res.name,
            address:res.address,
            latitude:res.latitude,
            longitude:res.longitude
          },
          'markers[1]':{
            id: 1,
            latitude:res.latitude,
            longitude: res.longitude,
            iconPath: "/images/location.png",
            width: 40,
            height: 40,
          }

        })
      }
    })
  },
  tapGetLocation:function(){
    var that=this
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy:true,
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(res)
        that.setData({
          'location.latitude':latitude,
          'location.longitude':longitude,
          'markers[0]':{
            id: 0,
            latitude:latitude,
            longitude: longitude,
            iconPath: "/images/dot.png",
            width: 40,
            height: 40,
          }
        })
      }
     })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  addressDetailInput:function(e){
    this.setData({
      addressDetail:e.detail.value
    })
  },
  nameInput:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  sexChange:function(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({
      sex:e.currentTarget.dataset.id
    })
  },
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  submit:function(){ 
    var that=this
    var phonereg = /(\d{11})+$/;
    if (this.data.chooseAddress === '') {
      wx.showToast({
        title: '请选择地址',
        icon: 'none',
        duration: 2000,
        mask: true
      });
    }else if (this.data.addressDetail === '') {
      wx.showToast({
        title: '请输入地址备注',
        icon: 'none',
        duration: 2000,
        mask: true
      });
    }else if(this.data.name===''){
      wx.showToast({
        title: '请输入联系人姓名',
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
      const db=wx.cloud.database()
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2]; //获取到上一页面
      db.collection('address_save').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          chooseAddress:that.data.chooseAddress,
          addressDetail:that.data.addressDetail,
          name:that.data.name,
          sex:that.data.sex,
          phone:that.data.phone
        },
        success: function(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        }
      })
      if(this.data.task==0){
        prevPage.setData({
          sourceAddress:this.data.chooseAddress,
          sourceAddressDetail:this.data.addressDetail,
          sourceName:this.data.name,
          sourceSex:this.data.sex,
          sourcePhone:this.data.phone,
          'markers[1]':{
            id: 1,
            latitude:this.data.chooseAddress.latitude,
            longitude: this.data.chooseAddress.longitude,
            iconPath: "/images/location.png",
            width: 40,
            height: 40,
          }
        })
      }else{
        prevPage.setData({
          destinAddress:this.data.chooseAddress,
          destinAddressDetail:this.data.addressDetail,
          destinName:this.data.name,
          destinSex:this.data.sex,
          destinPhone:this.data.phone,
          'markers[2]':{
            id: 2,
            latitude:this.data.chooseAddress.latitude,
            longitude: this.data.chooseAddress.longitude,
            iconPath: "/images/location.png",
            width: 40,
            height: 40,
          }
        })
      }
      wx.navigateBack({
        delta: 0,
      })
    }
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