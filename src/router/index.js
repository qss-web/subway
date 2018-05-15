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

  if (to.path != '/monitor') {
    store.commit('_isControl', false);
  }

  if (!userInfo.token && to.path != '/login') {
    return next({ path: '/login' });
  } else if (userInfo.token && (to.path == '/' || to.path == '/login')) {
    return next({ path: 'index' });
  }
  return next();
});

export default router;
