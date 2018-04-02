import { getLoc } from '../../utils';
/*
 * 参数说明:
 * @userInfo 用户信息

 *
 */

const userInfo = getLoc('userInfo') || '';

export default {
  userInfo: userInfo
};
