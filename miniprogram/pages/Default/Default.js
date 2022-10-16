// pages/Default/Default.js
const app = getApp()
var hourArray=['现在']
Page({
  /**
   * 页面的初始数据
   */
  data: {
    identity:0,
    mapHeight:350,
    currentData: 0, 
    type:0,
    iCase:0,
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
    markers: [{
      id: 0,
      latitude:'',
      longitude:'',
      iconPath: "/images/center.png",
      width: 40,
      height: 40,
    },
    {
      id: 1,
      latitude:'',
      longitude:'',
      iconPath: "/images/center.png",
      width: 40,
      height: 40,
    },
    {
      id: 2,
      latitude:'',
      longitude:'',
      iconPath: "/images/center.png",
      width: 40,
      height: 40,
    },
    ],
    multiArray: [
      ['今日'],
      ['现在', '14点', '15点', '16点', '17点'],
    ],
    multiIndex: [0, 0],

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const db=wx.cloud.database()
    var that=this
    var myDate = new Date()
    var hour=myDate.getHours();
    var h=8
    
    while(h<=20){
      if(h>hour){
        hourArray.push(h+'点')
      }
      h++
    }
    var tomorrow= new Date()
    tomorrow.setTime(myDate.getTime()+24*60*60*1000)
    var dayAfterTomorrow= new Date()
    dayAfterTomorrow.setTime(tomorrow.getTime()+24*60*60*1000)
    this.setData({
      'multiArray[0][1]':tomorrow.getDate()+'日',
      'multiArray[0][2]':dayAfterTomorrow.getDate()+'日',
      'multiArray[1]':hourArray
    })
    if(!app.globalData.openid){
      this.onGetOpenid()
    }else{
      this.setData({
        openid:app.globalData.openid
      })
      that.queryDatabase()
    }
    
    //this.onPullDownRefresh()
    // wx.getStorage({
    //   key: 'token',
    //   success (res) {
    //     console.log("公邮账号token",res.data)
    //     var token=res.data
        
    //     wx.cloud.callFunction({
    //       name: 'getUserInfo',
    //       data: { 
    //         token:res.data
    //       },
    //       success: res => {
    //         console.log('[云函数] [getUserInfo] : ', res.result)
    //         if(res.result.username!=null)
    //         {
    //           app.globalData.username=res.result.username
    //           app.globalData.token=token
    //           that.onPullDownRefresh()
    //         }
            
    //       },
    //       fail: err => {
    //         console.error('[云函数] [getUserInfo] 调用失败', err)
    //       }
    //     })
    //   }
       

    // })
    // this.setData({
    //   username:app.globalData.username,
    //   recList: app.globalData.recList,
    //   picList: app.globalData.picList
    // })
    this.tapGetLocation()
    app.globalData.defaultGetLocation=true
    that.data.setInter = setInterval(
      function () {
          if(app.globalData.defaultGetLocation){
            that.autoGetLocation()
            console.log('获取当前位置')
          }else{
            //that.getPoints()
            //console.log('获取点位置')
          }
      }
, 30000);   

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
  queryDatabase:function(){
    const db=wx.cloud.database()
    var that=this
    db.collection('crowdsourcing').orderBy('time', 'desc').limit(1).where({
      _openid:app.globalData.openid,
    }).get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log('数据库查询我发布的',res.data)
        that.setData({
          queryresult0:res.data
        })
      }
    })
    db.collection('crowdsourcing').orderBy('time', 'desc').limit(1).where({
      taskRecipientOpenid:app.globalData.openid,
    }).get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log('数据库查询我接受的',res.data)
        that.setData({
          queryresult1:res.data
        })
      }
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  MultiColumnChange(e) {
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1]=hourArray
            break;
          case 1:
            data.multiArray[1] = ['8点', '9点', '10点','11点', '12点', '13点','14点', '15点', '16点','17点', '18点', '19点', '20点'];
            break;
          case 2:
            data.multiArray[1] = ['8点', '9点', '10点','11点', '12点', '13点','14点', '15点', '16点','17点', '18点', '19点', '20点'];
            break;
        }
        //data.multiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },
  autoGetLocation:function(){
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
  onGetOpenid: function() {
    // 调用云函数
    const db=wx.cloud.database()
    var that=this
    that.loadModal()
    wx.cloud.callFunction({
      name: 'wxLogin',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result)
        that.setData({
          openid:res.result.openid
        })
        that.hideLoadModal()
        app.globalData.openid = res.result.openid
        that.queryDatabase()
        db.collection('user_info').where({_openid:res.result.openid}).get({
          success: function(res) {
            // res.data 包含该记录的数据
            console.log(res)
            app.globalData.userinfo=res.data[0].userinfo
            that.setData({
              userinfo:res.data[0].userinfo
            })
          }
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  chooseSourceAddressShunFengCar:function(){
    var that=this
    wx.chooseLocation({
      latitude: 0,
      success:res=>{
        console.log(res)
        this.setData({
          shunFengCarSourceAddress:res
        })

      }
    })
  },
  chooseDestinAddressShunFengCar:function(){
    wx.chooseLocation({
      latitude: 0,
      success:res=>{
        console.log(res)
        this.setData({
          shunFengCarDestinAddress:res
        })
      }
    })
  },
  chooseAddress:function(){
    var that=this
    wx.navigateTo({
      url: './addressDetail/addressDetail?task=0',
    })
    // wx.chooseLocation({
    //   latitude: that.data.latitude,
    //   longitude:that.data.longitude,
    //   success(res){
    //     console.log('chooseLocation',res)
    //     that.setData({
    //       sourceAddress:res.name,
    //       sourceDetail:{
    //         name:res.name,
    //         address:res.address,
    //         latitude:res.latitude,
    //         longitude:res.longitude
    //       },
    //       'markers[1]':{
    //         id: 1,
    //         latitude:res.latitude,
    //         longitude: res.longitude,
    //         iconPath: "/images/location.png",
    //         width: 40,
    //         height: 40,
    //       }

    //     })
    //   }
    // })
  },
  chooseDestinAddress:function(){
    var that=this
    wx.navigateTo({
      url: './addressDetail/addressDetail?task=1',
    })
    // wx.chooseLocation({
    //   latitude: that.data.latitude,
    //   longitude:that.data.longitude,
    //   success(res){
    //     console.log('chooseLocation',res)
    //     that.setData({
    //       destinAddress:res.name,
    //       destinDetail:{
    //         name:res.name,
    //         address:res.address,
    //         latitude:res.latitude,
    //         longitude:res.longitude
    //       },
    //       'markers[2]':{
    //         id: 2,
    //         latitude:res.latitude,
    //         longitude: res.longitude,
    //         iconPath: "/images/location.png",
    //         width: 40,
    //         height: 40,
    //       }
    //     })
    //   }
    // })
  },
  freightDemandSubmit:function(){
    console.log('点击需求发布')
    var that=this
    const db=wx.cloud.database()
    if (this.data.sourceAddress == null) {
      wx.showToast({
        title: '请选择取货地',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }else if(this.data.destinAddress == null){
      wx.showToast({
        title: '请选择收货地',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }else{
      if(this.data.multiIndex[0]==0&&this.data.multiIndex[1]==0){
        console.log('立即用车')
        var myDate = new Date()
        var y=myDate.getFullYear()
        var m=((myDate.getMonth()+1)>=10)?(myDate.getMonth()+1):(0+''+(myDate.getMonth()+1))
        var d=(myDate.getDate()>=10)?myDate.getDate():(0+''+myDate.getDate())
        var h=((this.data.multiIndex[1]+myDate.getHours())>=10)?(this.data.multiIndex[1]+myDate.getHours()):(0+''+(this.data.multiIndex[1]+myDate.getHours()))
        var mm=(myDate.getMinutes()>=10)?myDate.getMinutes():(0+''+myDate.getMinutes())
        console.log(y+''+m+''+d+''+h+''+mm)
        var time=y+''+m+''+d+''+h+''+mm
        db.collection('crowdsourcing').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            userinfo:that.data.userinfo,
            sourceAddress:that.data.sourceAddress,
            sourceAddressDetail:that.data.sourceAddressDetail,
            sourceName:that.data.sourceName,
            sourceSex:that.data.sourceSex,
            sourcePhone:that.data.sourcePhone,
            destinAddress:that.data.destinAddress,
            destinAddressDetail:that.data.destinAddressDetail,
            destinName:that.data.destinName,
            destinSex:that.data.destinSex,
            destinPhone:that.data.destinPhone,
            iCase:that.data.iCase,
            type:that.data.type,
            y:y,
            m:m,
            d:d,
            h:h,
            mm:mm,
            time:time,
            state:0,
            taskRecipientOpenid:'',
            taskRecipientUserInfoPhone:'',
            taskRecipientUserInfoName:'',
            taskReceivedTime:'',
            taskFinishTime:''
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
            wx.navigateTo({
              url: '../myOrder/myOrder',
            })
            wx.showToast({
              title: '发布成功',
            })
          }
        })

      }else{
        var myDate = new Date()
        var tomorrow= new Date()
        tomorrow.setTime(myDate.getTime()+24*60*60*1000)
        var dayAfterTomorrow= new Date()
        dayAfterTomorrow.setTime(tomorrow.getTime()+24*60*60*1000)
        if(this.data.multiIndex[0]==0){
          var y=myDate.getFullYear()
          var m=((myDate.getMonth()+1)>=10)?(myDate.getMonth()+1):(0+''+(myDate.getMonth()+1))
          var d=(myDate.getDate()>=10)?myDate.getDate():(0+''+myDate.getDate())
          var h=((this.data.multiIndex[1]+myDate.getHours())>=10)?(this.data.multiIndex[1]+myDate.getHours()):(0+''+(this.data.multiIndex[1]+myDate.getHours()))
          var mm='00'
          console.log(y+''+m+''+d+''+h+''+mm)
          var time=y+''+m+''+d+''+h+''+mm
        db.collection('crowdsourcing').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            userinfo:that.data.userinfo,
            sourceAddress:that.data.sourceAddress,
            sourceAddressDetail:that.data.sourceAddressDetail,
            sourceName:that.data.sourceName,
            sourceSex:that.data.sourceSex,
            sourcePhone:that.data.sourcePhone,
            destinAddress:that.data.destinAddress,
            destinAddressDetail:that.data.destinAddressDetail,
            destinName:that.data.destinName,
            destinSex:that.data.destinSex,
            destinPhone:that.data.destinPhone,
            iCase:that.data.iCase,
            type:that.data.type,
            y:y,
            m:m,
            d:d,
            h:h,
            mm:mm,
            time:time,
            state:0,
            taskRecipientOpenid:'',
            taskRecipientUserInfoPhone:'',
            taskRecipientUserInfoName:'',
            taskReceivedTime:'',
            taskFinishTime:''
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
            wx.navigateTo({
              url: '../myOrder/myOrder',
            })
            wx.showToast({
              title: '发布成功',
            })
          }
        })
        }else if(this.data.multiIndex[0]==1){
          var y=tomorrow.getFullYear()
          var m=((tomorrow.getMonth()+1)>=10)?(tomorrow.getMonth()+1):(0+''+(tomorrow.getMonth()+1))
          var d=(tomorrow.getDate()>=10)?tomorrow.getDate():(0+''+tomorrow.getDate())
          var h=((this.data.multiIndex[1]+8)>=10)?(this.data.multiIndex[1]+8):(0+''+(this.data.multiIndex[1]+8))
          var mm='00'
          console.log(y+''+m+''+d+''+h+''+mm)
          var time=y+''+m+''+d+''+h+''+mm
        db.collection('crowdsourcing').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            userinfo:that.data.userinfo,
            sourceAddress:that.data.sourceAddress,
            sourceAddressDetail:that.data.sourceAddressDetail,
            sourceName:that.data.sourceName,
            sourceSex:that.data.sourceSex,
            sourcePhone:that.data.sourcePhone,
            destinAddress:that.data.destinAddress,
            destinAddressDetail:that.data.destinAddressDetail,
            destinName:that.data.destinName,
            destinSex:that.data.destinSex,
            destinPhone:that.data.destinPhone,
            iCase:that.data.iCase,
            type:that.data.type,
            y:y,
            m:m,
            d:d,
            h:h,
            mm:mm,
            time:time,
            state:0,
            taskRecipientOpenid:'',
            taskRecipientUserInfoPhone:'',
            taskRecipientUserInfoName:'',
            taskReceivedTime:'',
            taskFinishTime:''
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
            wx.navigateTo({
              url: '../myOrder/myOrder',
            })
            wx.showToast({
              title: '发布成功',
            })
          }
        })
        }else if(this.data.multiIndex[0]==2){
          var y=dayAfterTomorrow.getFullYear()
          var m=((dayAfterTomorrow.getMonth()+1)>=10)?(dayAfterTomorrow.getMonth()+1):(0+''+(dayAfterTomorrow.getMonth()+1))
          var d=(dayAfterTomorrow.getDate()>=10)?dayAfterTomorrow.getDate():(0+''+dayAfterTomorrow.getDate())
          var h=((this.data.multiIndex[1]+8)>=10)?(this.data.multiIndex[1]+8):(0+''+(this.data.multiIndex[1]+8))
          var mm='00'
          console.log(y+''+m+''+d+''+h+''+mm)
          var time=y+''+m+''+d+''+h+''+mm
        db.collection('crowdsourcing').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            userinfo:that.data.userinfo,
            sourceAddress:that.data.sourceAddress,
            sourceAddressDetail:that.data.sourceAddressDetail,
            sourceName:that.data.sourceName,
            sourceSex:that.data.sourceSex,
            sourcePhone:that.data.sourcePhone,
            destinAddress:that.data.destinAddress,
            destinAddressDetail:that.data.destinAddressDetail,
            destinName:that.data.destinName,
            destinSex:that.data.destinSex,
            destinPhone:that.data.destinPhone,
            iCase:that.data.iCase,
            type:that.data.type,
            y:y,
            m:m,
            d:d,
            h:h,
            mm:mm,
            time:time,
            state:0,
            taskRecipientOpenid:'',
            taskRecipientUserInfoPhone:'',
            taskRecipientUserInfoName:'',
            taskReceivedTime:'',
            taskFinishTime:''
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
            wx.navigateTo({
              url: '../myOrder/myOrder',
            })
            wx.showToast({
              title: '发布成功',
            })
          }
        })
        }
      }
    }
  },
  toCrowdSourcing:function(){
    wx.navigateTo({
      url: '../crowdsourcing/crowdsourcing',
    })
  },
  toTaskDetail:function(e){
    console.log(e)
    
  },
  bindchange: function(e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  chooseICase:function(){
    if(this.data.iCase==0){
      this.setData({
        iCase:1
      })
    }else{
      this.setData({
        iCase:0
      })
    }
  },
  cardSwiper:function(e){
    const that = this;
    that.setData({
      type: e.detail.current,
      iCase:0
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
  scanCode:function(){
    var that=this
    wx.scanCode({
      onlyFromCamera: true,
      success: (scres) => {
        console.log('scan result:',scres)
        wx.request({
          url: app.globalData.IoTSeverAddress+'/'+project_id+'/devices/'+scres.result+'/async-commands',
          method: 'POST',
          header:{
            "X-Auth-Token": app.globalData.HWtoken,
            "Content-Type": "application/json"
          },
          data: {
            "service_id":"Track",
            "command_name":"Lock_Control",
            "paras":{
              "Lock":"ON"
            },
            "expire_time":0,
            "send_strategy":"immediately"
          },
          dataType: 'json',
          success: (res) => {
            console.log(res)
            that.hideLoadModal()
            if(res.statusCode==200){
              wx.showToast({
                title: '开箱成功',
              })
            }else{
              wx.showToast({
                title: '出错啦',
                icon:'error'
              })
            }
       
          },
          fail: (res) => {
              console.log('request failed')
              console.log(res)
              that.hideLoadModal()
              wx.showToast({
                title: '获取出错',
                icon: 'error',
              })
          }
      })
      }
    })
  },

  toList: function(e) {
    const that = this;
    if (that.data.currentData === 0) {
      var id = 0;///定位收件列表
    } else {
      var id = 1;///送件列表
    }
    wx.navigateTo ({
      url: '/pages/List/List?mid=' + id
    })
  },

  toList0: function(e) {
    const that = this;
    if (that.data.currentData === 0) {
      var mid = 0;///定位收件列表
    } else {
      var mid = 1;///送件列表
    }
    wx.navigateTo ({
      url: '/pages/Detail/Detail?mid='+ mid+ '&id=0'
    })
  },
  toMyOrder:function(){
    wx.navigateTo({
      url: '../myOrder/myOrder',
    })
  },
  toBusLine:function(){
    wx.navigateTo({
      url: '../Pickup/Pickup',
    })
  },
  toMobileMarket:function(){
    wx.navigateTo({
      url: '../shop/shop',
    })
  },
  toSendTask:function(){
    if(app.globalData.username==null)
    {
      wx.showToast({
        title: '请先登录公邮账号',
        icon:'error'
      })
    }else{
      wx.navigateTo ({
        url: './taskCreate/taskCreate?task=0'
      })
    }
  },
  toCollectTask:function(){
    if(app.globalData.username==null)
    {
      wx.showToast({
        title: '请先登录公邮账号',
        icon:'error'
      })
    }else{
      wx.navigateTo ({
        url: './taskCreate/taskCreate?task=1'
      })
    }
  },
  toUser:function(){
    wx.switchTab({
      url: '../User/User',
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
  onShareAppMessage: function () {
    return {
      title: '公邮“最后一公里”物流专家',
    }
  },
  onShareTimeline: function () {
    return {
      title: '公邮“最后一公里”物流专家',
    }
  },
  onShow:function(){
    const db=wx.cloud.database()
    var that=this
    app.globalData.defaultGetLocation=true
    this.setData({
      userinfo:app.globalData.userinfo
    })
    if(app.globalData.openid){
      that.queryDatabase()
    }

  },
  onHide:function(){
    app.globalData.defaultGetLocation=false
  },
  onPullDownRefresh:function(){
    console.log('下拉刷新中。。。')
    var that=this
    wx.showNavigationBarLoading();
    //this.loadModal()
    // wx.cloud.callFunction({
    //   name: 'taskQuery',
    //   data: { 
  
    //   },
    //   success: res => {
    //     that.hideLoadModal()
       
    //     console.log('[云函数] [taskQuery] : ', res.result)
    //     const newList=[]
    //     const ICreate=[]
    //     const IAccept=[]
    //     res.result._embedded.packageList.forEach((element, index, array) => {
    //       //console.log(element.receiver)
    //       if(element.receiver===null){
    //         newList.push(
    //           element
    //         )
    //       }else if(element.receiver.username===app.globalData.username){
    //         IAccept.push(
    //           element
    //         )
    //       }
    //       if(element.sender.username===app.globalData.username){
    //         if(element.receiver==null){
    //           element.taskState='待接受'
    //         }else{
    //           element.taskState='已接单'
    //         }
    //         ICreate.push(
    //           element
    //         )
    //       }
          
    //     })
    //     //console.log(newList)
    //     app.globalData.taskICreate=ICreate
    //     app.globalData.taskIAccept=IAccept
    //     that.setData({
    //       swiperHeight:newList.length*360+800,
    //       taskAcceptable:newList,
    //       taskICreate:ICreate,
    //       taskIAccept:IAccept
    //     })
        
    //   },
    //   fail: err => {
    //     that.hideLoadModal()
    //     wx.showToast({
    //       title: '刷新失败',
    //       icon:'error'
    //     })
    //     console.error('[云函数] [taskQuery] 调用失败', err)
    //   }
    // })
     // 隐藏导航栏加载框
     wx.hideNavigationBarLoading();
     // 停止下拉动作
     wx.stopPullDownRefresh();
  }
})