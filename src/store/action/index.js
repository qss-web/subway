import { Notification } from 'element-ui';
import htp from '../../http';

export default {
  //列表获取值，并存储在状态机
  _getList({ commit }, data) {
    const method = data.method ? data.method : 'post';

    htp({ ur: data.api, options: data.ops, method: method }).then(
      res => {
        typeof data.callback == 'function' && data.callback(res);
      },
      er => {
        Notification.error({ title: data.title || '提示', message: er });
      }
    );
  },

  //非列表的接口请求到的值，直接返回
  _getInfo({ commit }, data) {
    const method = data.method ? data.method : 'post';

    htp({ ur: data.api, options: data.ops, method: method }).then(
      res => {
        typeof data.callback == 'function' && data.callback(res);
      },
      er => {
        Notification.error({ title: data.title || '提示', message: er });
      }
    );
  },

  // 登陆
  _login({ commit }, data) {
    const method = data.method ? data.method : 'post';

    htp({ ur: data.api, options: data.ops, method: method }).then(
      res => {
        const s = { userId: res.id.toString(), token: res.token, isLimitShow: res.messageFlag };

        commit('_userInfo', s);
        data.callback();
      },
      er => {
        Notification.error({ title: '登录失败', message: er });
      }
    );
  }
};
