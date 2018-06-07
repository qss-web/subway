import VueRouter from 'vue-router';
import routes from './router';
import { getLoc, getSen } from '../utils';
import store from '../store';

const router = new VueRouter({
  mode: 'hash',
  linkActiveClass: 'is-active',
  routes
});

// 路由拦截
router.beforeEach(function(to, from, next) {
  debugger;
  clearTimeout(window.timeOut);

  const userInfo = getLoc('userInfo') || getSen('userInfo') || '';
  var control = [];

  if (to.path != '/search' && to.path != '/equInfo') {
    store.commit('_setSearchVal', '');
  }

  if (to.path != '/index') {
    store.commit('_isTimeOut', false);
  } else {
    store.commit('_isTimeOut', true);
  }

  if (store.state.isPowerShow && store.state.isPowerShow.length > 3) {
    control = eval(store.state.isPowerShow)[4];
  }

  if (!userInfo.token && to.path != '/login') {
    return next({
      path: '/login'
    });
  } else if (userInfo.token && (to.path == '/' || to.path == '/login')) {
    return next({
      path: 'index'
    });
  } else if (control.length != 0 && control[0].flag && to.path == '/index') {
    return next();
  } else if (control.length != 0 && !control[0].flag && control[1].flag && to.path == '/index') {
    return next({
      path: '/mine'
    });
  } else if (control.length != 0 && !control[0].flag && !control[1].flag && control[2].flag && to.path == '/index') {
    return next({
      path: '/search'
    });
  } else if (control.length != 0 && !control[0].flag && !control[1].flag && !control[2].flag && control[3].flag && to.path == '/index') {
    return next({
      path: '/setup'
    });
  }

  return next();
});

export default router;
