import { getLoc, getSen } from '../../utils';
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
 *
 */

const userInfo = getLoc('userInfo') || '';

export default {
  userInfo: userInfo,
  equInfo: getSen('equInfo') || '',
  itemObj: getSen('itemObj') || '',
  deviceInfo: getSen('deviceInfo') || {},
  warnChart: [],
  stationId: getSen('stationId') || '',
  equNameList: [],
  currentIndex: getSen('currentIndex') || {},
  menuList: getSen('menuList') || [],
  isPowerShow: getLoc('isPowerShow') || {},
  setStations: getSen('setStations') || [],
  setLines: getSen('setLines') || [],
  setDeviceType: getSen('setDeviceType') || [],
  searchVal: getSen('searchVal') || ''
};
