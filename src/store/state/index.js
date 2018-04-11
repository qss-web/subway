import { getLoc, getSen } from '../../utils';
/*
 * 参数说明:
 * @userInfo 用户信息
 * @equInfo 设备信息
 * @itemObj 列表某一条值
 * @deviceInfo  设备id和uuid
 * @预警折线图数据  warnChart
 *
 */

const userInfo = getLoc('userInfo') || '';

export default {
  userInfo: userInfo,
  equInfo: getSen('equInfo') || '',
  itemObj: '',
  deviceInfo: getSen('deviceInfo') || {},
  warnChart: []
};
