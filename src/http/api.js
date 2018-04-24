const api = {
  //----------------------设备相关--------------------------

  //根据线路，车站，设备系统获取设备名称
  selectlist: 'webapi/device/selectlist',
  //设备信息列表 GET
  infoList: 'webapi/device/list',
  //设备信息同步按钮
  synBtnFn: 'webapi/device/syn',
  //设备档案详情 GET
  infoDetail: 'webapi/device/details',
  //修改设备
  deviceUpdate: 'webapi/device/update',
  //设备档案详情 --运行指标 GET
  infoRun: 'webapi/device/details/run/count',
  //设备档案详情 --运行指标列表 GET
  infoRunList: 'webapi/device/details/run/list',
  //设备档案详情 --巡视巡检 GET
  infoCheck: 'webapi/device/details/inspect/count',
  //设备档案详情 --巡视巡检列表 GET
  infoCheckList: 'webapi/device/details/inspect/list',
  //设备档案详情 --故障单 GET
  infoFault: 'webapi/device/details/fault/count',
  //设备档案详情 --故障单列表  GET
  infoFaultList: 'webapi/device/details/fault/list',

  // ------------------------------监控相关---------------------------------
  // 车站运行情况
  stationList: 'webapi/statistics/station/list',
  // 今日故障待办事项统计
  backlogCount: 'webapi/todo/count',
  // 今日故障待办事项列表
  backlogList: 'webapi/todo/list',
  // 指标运行统计   月可靠度   平均修复时间     报修超市率
  runCount: 'webapi/quota/count', //??????????????详情的几个方法 TODO   还差几个详情的接口
  // 今日巡检比例
  checkRatio: 'webapi/inspect/count',
  // 今日巡检比例 详细列表
  checkRatioList: 'webapi/inspect/list',
  // 今日巡检比例 删除
  checkRatioDel: 'webapi/inspect/del',
  // 今日设备健康完好率 (车站级页面)
  availability: 'webapi/device/availability',
  // (车站级页面) 工单
  workorder: 'webapi/device/workorder',
  // 今日设备运行指标 (设备级页面)
  equRuninfo: 'webapi/device/run/info',

  // ------------------------------全文检索相关---------------------------------
  // 查询统计总数
  queryCount: 'webapi/search/count',
  // 查询统计选择提示框内容 最后再实现
  querySelect: 'webapi/search/select',
  // 设备档案  (详情查看设备模块接口 )
  queryDevice: 'webapi/search/device',
  //预警信息
  queryAlarm: 'monitor/fullTextSearch',
  // 故障报修单
  queryFault: 'webapi/search/fault',
  // 图片
  queryPic: 'webapi/search/pic',
  // 其他-巡视巡检
  queryInspect: 'webapi/search/other/inspect',
  // 其他-故障库
  queryFaultlibrary: 'webapi/search/other/faultlibrary',

  // ------------------------------个人中心相关---------------------------------
  // 当前用户信息
  mineUserInfo: 'webapi/self/userinfo',
  // 修改用户信息   POST
  mineUpdateuser: 'webapi/self/updateuser',
  // 个人中心待办事项
  mineCount: 'webapi/self/todo/count',
  // 设备关注度
  mineRate: 'webapi/self/device/rate',
  //预警事件
  warningEvents: 'monitor/warningEvents',

  //   ------------------------------系统管理相关---------------------------------
  // 用户登录
  login: 'webapi/user/login',
  // 用户列表
  userList: 'webapi/user/list',
  // 用户新增修改   POST
  userAdd: 'webapi/user/add',
  // 用户删除   POST
  userDel: 'webapi/user/del',
  //查询用户信息
  userDetail: 'webapi/user/detail',

  //上传客户端后回调
  clientAdd: 'webapi/client/add',
  // 客户端列表
  clientList: 'webapi/client/list',
  //   // 客户端上传   POST
  //   clientUpload: 'webapi/client/upload',
  //   // 客户端下载
  //   clientDownload: 'webapi/client/download',

  // 角色列表
  roleList: 'webapi/role/list',
  // 角色新增修改   POST
  roleAdd: 'webapi/role/add',
  // 角色删除   POST
  roleDel: 'webapi/role/del',

  // 授权列表  @param request  角色id or 手机id
  authorizeList: 'webapi/authorize/list',
  // 授权添加   POST
  authorizeAdd: 'webapi/authorize/add',
  // 授权删除   POST
  authorizeDel: 'webapi/authorize/del',

  // 设备配置列表
  equConfigList: 'webapi/deviceconfig/list',
  // 设备配置修改   POST
  equConfigUpdate: 'webapi/deviceconfig/update',

  // 设备运行时间管理列表
  equRunTimeList: 'webapi/runtime/list',
  // 设备运行时间管理修改   POST
  equRunTimeUpdate: 'webapi/runtime/update',

  //   // 设备运行状态列表
  //   equRunList: 'webapi/devicerun/list',
  //   // 设备运行状态新增   POST
  //   equRunAdd: 'webapi/devicerun/add',
  //   // 设备运行状态删除   POST
  //   equRunDel: 'webapi/devicerun/del',
  // 设备运行状态删除
  equRunDel: 'runStatus/del',
  // 设备运行状态编辑
  equRunEdit: 'runStatus/edit',
  // 设备运行状态新增
  equRunAdd: 'runStatus/add',
  // 设备运行状态列表
  equRunList: 'runStatus/list',
  //根据线路，车站，设备系统获取设备名称//根据线路，车站，设备系统获取设备名称
  selectlist2: 'webapi/device/selectlist2',

  // 菜单列表
  menuList: 'webapi/menu/list',
  // 菜单修改  只允许修改名称   POST
  menuUpdate: 'webapi/menu/update',

  // 人员情况统计
  staffStatistics: 'webapi/statistics/user/list',

  //   ------------------------------其它接口---------------------------------
  //首页实时报警信息
  timelyAlarmTop: 'monitor/timelyAlarmTop',
  //实时预警信息列表----实时预警信息
  timelyAlarmList: 'monitor/timelyAlarms',
  //实时预警信息列表----以往历史事件
  alarmListHistory: 'monitor/timelyAlarmList',
  // 今日报警统计
  todayAlarmTop: 'monitor/todayAlarmTop',
  //今日报警统计列表
  todayAlarm: 'monitor/todayAlarm',
  // 故障原因分析
  failureAnalysis: 'monitor/failureAnalysis',
  //故障分析列表
  failureAnalysisList: 'monitor/failureAnalysisList',
  // 车站报警
  stationAlarmStatistical: 'monitor/stationAlarmStatistical',
  // 当月设备运行时间
  monthRunningTime: 'monitor/monthRunningTime',
  //当月设备运行时间列表
  monthRunningTimeList: 'monitor/monthRunningTimeList',
  //设备实时状态列表
  eqTimelyStatus: 'monitor/eqTimelyStatus',
  //测点实时状态
  pointTimelyStatus: 'monitor/pointTimelyStatus',
  //事件信息列表
  eventInfo: 'monitor/eventInfo',
  //测点状态列表
  pointStatus: 'monitor/pointStatus',
  //首页月可靠度/平均每日修复时间/保修超时率详情页面
  commonDetail: 'webapi/quota/count/detail',
  commonLeft01: 'webapi/quota/count/detail/col1',
  commonLeft02: 'webapi/quota/count/detail/col2',
  commonLeft03: 'webapi/quota/count/detail/col3',
  //（预警信息）折线图接口
  warnData: 'webapi/device/zd/data',
  //故障设备详情获取
  faultDetail: 'webapi/fault/Detail',
  //故障设备详情修改
  faultUpdate: 'webapi/fault/add',

  //获取角色列表
  getRoleList: 'webapi/auth/role/list',
  //获取手机列表
  getMobileList: 'webapi/auth/mobile/list',
  //获取设备列表
  getDeviceList: 'webapi/auth/inside/device/list',
  //获取弹框设备列表
  getDevicePopList: 'webapi/auth/outside/device/list',
  //设备授权
  addDeviceInfo: 'webapi/auth/device',
  //已授权接口删除
  delDeviceInfo: 'webapi/unauth/device',

  //获取线路列表
  getLines: 'webapi/getLineList',
  //获取车站列表
  getStation: 'webapi/getStationList',

  //系统设置-系统列表
  sysList: 'webapi/sysconfig/list',
  //系统设置-系统增加
  sysAdd: 'webapi/sysconfig/add',
  //系统设置-系统删除
  sysDel: 'webapi/sysconfig/del',

  //车站级
  equimentOfStation: 'monitor/equimentOfStation',
  //设备级
  pointOfEquiment: 'monitor/pointOfEquiment',

  //故障统计饼图1
  getPie1: 'webapi/device/details/fault/count/pie1',
  //故障统计饼图2
  getPie2: 'webapi/device/details/fault/count/pie2 '
};

for (var k in api) {
  if (/http/.test(api[k])) {
  } else if (process.env.NODE_ENV == 'development') {
    api[k] = '/bjdt/' + api[k];
  } else {
    api[k] = 'http://' + window.location.host + '/bjdt/' + api[k];
  }
}

export default api;
