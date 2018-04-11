import { setLoc, setSen } from '../../utils';
export default {
  //登录
  _userInfo(state, userInfo) {
    setLoc('userInfo', userInfo);
    state.userInfo = userInfo;
  },
  //设备详情信息
  _equInfo(state, equInfo) {
    setSen('equInfo', equInfo);
    state.equInfo = equInfo;
  },
  //列表某一条值
  _itemObj(state, item) {
    state.itemObj = item;
  },
  //存储设备id和设备uuid
  _deviceInfo(state, deviceInfo) {
    setSen('deviceInfo', deviceInfo);
    state.deviceInfo = deviceInfo;
  },
  //存储设备id和设备uuid
  _warnChart(state, warnChart) {
    state.warnChart = warnChart;
  }
};
