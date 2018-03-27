const api = {
  //获取阿里云授权
  testtest: 'qmsCode/getProvice',
  xjhangyou: 'http://61.138.253.141:88/xjhangyou/visitRegister/getldDataTest'
};

for (var k in api) {
  if (/http/.test(api[k])) {
  } else if (process.env.NODE_ENV == 'development') {
    api[k] = '/api/' + api[k];
  } else {
    api[k] = 'https://platform-dev.qms888.com/' + api[k];
  }
}

export default api;
