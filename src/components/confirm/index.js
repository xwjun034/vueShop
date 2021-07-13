import Comfirm from './confirm';
export default { // 注册组件
    install(Vue) {
      //  Vue.component('my-confirm',Comfirm)
      let ConfirmObj = Vue.extend(Comfirm);
      Vue.prototype.$confirm = function(msg,btns){
         let ConfirmInit = new ConfirmObj().$mount(document.createElement('div'));
         //console.log(ConfirmInit)
         document.body.appendChild(ConfirmInit.$el);
         ConfirmInit.msg = msg;
         if(btns && btns.length>0){
            ConfirmInit.btns = btns;
         }
      }
    }
}