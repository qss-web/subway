// 封装请求
import api from './api';
import axios from 'axios';
import { Notification, Loading } from 'element-ui';
import store from '../store';

// 全局设置
axios.defaults.headers.common['Authorization'] = 'subway';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  return config;
});

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use(
  response => {
    const data = response.data;

    return data;
  },
  err => {
    // 这里是返回状态码不为200时候的错误处理
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误';
          break;

        case 401:
          err.message = '未授权，请登录';
          break;

        case 403:
          err.message = '拒绝访问';
          break;

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`;
          break;

        case 408:
          err.message = '请求超时';
          break;

        case 500:
          err.message = '服务器内部错误';
          break;

        case 501:
          err.message = '服务未实现';
          break;

        case 502:
          err.message = '网关错误';
          break;

        case 503:
          err.message = '服务不可用';
          break;

        case 504:
          err.message = '网关超时';
          break;

        case 505:
          err.message = 'HTTP版本不受支持';
          break;

        default:
          err.message = '未知错误';
      }
    }
    return Promise.reject(err);
  }
);

const htp = axios.create({
  baseURL: '/',
  timeout: 10000
});

// 处理接口规范的公有方法
const xhr = ({ method = 'post', ur, options = {} }) => {
  let p,
    m = false;
  let load = { close: () => {} };

  //   setTimeout(() => {
  //     !m &&
  //       (load = Loading.service({
  //         fullscreen: true,
  //         text: '拼命加载中...'
  //       }));
  //   }, 500);

  let ops = {};

  if (store.state.userInfo) {
    ops = JSON.parse(JSON.stringify(store.state.userInfo));
    Object.assign(ops, options);
  } else {
    ops = options;
  }
  switch (method) {
    case 'get':
      p = new Promise(function(resolve, reject) {
        htp
          .get(api[ur], {
            params: ops
          })
          .then(
            response => {
              m = true;
              load.close();
              if (response.data.code && response.data.code == 1) {
                resolve(response.data.body);
              } else {
                reject(response.data.msg);
              }
            },
            er => {
              m = true;
              load.close();
              errHandler(er);
            }
          );
      });
      break;
    case 'post':
      p = new Promise(function(resolve, reject) {
        htp.post(api[ur], ops).then(
          response => {
            m = true;
            load.close();
            if (response.data.code && response.data.code == 1) {
              resolve(response.data.body);
            } else {
              reject(response.data.msg);
            }
          },
          er => {
            m = true;
            load.close();
            errHandler(er);
          }
        );
      });
      break;
    default:
      break;
  }
  return p;
};

function errHandler(er) {
  Notification.error({
    title: '网络连接错误',
    message: '请检查您的网络连接是否正常'
  });
}

export default xhr;
