const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    load: true,
    list : [{
      id:0,
      name:'手工艺品',
      number:'手工',
      content:'乡村手工艺品',
      items:[{
        pic:'http://m.qpic.cn/psc?/V51o6AfO138S3m3lNdc10hOSZE4VGVwk/45NBuzDIW489QBoVep5mccZDZY0RQzk6sw2fbZlTDAVBsqdvCI2Fj2c98qK.OfvP2GsOs4rbzCBZrN1SItxTbR9TWNbppLusAvDkxPQudGU!/b&bo=8AR3A*AEdwMDORw!&rf=viewer_4&t=5',
        describe:'徽章30积分'
      },{
        pic:'http://m.qpic.cn/psc?/V51o6AfO138S3m3lNdc10hOSZE4VGVwk/45NBuzDIW489QBoVep5mccZDZY0RQzk6sw2fbZlTDAV*lu93Es7x3AsNzmz5MQtgZ3Um*HsU0GJew9Yii5T75PoTi8fyWoJHG3lRMdjgu5s!/b&bo=8wTZA*ME2QMDKQw!&rf=viewer_4&t=5',
        describe:'文化衫75积分'
      },{
        pic:'http://m.qpic.cn/psc?/V51o6AfO138S3m3lNdc10hOSZE4VGVwk/45NBuzDIW489QBoVep5mccoB4lWxGo.G3zaEKQ17fZmlsB8BLIPsF5SRTakmiJowsqmGaNtLm5DJJcyqNbG90.wlo2*8hTIfVHG3CbgQQGw!/b&bo=fgQ7A34EOwMDORw!&rf=viewer_4&t=5',
        describe:'文化衫75积分'
      },{
        pic:'http://m.qpic.cn/psc?/V51o6AfO138S3m3lNdc10hOSZE4VGVwk/45NBuzDIW489QBoVep5mccZDZY0RQzk6sw2fbZlTDAUG9i8QjMqVuq9T*GRJe2ijfGzXqtW*VoDBch.*uJh5c.aml2Df4YLZc9UHo6t1fH0!/b&bo=CQhABsMUJhACaes!&rf=viewer_4&t=5',
        describe:'帆布包150积分'
      },
      ]
    },{
      id:1,
      name:'农产品',
      number:'农产',
      content:'农产品优惠卷',
      items:[{
        pic:'https://img0.baidu.com/it/u=2149282047,2427143209&fm=26&fmt=auto&gp=0.jpg',
        describe:'半价优惠100积分'
      }
      ]
    },{
      id:2,
      name:'其他',
      number:'其他',
      content:'敬请期待',
      items:[{
        pic:'https://img0.baidu.com/it/u=2003407182,1479543240&fm=11&fmt=auto&gp=0.jpg',
        describe:'999积分'
      }
      ]
    }]
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    this.setData({
      listCur: {
        id:0,
        name:'第一条',
        content:''
      }
    })
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;     
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  onShow: function () {
   
  },
})