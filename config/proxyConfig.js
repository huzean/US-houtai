/**
 * Created by linxue on 2018/12/17.
 */
const proEnv=require('./prod.env');
const testEnv=require('./test.env');
const devEnv=require('./dev.env');

const env = process.env.NODE_ENV;
console.log(env);
let target = '';
// 默认是本地环境
if(env==='production'){  // 生产环境
  target = proEnv.API_HOST;
}else if(env==='test'){ // 测试环境
  target = testEnv.API_HOST;
}else{  // 本地环境
  target = devEnv.API_HOST;
}
console.log(target);
module.exports = {
  proxy: {
    '/api': {
      target:'http://176.166.1.47:11025',
      //target:target,
      changeOrigin:true,//是否跨域
      pathRewrite:{
        '^/api': ''
      }
    },
  }
}
