import { getLoc, getSen } from '../../utils';
/*
 * 参数说明:
 * @userInfo 用户信息
 * @equInfo 设备信息
 * @itemObj 列表某一条值
 *
 */

const userInfo = getLoc('userInfo') || '';

export default {
  userInfo: userInfo,
  equInfo: getSen('equInfo') || '',
  itemObj: ''
};
