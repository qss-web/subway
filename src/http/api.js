const api = {
  //----------------------设备相关--------------------------

  //根据线路，车站，设备系统获取设备名称
  selectlist: 'webapi/device/selectlist',
  //设备档案列表 GET
  infoList: 'webapi/device/list',
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

  //   ------------------------------系统管理相关---------------------------------
  // 用户登录
  login: 'webapi/user/login',
  // 用户列表
  userList: 'webapi/user/list',
  // 用户新增修改   POST
  userAdd: 'webapi/user/add',
  // 用户删除   POST
  userDel: 'webapi/user/del',
  // 客户端列表
  clientList: 'webapi/client/list',
  // 客户端上传   POST
  clientUpload: 'webapi/client/upload',
  // 客户端下载
  clientDownload: 'webapi/client/download',

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

  // 设备运行状态列表
  equRunList: 'webapi/devicerun/list',
  // 设备运行状态新增   POST
  equRunAdd: 'webapi/devicerun/add',
  // 设备运行状态删除   POST
  equRunDel: 'webapi/devicerun/del',
  // 设备运行时间列表
  equRunTimeList: 'webapi/runtime/list',
  // 设备运行时间修改   POST
  equRunTimeUpdate: 'webapi/runtime/update',

  // 菜单列表
  menuList: 'webapi/menu/list',
  // 菜单修改  只允许修改名称   POST
  menuUpdate: 'webapi/menu/update',

  // 人员情况统计
  staffStatistics: 'webapi/statistics/user/list'
};

for (var k in api) {
  if (/http/.test(api[k])) {
  } else if (process.env.NODE_ENV == 'development') {
    api[k] = '/bjdt/' + api[k];
  } else {
    api[k] = 'https://platform-dev.qms888.com/' + api[k];
  }
}

export default api;
