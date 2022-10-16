// pages/Despatch/Despatch.js
const app=getApp()
// 引入SDK核心类
var QQMapWX = require('../../components/qqmap-wx-jssdk.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'MH2BZ-UFWWD-C7K4M-PQJM2-4ZQIS-NIFHH' // 必填
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenHeight:app.globalData.WindowHeight,
    ScreenHeight80Percent:app.globalData.WindowHeight*0.75,
    ScreenHeight15Percent:app.globalData.WindowHeight*0.15,
    ScreenHeight90Percent:app.globalData.WindowHeight*0.84,
    busLine:'',
    setting: { // 使用setting配置，方便统一还原
			rotate: 0,
			skew: 0,
			enableRotate: false,
    },
    location: {
			latitude: 39.930063,
			longitude: 119.569736,
    },
    hglocation: {
			latitude: 30.108691,
			longitude: 116.03534,
    },
    hgscale:11,
    scale: 12,
		isOverLooking: false,
		is3D: true,
		isShowScale: true,
		isShowCompass: true,
		minScale: 3,
    maxScale: 20,
    busLine1:[
      {latitude: 39.926018, longitude: 119.57816799999999},
      {latitude: 39.927165, longitude: 119.58003899999999},
      {latitude: 39.92777, longitude: 119.58107799999999},
      {latitude: 39.927924000000004, longitude: 119.58130299999999},
      {latitude: 39.928093000000004, longitude: 119.58159199999999},
      {latitude: 39.928558, longitude: 119.58230799999998},
      {latitude: 39.928908, longitude: 119.58291499999999},
      {latitude: 39.929216, longitude: 119.58358699999998},
      {latitude: 39.92929899999999, longitude: 119.58386399999998},
      {latitude: 39.92954799999999, longitude: 119.58457099999998},
      {latitude: 39.92971299999999, longitude: 119.58514799999999},
      {latitude: 39.92984899999999, longitude: 119.58582499999999},
      {latitude: 39.92993599999999, longitude: 119.58645299999999},
      {latitude: 39.92998299999999, longitude: 119.58702399999999},
      {latitude: 39.930018999999994, longitude: 119.58766999999999},
      {latitude: 39.930043999999995, longitude: 119.587904},
      {latitude: 39.930088999999995, longitude: 119.58876199999999},
      {latitude: 39.93012399999999, longitude: 119.58913399999999},
      {latitude: 39.93018999999999, longitude: 119.59029999999998},
      {latitude: 39.93038299999999, longitude: 119.59276299999999},
      {latitude: 39.93049499999999, longitude: 119.594388},
      {latitude: 39.93058799999999, longitude: 119.595396},
      {latitude: 39.93062499999999, longitude: 119.59593699999999},
      {latitude: 39.93076399999999, longitude: 119.596656},
      {latitude: 39.93080399999999, longitude: 119.596826},
      {latitude: 39.930900999999984, longitude: 119.597068},
      {latitude: 39.93097299999999, longitude: 119.597297},
      {latitude: 39.93114399999999, longitude: 119.597622},
      {latitude: 39.93184199999999, longitude: 119.599108},
      {latitude: 39.93282499999999, longitude: 119.601133},
      {latitude: 39.933117999999986, longitude: 119.601802},
      {latitude: 39.93366799999998, longitude: 119.602968},
      {latitude: 39.93366799999998, longitude: 119.602968},
      {latitude: 39.93386799999998, longitude: 119.603198},
      {latitude: 39.934263999999985, longitude: 119.603178},
      {latitude: 39.93487799999998, longitude: 119.603078},
      {latitude: 39.937015999999986, longitude: 119.60279},
      {latitude: 39.937795999999985, longitude: 119.602671},
      {latitude: 39.93960599999998, longitude: 119.602423},
      {latitude: 39.939993999999984, longitude: 119.602357},
      {latitude: 39.941069, longitude:119.602222},
    ],
    busLine2:[
      {latitude: 39.941069, longitude: 119.60222},
      {latitude: 39.942039, longitude: 119.602095},
      {latitude: 39.942039, longitude: 119.602095},
      {latitude: 39.942243, longitude: 119.601912},
      {latitude: 39.942268, longitude: 119.601155},
      {latitude: 39.942234, longitude: 119.60026300000001},
      {latitude: 39.942234, longitude: 119.59997200000001},
      {latitude: 39.942168, longitude: 119.59775300000001},
      {latitude: 39.942125000000004, longitude: 119.59586500000002},
      {latitude: 39.942127000000006, longitude: 119.59541400000002},
      {latitude: 39.942114000000004, longitude: 119.59515700000001},
      {latitude: 39.942116000000006, longitude: 119.59427300000002},
      {latitude: 39.942088000000005, longitude: 119.59231500000001},
      {latitude: 39.942049000000004, longitude: 119.59026300000001},
      {latitude: 39.94201400000001, longitude: 119.589213},
      {latitude: 39.94202400000001, longitude: 119.58827600000001},
      {latitude: 39.94200400000001, longitude: 119.58756600000001},
      {latitude: 39.94198400000001, longitude: 119.58744600000001},
      {latitude: 39.94177400000001, longitude: 119.58659900000002},
      {latitude: 39.94163100000001, longitude: 119.58592800000002},
      {latitude: 39.94138600000001, longitude: 119.58490700000003},
      {latitude: 39.94130300000001, longitude: 119.58464400000003},
      {latitude: 39.94094600000001, longitude: 119.58321800000003},
      {latitude: 39.94085600000001, longitude: 119.58281200000003},
      {latitude: 39.94085600000001, longitude: 119.58281200000003},
      {latitude: 39.94113600000001, longitude: 119.58218800000003},
      {latitude: 39.941536000000006, longitude: 119.58141800000003},
      {latitude: 39.942173000000004, longitude: 119.58013500000003},
      {latitude: 39.943345, longitude: 119.57795700000003},
      {latitude: 39.943464, longitude: 119.57775800000003},
      {latitude: 39.944196999999996, longitude: 119.57634400000003},
      {latitude: 39.944196999999996, longitude: 119.57634400000003},
      {latitude: 39.944238, longitude: 119.57610800000003},
      {latitude: 39.944046, longitude: 119.57595600000003},
      {latitude: 39.943653, longitude: 119.57560400000003},
      {latitude: 39.942668, longitude: 119.57465300000003},
      {latitude: 39.942305, longitude: 119.57432600000003},
      {latitude: 39.941351, longitude: 119.57342400000003},
      {latitude: 39.940841999999996, longitude: 119.57286300000003},
      {latitude: 39.940566999999994, longitude: 119.57265500000003},
      {latitude: 39.94044699999999, longitude: 119.57258500000003},
      {latitude: 39.94021699999999, longitude: 119.57250500000004},
      {latitude: 39.93996699999999, longitude: 119.57248500000003},
      {latitude: 39.93964699999999, longitude: 119.57251400000003},
      {latitude: 39.93880399999998, longitude: 119.57263400000002},
      {latitude: 39.93741799999999, longitude: 119.57265200000002},
      {latitude: 39.93689599999999, longitude: 119.57265300000002},
      {latitude: 39.93640499999999, longitude: 119.57270400000002},
      {latitude: 39.93536399999999, longitude: 119.57273300000001},
      {latitude: 39.935044999999995, longitude: 119.57276400000002},
      {latitude: 39.934065, longitude: 119.57279800000002},
      {latitude: 39.932770999999995, longitude: 119.57282700000002},
      {latitude: 39.932075, longitude: 119.57282500000002},
      {latitude: 39.931216, longitude: 119.57287800000002},
      {latitude: 39.930087, longitude: 119.57288100000002}
    ],
    busLine3:[
      {latitude: 39.941069, longitude: 119.60222},
{latitude: 39.942039, longitude: 119.602095},
{latitude: 39.942039, longitude: 119.602095},
{latitude: 39.942243, longitude: 119.601912},
{latitude: 39.942268, longitude: 119.601155},
{latitude: 39.942234, longitude: 119.60026300000001},
{latitude: 39.942234, longitude: 119.59997200000001},
{latitude: 39.942168, longitude: 119.59775300000001},
{latitude: 39.942125000000004, longitude: 119.59586500000002},
{latitude: 39.942127000000006, longitude: 119.59541400000002},
{latitude: 39.942114000000004, longitude: 119.59515700000001},
{latitude: 39.942116000000006, longitude: 119.59427300000002},
{latitude: 39.942088000000005, longitude: 119.59231500000001},
{latitude: 39.942049000000004, longitude: 119.59026300000001},
{latitude: 39.94201400000001, longitude: 119.589213},
{latitude: 39.94202400000001, longitude: 119.58827600000001},
{latitude: 39.94200400000001, longitude: 119.58756600000001},
{latitude: 39.94198400000001, longitude: 119.58744600000001},
{latitude: 39.94177400000001, longitude: 119.58659900000002},
{latitude: 39.94163100000001, longitude: 119.58592800000002},
{latitude: 39.94138600000001, longitude: 119.58490700000003},
{latitude: 39.94130300000001, longitude: 119.58464400000003},
{latitude: 39.94094600000001, longitude: 119.58321800000003},
{latitude: 39.94071800000001, longitude: 119.58218400000003},
{latitude: 39.94066400000001, longitude: 119.58182600000002},
{latitude: 39.94060000000001, longitude: 119.58170100000002},
{latitude: 39.94043000000001, longitude: 119.58149800000002},
{latitude: 39.94043000000001, longitude: 119.58149800000002},
{latitude: 39.94038600000001, longitude: 119.58154000000002},
{latitude: 39.93873700000001, longitude: 119.58167400000002},
{latitude: 39.93760600000001, longitude: 119.58182300000001},
{latitude: 39.937022000000006, longitude: 119.58193200000001},
{latitude: 39.93604500000001, longitude: 119.58203700000001},
{latitude: 39.935925000000005, longitude: 119.58206700000001},
{latitude: 39.935596000000004, longitude: 119.582108},
{latitude: 39.935596000000004, longitude: 119.582108},
{latitude: 39.935308000000006, longitude: 119.582023},
{latitude: 39.93508800000001, longitude: 119.58189300000001},
{latitude: 39.93495800000001, longitude: 119.58177300000001},
{latitude: 39.93489800000001, longitude: 119.58169300000002},
{latitude: 39.93480800000001, longitude: 119.58150300000001},
{latitude: 39.93469600000001, longitude: 119.58119700000002},
{latitude: 39.934323000000006, longitude: 119.57647500000002},
{latitude: 39.93417600000001, longitude: 119.57433600000002},
{latitude: 39.93415900000001, longitude: 119.57382900000002},
{latitude: 39.93406500000001, longitude: 119.57279800000002},
{latitude: 39.93400600000001, longitude: 119.57171300000002},
{latitude: 39.93396800000001, longitude: 119.57130800000002},
{latitude: 39.933868000000004, longitude: 119.56985400000002},
{latitude: 39.93349800000001, longitude: 119.56542200000003},
{latitude: 39.93341800000001, longitude: 119.56412700000003},
{latitude: 39.93338500000001, longitude: 119.56387800000003},
{latitude: 39.93327400000001, longitude: 119.56242800000003},
{latitude: 39.93307500000001, longitude: 119.55959400000003},
{latitude: 39.93307600000001, longitude: 119.55936800000003},
{latitude: 39.933043000000005, longitude: 119.55910600000003},
{latitude: 39.93303600000001, longitude: 119.55881700000003},
{latitude: 39.93286700000001, longitude: 119.55683800000003},
{latitude: 39.932795000000006, longitude: 119.55615400000002},
{latitude: 39.932745000000004, longitude: 119.55585400000002},
{latitude: 39.932348000000005, longitude: 119.55264500000003},
{latitude: 39.93213900000001, longitude: 119.55115100000003},
{latitude: 39.932022, longitude: 119.55014000000003},
{latitude: 39.931990000000006, longitude: 119.54979300000002},
{latitude: 39.931974000000004, longitude: 119.54934400000002},
{latitude: 39.931936, longitude: 119.54902000000001},
{latitude: 39.931867, longitude: 119.54809800000001},
{latitude: 39.931816, longitude: 119.54767100000001},
{latitude: 39.931692999999996, longitude: 119.54689400000001},
{latitude: 39.931633999999995, longitude: 119.546435},
{latitude: 39.931397999999994, longitude: 119.54516600000001},
{latitude: 39.93080499999999, longitude: 119.54177600000001},
{latitude: 39.930640999999994, longitude: 119.54071000000002},
{latitude: 39.93005399999999, longitude: 119.53729200000002},
{latitude: 39.92955899999999, longitude: 119.53431300000003},
{latitude: 39.92945499999999, longitude: 119.53374900000003},
{latitude: 39.92939599999999, longitude: 119.53348800000003},
{latitude: 39.92908099999999, longitude: 119.53222400000003},
{latitude: 39.92892499999999, longitude: 119.53170500000003},
{latitude: 39.928543999999995, longitude: 119.53061400000003},
{latitude: 39.92795999999999, longitude: 119.52934000000003},
{latitude: 39.92766699999999, longitude: 119.52881800000003},
{latitude: 39.92638099999999, longitude: 119.52691300000004},
{latitude: 39.925802999999995, longitude: 119.52634300000004},
{latitude: 39.92534199999999, longitude: 119.52585400000004},
{latitude: 39.924547, longitude: 119.52510700000003},
{latitude: 39.924048, longitude: 119.52458500000003},
{latitude: 39.923265, longitude: 119.52387600000003},
{latitude: 39.922688, longitude: 119.52330800000003},
{latitude: 39.921003, longitude: 119.52163200000003},
{latitude: 39.920609, longitude: 119.52118200000002},
{latitude: 39.920467, longitude: 119.52104000000003},
{latitude: 39.919474, longitude: 119.51976900000003},
{latitude: 39.919192, longitude: 119.51944700000003},
{latitude: 39.918619, longitude: 119.51871000000003},
{latitude: 39.916116, longitude: 119.51542400000002},
{latitude: 39.916036000000005, longitude: 119.51530400000003},
{latitude: 39.91565500000001, longitude: 119.51484400000002},
{latitude: 39.914837000000006, longitude: 119.51373200000002},
    ],
    hgBusLine:[
      {latitude: 30.083931, longitude: 115.956964},
{latitude: 30.084007, longitude: 115.957399},
{latitude: 30.084243999999998, longitude: 115.958253},
{latitude: 30.084432999999997, longitude: 115.958896},
{latitude: 30.084768999999998, longitude: 115.959887},
{latitude: 30.084777, longitude: 115.959965},
{latitude: 30.084813, longitude: 115.96010199999999},
{latitude: 30.085164, longitude: 115.96123399999999},
{latitude: 30.085295, longitude: 115.96169499999999},
{latitude: 30.085423, longitude: 115.962144},
{latitude: 30.085493999999997, longitude: 115.96232499999999},
{latitude: 30.085568999999996, longitude: 115.96249999999999},
{latitude: 30.085647999999996, longitude: 115.962583},
{latitude: 30.085923999999995, longitude: 115.963404},
{latitude: 30.086057999999994, longitude: 115.963788},
{latitude: 30.086028999999993, longitude: 115.96384499999999},
{latitude: 30.086110999999992, longitude: 115.96409799999999},
{latitude: 30.08623099999999, longitude: 115.964441},
{latitude: 30.08660499999999, longitude: 115.965543},
{latitude: 30.086661999999993, longitude: 115.965571},
{latitude: 30.086747999999993, longitude: 115.965882},
{latitude: 30.08692299999999, longitude: 115.966338},
{latitude: 30.08717799999999, longitude: 115.967219},
{latitude: 30.087337999999992, longitude: 115.9678599999},
{latitude: 30.087711999999993, longitude: 115.97812299999998},
{latitude: 30.087863999999993, longitude: 115.97874399999998},
{latitude: 30.08817399999999, longitude: 115.97968399999998},
{latitude: 30.08838399999999, longitude: 115.98021399999998},
{latitude: 30.08850399999999, longitude: 115.98048399999998},
{latitude: 30.08887199999999, longitude: 115.98119899999998},
{latitude: 30.08956299999999, longitude: 115.98250799999998},
{latitude: 30.089867999999992, longitude: 115.98300799999998},
{latitude: 30.09111399999999, longitude: 115.98536399999999},
{latitude: 30.09153399999999, longitude: 115.98610299999999},
{latitude: 30.09233399999999, longitude: 115.98773399999999},
{latitude: 30.092943999999992, longitude: 115.98907399999999},
{latitude: 30.09336399999999, longitude: 115.99011399999999},
{latitude: 30.09372399999999, longitude: 115.99089799999999},
{latitude: 30.09428599999999, longitude: 115.99232399999998},
{latitude: 30.09443199999999, longitude: 115.99265199999998},
{latitude: 30.09617099999999, longitude: 115.99693999999998},
{latitude: 30.096337999999992, longitude: 115.99731399999997},
{latitude: 30.09645399999999, longitude: 115.99761699999998},
{latitude: 30.09770799999999, longitude: 116.00012699999998},
{latitude: 30.09884399999999, longitude: 116.00248499999998},
{latitude: 30.09979099999999, longitude: 116.00438599999998},
{latitude: 30.100971999999988, longitude: 116.00660299999998},
{latitude: 30.104022999999987, longitude: 116.01563999999999},
{latitude: 30.104243999999987, longitude: 116.01639399999999},
{latitude: 30.104623999999987, longitude: 116.018048},
{latitude: 30.105126999999985, longitude: 116.020134},
{latitude: 30.105503999999986, longitude: 116.021164},
{latitude: 30.105803999999985, longitude: 116.022574},
{latitude: 30.106733999999985, longitude: 116.026204},
{latitude: 30.110061999999985, longitude: 116.03658800000001},
{latitude: 30.110119999999984, longitude: 116.03672700000001},
{latitude: 30.110953999999985, longitude: 116.03919400000001},
{latitude: 30.111723999999985, longitude: 116.041324},
{latitude: 30.114002999999986, longitude: 116.047044},
{latitude: 30.11781199999999, longitude: 116.05630500000001},
{latitude: 30.11819099999999, longitude: 116.057512},
{latitude: 30.118410999999988, longitude: 116.058592},
{latitude: 30.11854299999999, longitude: 116.05968200000001},
{latitude: 30.11855399999999, longitude: 116.06113400000001},
{latitude: 30.11853399999999, longitude: 116.061704},
{latitude: 30.118452999999988, longitude: 116.06238400000001},
{latitude: 30.11838399999999, longitude: 116.062904},
{latitude: 30.118189999999988, longitude: 116.063917},
{latitude: 30.11801199999999, longitude: 116.064571},
{latitude: 30.117878999999988, longitude: 116.064961},
{latitude: 30.117313999999986, longitude: 116.066912},
{latitude: 30.116999999999987, longitude: 116.067873},
{latitude: 30.116173999999987, longitude: 116.071004},
{latitude: 30.115941999999986, longitude: 116.072357},
{latitude: 30.115900999999987, longitude: 116.072707},
{latitude: 30.115718999999988, longitude: 116.075362},
{latitude: 30.115696999999987, longitude: 116.076461},
{latitude: 30.115633999999986, longitude: 116.07701399999999},
{latitude: 30.115593999999987, longitude: 116.07914199999999},
{latitude: 30.116305999999984, longitude: 116.088708},
{latitude: 30.116513999999984, longitude: 116.091484},
{latitude: 30.116535999999986, longitude: 116.091971},
{latitude: 30.116682999999984, longitude: 116.09291400000001},
{latitude: 30.116722999999983, longitude: 116.093034},
{latitude: 30.116903999999984, longitude: 116.09354400000001},
{latitude: 30.117237999999983, longitude: 116.094406},
{latitude: 30.117413999999982, longitude: 116.094604},
{latitude: 30.117563999999984, longitude: 116.094803},
{latitude: 30.117716999999985, longitude: 116.09490699999999},
{latitude: 30.117820999999985, longitude: 116.094951},
{latitude: 30.118027999999985, longitude: 116.095006},
{latitude: 30.119057999999985, longitude: 116.094962},
{latitude: 30.119341999999985, longitude: 116.094974},
{latitude: 30.119501999999986, longitude: 116.095},
{latitude: 30.119823999999987, longitude: 116.095094},
{latitude: 30.122212999999988, longitude: 116.09707300000001},
{latitude: 30.122937999999987, longitude: 116.09761800000001},
{latitude: 30.123993999999986, longitude: 116.09807400000001},
{latitude: 30.124903999999987, longitude: 116.098375},
{latitude: 30.125303999999986, longitude: 116.098454},
{latitude: 30.125593999999985, longitude: 116.098414},
{latitude: 30.127179999999985, longitude: 116.097944},
{latitude: 30.127893999999984, longitude: 116.097844},
{latitude: 30.128550999999984, longitude: 116.097802},
{latitude: 30.129383999999984, longitude: 116.09786},
{latitude: 30.131787999999982, longitude: 116.098126},
{latitude: 30.132257999999982, longitude: 116.098226},
{latitude: 30.13287899999998, longitude: 116.098441},
{latitude: 30.13287899999998, longitude: 116.098441},
{latitude: 30.13298899999998, longitude: 116.09849299999999},
{latitude: 30.13482599999998, longitude: 116.097889},
{latitude: 30.13563599999998, longitude: 116.097608},
{latitude: 30.13625299999998, longitude: 116.097414},
{latitude: 30.13669599999998, longitude: 116.097296},
{latitude: 30.137319999999978, longitude: 116.097156},
{latitude: 30.138020999999977, longitude: 116.097075},
{latitude: 30.139109999999977, longitude: 116.09701600000001},
{latitude: 30.14045199999998, longitude: 116.09700800000002},
{latitude: 30.14111899999998, longitude: 116.09698300000002},
{latitude: 30.14157899999998, longitude: 116.09700400000003},
{latitude: 30.14233299999998, longitude: 116.09706200000002},
{latitude: 30.142766999999978, longitude: 116.09713000000002},
{latitude: 30.14336299999998, longitude: 116.09725400000002},
{latitude: 30.143931999999978, longitude: 116.09741200000002},
{latitude: 30.144092999999977, longitude: 116.09746100000002},
{latitude: 30.145209999999977, longitude: 116.09794400000003},
{latitude: 30.145866999999978, longitude: 116.09820500000002},
{latitude: 30.147425999999978, longitude: 116.09886400000002},
{latitude: 30.14800099999998, longitude: 116.09904200000003},
{latitude: 30.14889299999998, longitude: 116.09942800000003},
{latitude: 30.14960099999998, longitude: 116.09964600000004},
{latitude: 30.149858999999978, longitude: 116.09970500000003},
{latitude: 30.15038499999998, longitude: 116.09977200000003},
{latitude: 30.15862899999998, longitude: 116.09966100000003},
{latitude: 30.16333599999998, longitude: 116.09951200000003},
{latitude: 30.16440699999998, longitude: 116.09953400000003},
{latitude: 30.165182999999978, longitude: 116.09959600000003},
{latitude: 30.16586099999998, longitude: 116.09974300000003},
{latitude: 30.168248999999978, longitude: 116.10076200000003},
{latitude: 30.168887999999978, longitude: 116.10123500000003},
{latitude: 30.170019999999976, longitude: 116.10217600000003},
{latitude: 30.170787999999977, longitude: 116.10278800000003},
{latitude: 30.172100999999977, longitude: 116.10357700000003},
{latitude: 30.172495999999978, longitude: 116.10384300000003},
{latitude: 30.173584999999978, longitude: 116.10450100000003},
{latitude: 30.17469599999998, longitude: 116.10520600000002},
{latitude: 30.17498599999998, longitude: 116.10529100000002},
{latitude: 30.17498599999998, longitude: 116.10529100000002},
{latitude: 30.17495499999998, longitude: 116.10593100000003},
{latitude: 30.17477799999998, longitude: 116.10833100000002},
{latitude: 30.17477799999998, longitude: 116.10833100000002},
{latitude: 30.176110999999977, longitude: 116.10844000000002},
{latitude: 30.178878999999977, longitude: 116.10859500000002},
{latitude: 30.179644999999976, longitude: 116.10867400000002},
{latitude: 30.180917999999977, longitude: 116.10878100000002},
{latitude: 30.18175599999998, longitude: 116.10883600000003},
{latitude: 30.18175599999998, longitude: 116.10883600000003},
{latitude: 30.18169499999998, longitude: 116.11040200000002},
{latitude: 30.18150999999998, longitude: 116.11284200000003},
{latitude: 30.18142899999998, longitude: 116.11372800000002},
{latitude: 30.18133599999998, longitude: 116.11506800000002},
{latitude: 30.18133599999998, longitude: 116.11506800000002},
{latitude: 30.18726599999998, longitude: 116.11546200000002},
{latitude: 30.18810199999998, longitude: 116.11553700000002},
{latitude: 30.19057699999998, longitude: 116.11570000000002},
{latitude: 30.19071199999998, longitude: 116.11574500000002},
{latitude: 30.19094799999998, longitude: 116.11569000000001},
{latitude: 30.191467999999983, longitude: 116.11546400000002},
{latitude: 30.19153599999998, longitude: 116.11536100000002},
{latitude: 30.19273099999998, longitude: 116.11504000000002},
{latitude: 30.19294199999998, longitude: 116.11500900000001},
{latitude: 30.19317899999998, longitude: 116.11499800000001},
{latitude: 30.19377099999998, longitude: 116.11502800000001},
{latitude: 30.19398499999998, longitude: 116.11501400000002},
{latitude: 30.19428399999998, longitude: 116.11492200000002},
{latitude: 30.194445999999978, longitude: 116.11478700000002},
{latitude: 30.194517999999977, longitude: 116.11477900000003},
{latitude: 30.194889999999976, longitude: 116.11447100000002},
{latitude: 30.195295999999978, longitude: 116.11403800000002},
{latitude: 30.195626999999977, longitude: 116.11373300000002},
{latitude: 30.195626999999977, longitude: 116.11373300000002},
{latitude: 30.197355999999978, longitude: 116.11431400000002},
{latitude: 30.19782399999998, longitude: 116.11442800000002},
{latitude: 30.19825999999998, longitude: 116.11451100000002},
{latitude: 30.19898899999998, longitude: 116.11443300000002},
{latitude: 30.20042199999998, longitude: 116.11424900000002},
{latitude: 30.200880999999978, longitude: 116.11415800000002},
{latitude: 30.20189499999998, longitude: 116.11404700000001},
{latitude: 30.20189499999998, longitude: 116.11404700000001},
{latitude: 30.20188899999998, longitude: 116.11389500000001},
{latitude: 30.20085099999998, longitude: 116.11401500000001},
],
    busLineList:[
      {
        id:1,
        lineName:'公邮1号',
        lineDetail:'集散中心 —— 乡镇小学'
      },
      {
        id:2,
        lineName:'公邮2号',
        lineDetail:'集散中心 —— 乡镇初中'
      },
      {
        id:3,
        lineName:'公邮3号',
        lineDetail:'集散中心 —— 乡镇高中'
      }
    ],
    city: '0',
    picker: ['黄冈', '秦皇岛'],
     hgMarkers: [
			{
				customCallout: {
          anchorY: 0,
          anchorX: 0,
					display: 'BYCLICK'
				},
				id:0,
				latitude: 30.083728,
				longitude: 115.957012,
				iconPath: '/images/station.png',
				width: '26px',
				height: '34px',
				rotate: 0,
        alpha: 1,
        content: '东门',
        title:'城东车站',
        toEast:25,
        toWest:0
        
			},
			{
				customCallout: {
					anchorY: 0,
          anchorX: 0,
					display: 'BYCLICK'
				},
				id:1,
				latitude: 30.096968,
				longitude: 115.998935,
				iconPath: '/images/station.png',
				width: '26px',
				height: '34px',
				rotate: 0,
        alpha: 1,
        content: '南门',
        title:'梅山村',
        toEast:2,
        toWest:1,
        
			},
			{
				customCallout: {
					anchorY: 0,
          anchorX: 0,
					display: 'BYCLICK'
				},
				id:2,
				latitude: 30.103111,
				longitude: 116.012725,
				iconPath: '/images/station.png',
				width: '26px',
				height: '34px',
				rotate: 0,
        alpha: 1,
        content: '西门',
        title:'烟铺村',
        toEast:0,
        toWest:0,
      },
      {
				customCallout: {
					anchorY: 0,
          anchorX: 0,
					display: 'BYCLICK'
				},
				id:3,
				latitude: 30.108466,
				longitude: 116.031089,
				iconPath: '/images/station.png',
				width: '26px',
				height: '34px',
				rotate: 0,
        alpha: 1,
        content: '西门',
        title:'张福村',
        toEast:3,
        toWest:0,
      },
      {
				customCallout: {
					anchorY: 0,
          anchorX: 0,
					display: 'BYCLICK'
				},
				id:4,
				latitude: 30.112381,
				longitude: 116.043412,
				iconPath: '/images/station.png',
				width: '26px',
				height: '34px',
				rotate: 0,
        alpha: 1,
        content: '西门',
        title:'凉岭村',
        toEast:0,
        toWest:3,
      },
      {
				customCallout: {
					anchorY: 0,
          anchorX: 0,
					display: 'BYCLICK'
				},
				id:5,
				latitude: 30.115479,
				longitude: 116.052664,
				iconPath: '/images/station.png',
				width: '26px',
				height: '34px',
				rotate: 0,
        alpha: 1,
        content: '西门',
        title:'王冲',
        toEast:2,
        toWest:2,
      },
      {
				customCallout: {
					anchorY: 0,
          anchorX: 0,
					display: 'BYCLICK'
				},
				id:6,
				latitude: 30.11586,
				longitude: 116.07679,
				iconPath: '/images/station.png',
				width: '26px',
				height: '34px',
				rotate: 0,
        alpha: 1,
        content: '西门',
        title:'界子墩村',
        toEast:5,
        toWest:7
      },
      {
				customCallout: {
					anchorY: 0,
          anchorX: 0,
					display: 'BYCLICK'
				},
				id:7,
				latitude: 30.201752,
				longitude: 116.113317,
				iconPath: '/images/station.png',
				width: '26px',
				height: '34px',
				rotate: 0,
        alpha: 1,
        content: '西门',
        title:'宿松县客运中心',
        toWest:20,
        toEast:0
      },
      {
				customCallout: {
					anchorY: 0,
          anchorX: 0,
					display: 'BYCLICK'
				},
				id:8,
				latitude: 30.110132,
				longitude: 116.03665,
				iconPath: '/images/bus.png',
				width: '26px',
				height: '34px',
				rotate: 0,
        alpha: 1,
        content: '西门',
        title:'公交车',
        toWest:20,
        toEast:0
      },
      {
				customCallout: {
					anchorY: 0,
          anchorX: 0,
					display: 'BYCLICK'
				},
				id:9,
				latitude: 30.101628,
				longitude: 116.007965,
				iconPath: '/images/bus.png',
				width: '26px',
				height: '34px',
				rotate: 0,
        alpha: 1,
        content: '西门',
        title:'公交车',
        toWest:20,
        toEast:0
			},
    ],
    scroll: 0,
    toEastList: [{
      name: '城东车站'
    }, {
      name: '梅山村'
    }, {
      name: '烟铺村'
    }, {
      name: '张福村'
    },{
      name: '凉岭村'
    },{
      name: '王冲'
    }, {
      name: '界子墩村'
    },{
      name: '宿松县客运中心'
    },],
    toWestList: [{
      name: '宿松县客运中心'
    }, {
      name: '界子墩村'
    }, {
      name: '王冲'
    }, {
      name: '凉岭村'
    },{
      name: '张福村'
    },{
      name: '烟铺村'
    }, {
      name: '梅山村'
    },{
      name: '城东车站'
    },],
    toWestScroll:5,
    toEastScroll:3

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // wx.cloud.callFunction({
    //   name: 'queryDevice',
    //   data: { 
    //   },
    //   success: res => {
    //     console.log('[云函数] [queryDevice] : ', res.result)
    //     that.setData({
    //       deviceList:res.result._embedded.deviceList
    //     })
    //     //that.hideLoadModal()
    //   },
    //   fail: err => {
    //     console.error('[云函数] [queryDevice] 调用失败', err)
    //   }
    // })
    that.setData({

      polyline: [{
        points: that.data.busLine1,
        color: '#39b54a',
        width: 6
      },
      {
        points: that.data.busLine2,
        color: '#3667A9',
        width: 6
      },
      {
        points: that.data.busLine3,
        color: '#EEA699',
        width: 6
      }],
      hgpolyline: [{
        points: that.data.hgBusLine,
        color: '#4169E1',
        width: 6
      }],
      hglocation:{
        latitude:30.151385,
        longitude:116.036089,
      },

    })
    
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        const speed = res.speed
        const accuracy = res.accuracy
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            id: "0",
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: "/images/dot.png",
            width: 40,
            height: 40,
          }]
        })
      }
     })

  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      city: e.detail.value
    })
  },
  cityChange:function(){

  },
  lineChange:function(e){
    var that=this
    console.log(e)
    if(e.currentTarget.dataset.id==1){
      this.setData({
        busLine:'公邮1号',
        polyline: [{
          points: that.data.busLine1,
          color: '#39b54a',
          width: 6
        }],
        scale: 13,
        location: {
          latitude: 39.932343,
          longitude: 119.591913,
        },
        markers: [{
          id: "0",
          latitude:'39.941069',
          longitude: "119.602222",
          iconPath: "/images/center.png",
          width: 40,
          height: 40,
        },
        {
          id: "1",
          latitude:'39.926018',
          longitude: "119.57816799999999",
          iconPath: "/images/school.png",
          width: 40,
          height: 40,
        }
      ]
      })
      this.hideModal()

    }else if(e.currentTarget.dataset.id==2){
      this.setData({
        busLine:'公邮2号',
        polyline: [{
          points: that.data.busLine2,
          color: '#3667A9',
          width: 6
        }],
        scale: 13,
        location: {
          latitude: 39.935136,
          longitude: 119.588093,
        },
        markers: [{
          id: "0",
          latitude:'39.941069',
          longitude: "119.602222",
          iconPath: "/images/center.png",
          width: 40,
          height: 40,
        },
        {
          id: "1",
          latitude:'39.930087',
          longitude: "119.57288100000002",
          iconPath: "/images/school.png",
          width: 40,
          height: 40,
        },
        {
          id: "2",
          latitude:'39.930129',
          longitude: "119.569806",
          iconPath: "/images/bus.png",
          width: 40,
          height: 40,
        }]
      })
      this.hideModal()
    }else if(e.currentTarget.dataset.id==3){
      this.setData({
        busLine:'公邮3号',
        polyline: [{
          points: that.data.busLine3,
          color: '#EEA699',
          width: 6
        }],
        scale: 12,
        location: {
          latitude: 39.930403,
          longitude: 119.567537,
        },
        markers: [{
          id: "0",
          latitude:'39.941069',
          longitude: "119.602222",
          iconPath: "/images/center.png",
          width: 40,
          height: 40,
        },
        {
          id: "1",
          latitude:'39.914837000000006',
          longitude: "119.51373200000002",
          iconPath: "/images/school.png",
          width: 40,
          height: 40,
        }]
      })
      this.hideModal()
    }
  },
  onTapMarker(e){

    console.log(e)
    console.log('e.detail.markerId',e.detail.markerId)
    this.data.hgMarkers.forEach((element, index, array) => {
      if(element.id==e.detail.markerId){
        this.setData({
          modalName: 'stationDetail',
          modalContent:element.title,
          toEast:element.toEast,
          toWest:element.toWest,
          // grayRemain:'10%',
          // greenRemain:'30%',
          // blueRemain:'20%',
          //full:element.full?'已满':'未满',
          hglocation: {
            latitude: element.latitude,
            longitude: element.longitude,
          },
          scale: 17,
        })
      }
    })
  },
  toBoxDetail:function(){
    wx.navigateTo({
      url: './boxDetail/boxDetail',
    })
  },
  scanQRCode:function(){
    var that=this
    var project_id='a3a06e5ff8a045cca50475d783fdb14d' //项目id，物联网平台规定项目范围，对应于整个公邮项目
    that.loadModal()
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
    return {
      title: '公邮“最后一公里”物流专家',
    }
  },
  onShareTimeline: function () {
    return {
      title: '公邮“最后一公里”物流专家',
    }
  }
})