import { setLoc, setSen } from '../../utils';
export default {
  //登录
  _userInfo(state, userInfo) {
    setLoc('userInfo', userInfo);
    state.userInfo = userInfo;
  },
  _equInfo(state, equInfo) {
    setSen('equInfo', equInfo);
    state.equInfo = equInfo;
  }
};
