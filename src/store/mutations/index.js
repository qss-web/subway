import { setSen, clearKey } from '../../utils';
export default {
  //登录
  _userInfo(state, userInfo) {
    setSen('userInfo', userInfo);
    state.userInfo = userInfo;
  },
  //退出登陆
  _clearLogin(state) {
    state.userInfo = '';
    clearKey('userInfo', 'r');
  },
  //设备详情信息
  _equInfo(state, equInfo) {
    setSen('equInfo', equInfo);
    state.equInfo = equInfo;
  },
  //列表某一条值
  _itemObj(state, item) {
    setSen('itemObj', item);
    state.itemObj = item;
  },
  //存储设备id和设备uuid
  _deviceInfo(state, deviceInfo) {
    setSen('deviceInfo', deviceInfo);
    state.deviceInfo = deviceInfo;
  },
  //存储预警信息
  _warnChart(state, warnChart) {
    state.warnChart = warnChart;
  },
  //存储车站id
  _stationId(state, stationId) {
    setSen('stationId', stationId);
    state.stationId = stationId;
  },
  //存储设备名称列表
  _equNameList(state, equNameList) {
    setSen('equNameList', equNameList);
    state.equNameList = equNameList;
  },
  //存储当前页数，用来计算当前序号
  _currentIndex(state, currentPage) {
    //   type==1 设备实时状态  type==2 测点实时状态  type==3手机维修列表
    //   type==4 车站级测点  type==5 风机测点  type==6 站台门测点 type==7 扶梯测点
    if (currentPage.type == 1) {
      setSen('currentIndex01', currentPage);
      state.currentIndex01 = currentPage;
    } else if (currentPage.type == 2) {
      setSen('currentIndex02', currentPage);
      state.currentIndex02 = currentPage;
    } else if (currentPage.type == 3) {
      setSen('currentIndex03', currentPage);
      state.currentIndex03 = currentPage;
    } else if (currentPage.type == 4) {
      setSen('currentIndex04', currentPage);
      state.currentIndex04 = currentPage;
    } else if (currentPage.type == 5) {
      setSen('currentIndex05', currentPage);
      state.currentIndex05 = currentPage;
    } else if (currentPage.type == 6) {
      setSen('currentIndex06', currentPage);
      state.currentIndex06 = currentPage;
    } else if (currentPage.type == 7) {
      setSen('currentIndex07', currentPage);
      state.currentIndex07 = currentPage;
    } else {
      setSen('currentIndex', currentPage);
      state.currentIndex = currentPage;
    }
  },
  //菜单信息
  _menuList(state, menuList) {
    setSen('menuList', menuList);
    state.menuList = menuList;
  },
  //权限显示
  _isPowerShow(state, isPowerShow) {
    setSen('isPowerShow', isPowerShow);
    state.isPowerShow = isPowerShow;
  },
  //车站列表
  _setStations(state, setStations) {
    setSen('setStations', setStations);
    state.setStations = setStations;
  },
  //线路列表
  _setLines(state, setLines) {
    setSen('setLines', setLines);
    state.setLines = setLines;
  },
  //设备列表
  _setDeviceType(state, setDeviceType) {
    setSen('setDeviceType', setDeviceType);
    state.setDeviceType = setDeviceType;
  },
  //存search的值
  _setSearchVal(state, searchVal) {
    setSen('searchVal', searchVal);
    state.searchVal = searchVal;
  },
  //是否定时器
  _isTimeOut(state, isTimeOut) {
    state.isTimeOut = isTimeOut;
  },
  _setCheckMark(state, checkMark) {
    // setSen('checkMark', checkMark);
    state.checkMark = checkMark;
  }
};
