import { Notification } from 'element-ui';
import htp from '../../http';

export default {
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
  }
};
