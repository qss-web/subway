import header from './home/header'; //首页header
import cardContainer from './cardContainer'; //卡片容器
import chart from './chart'; //chart容器
import tableSmall from './tableSmall'; //table容器
import timelyAlarm from './home/timelyAlarm'; //实时预警信息
import failureAnalysis from './home/failureAnalysis'; //故障原因分析
import todayAlarm from './home/todayAlarm'; //今日预警统计
import todayPatrol from './home/todayPatrol'; //今日巡检比例
import subwayLine from './home/subwayLine'; //整体线路图
import flashing from './home/flashing'; //站台警告灯
import machineSummary from './home/machineSummary'; //本月设备运行时间/今日故障待办事项
import fixtimeSummary from './home/fixtimeSummary'; //月可靠度/平均每日修复时间/保修超时率
import counterSummary from './home/counterSummary'; //当月各站故障次数/当月人员工作量
import runningTime from './home/runningTime'; //本月设备运行时间
import failureCount from './home/failureCount'; //今日故障待办事项
import monthlyReliability from './home/monthlyReliability'; //月可靠度
import fixingTime from './home/fixingTime'; //平均每日修复时间&&报修超时率
import goback from './goback'; //返回上一页
import tag from './tag'; //提示信息框
import healthIndicators from './siteInfo/healthIndicators'; //健康指标
import train from './train'; //地铁
import userinfo from './mine/userinfo'; //用户信息
import editUserinfo from './mine/editUserinfo'; //修改用户信息
import mineTodolist from './mine/mineTodolist'; //我的-待办事项
import mineQualification from './mine/mineQualification'; //我的-技术指标
import mineAlarmEvent from './mine/mineAlarmEvent'; //我的-预警事件
import mineAlarmReason from './mine/mineAlarmReason'; //我的-预警原因
import alarmPopup from './alarmPopup'; //预警弹窗
import loginHeader from './loginHeader';
import loginFooter from './loginFooter';
import search from './search';
import searchList from './searchList';
import subSearch from './subSearch'; //列表上面的筛选搜索
import operationIndex from './equInfo/operationIndex'; //运行指标
import patrolInspection from './equInfo/patrolInspection'; //巡视巡检
import troubleShoot from './equInfo/troubleShoot'; //故障维修
import ringDiagram from './equInfo/ringDiagram'; //环形图
import pieChart from './equInfo/pieChart'; //饼形图
import systemList from './systemList'; //系统设置的列表
import system from './sysSet/system'; //系统
import user from './sysSet/user'; //用户
import monitorLog from './sysSet/monitorLog'; //监测日志
import client from './sysSet/client'; //客户端
import authorize from './sysSet/authorize'; //设备授权
import role from './sysSet/role'; //角色
import checkEqu from './setup/checkEqu'; //检测配备设置
import runniState from './setup/runniState'; //当前设备运行状态
import timeManagement from './setup/timeManagement'; //运行时间管理
import wifiList from './sysSet/wifiList'; //wifi列表
import mobile from './sysSet/mobile'; //手机维护
import menu from './sysSet/menu'; //菜单管理
import maintenanceSheet from './maintenanceSheet'; //报修单
import popBox from './popBox'; //增加编辑等弹出框
import popTable from './popTable'; //增加table表格类的弹框，目测此项目只有这一个
import equMsg from './setup/equMsg'; //设备信息
import faultLibrary from './setup/faultLibrary'; //故障库
import systemSet from './setup/systemSet'; //系统设置
import statisticians from './setup/statisticians'; //人员情况统计
import controlBox from './controlBox'; //更新或下载提示框

export default {
  header,
  cardContainer,
  chart,
  tableSmall,
  timelyAlarm,
  failureAnalysis,
  todayAlarm,
  todayPatrol,
  subwayLine,
  flashing,
  machineSummary,
  fixtimeSummary,
  counterSummary,
  runningTime,
  failureCount,
  monthlyReliability,
  fixingTime,
  goback,
  tag,
  healthIndicators,
  train,
  userinfo,
  editUserinfo,
  mineTodolist,
  mineQualification,
  mineAlarmEvent,
  mineAlarmReason,
  alarmPopup,
  loginHeader,
  loginFooter,
  search,
  searchList,
  subSearch,
  operationIndex,
  patrolInspection,
  troubleShoot,
  ringDiagram,
  pieChart,
  systemSet,
  systemList,
  system,
  user,
  client,
  authorize,
  role,
  checkEqu,
  runniState,
  timeManagement,
  mobile,
  monitorLog,
  maintenanceSheet,
  menu,
  popBox,
  popTable,
  equMsg,
  faultLibrary,
  statisticians,
  controlBox,
  wifiList
};
