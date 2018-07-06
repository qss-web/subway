import { getSen } from '../../utils';
/*
 * 参数说明:
 * @userInfo 用户信息
 * @equInfo 设备信息
 * @itemObj 列表某一条值
 * @deviceInfo  设备id和uuid
 * @warnChart 预警折线图数据
 * @stationId  车站id
 * @equNameList 设备名称列表
 * @currentIndex 当前页数和每页显示数量，用来计算当前序号
 * @menuList  菜单列表
 * @isPowerShow  权限控制
 * @setStations  车站列表
 * @setLines  线路
 * @setDeviceType  设备类型
 * @searchVal  搜索的值
 * @isTimeOut 定时器
 *
 */

const userInfo = getSen('userInfo') || '';

export default {
  userInfo: userInfo,
  equInfo: getSen('equInfo') || '',
  itemObj: getSen('itemObj') || '',
  deviceInfo: getSen('deviceInfo') || {},
  warnChart: [],
  stationId: getSen('stationId') || '',
  equNameList: [],
  currentIndex: getSen('currentIndex') || {},
  currentIndex01: getSen('currentIndex01') || {},
  currentIndex02: getSen('currentIndex02') || {},
  currentIndex03: getSen('currentIndex03') || {},
  currentIndex04: getSen('currentIndex04') || {},
  currentIndex05: getSen('currentIndex05') || {},
  currentIndex06: getSen('currentIndex06') || {},
  currentIndex07: getSen('currentIndex07') || {},
  menuList: getSen('menuList') || [],
  isPowerShow: getSen('isPowerShow') || {},
  setStations: getSen('setStations') || [],
  setLines: getSen('setLines') || [],
  setDeviceType: getSen('setDeviceType') || [],
  searchVal: getSen('searchVal') || '',
  isTimeOut: true,
  //checkMark: getSen('checkMark') || ''
  checkMark: '',
  isTimer: true
};
