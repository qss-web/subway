import { setLoc } from '../../utils';
export default {
  //登录
  _userInfo(state, userInfo) {
    setLoc('userInfo', userInfo);
    state.userInfo = userInfo;
  }
};
