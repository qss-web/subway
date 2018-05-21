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
  const userInfo = getLoc('userInfo') || getSen('userInfo') || '';
  var control = [];

  if (store.state.isPowerShow && store.state.isPowerShow.length > 3) {
    control = eval(store.state.isPowerShow)[4];
  }

  console.log(control);

  //   console.log(control);

  //   if (to.path != '/monitor') {
  //     store.commit('_isControl', false);
  //   }

  if (!userInfo.token && to.path != '/login') {
    return next({ path: '/login' });
  } else if (userInfo.token && (to.path == '/' || to.path == '/login')) {
    return next({ path: 'index' });
  }

  //   if (!control[0].flag && control[1].flag) {
  //     return next({ path: 'mine' });
  //   } else {
  //     return next();
  //   }
  return next();
});

export default router;
