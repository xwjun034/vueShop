<template>
    <div class="page">
        <subHeader title="会员注册"/>
        <div class="main">
            <div class="inputs">
                <input type="text" placeholder="验证码" v-model="vcode"/>
                <div class="vcode-img"><img :src="showCode" @click="changVCode($event)" /></div>
            </div>
            <div class="cellphone-wrap">
                <div class="cellphone"><input type="tel" placeholder="请输入手机号" @input="checkCellphone" v-model="cellphone"/></div>
                <div :class="{'code-btn':true,success:isSendMsgCode}" @click="getMsgCode">{{msgCodeText}}</div>
            </div>
            <div class="code-wrap"><input type="text" placeholder="请输入短信验证码" v-model="msgCode" /></div>
            <div class="password-wrap">
                <div class="password"><input type="text" placeholder="请输入密码" v-model="password" /></div>
                <div class="switch-wrap"><van-switch v-model="isOpen" active-color="#EB1625" /></div>
            </div>
            <div class="sure-btn" @click="submit()">注册</div>
        </div>
    </div>
</template>
<script>
import subHeader from '@/components/sub_header';
import { Toast } from 'vant';
import URL from '@/serviceAPI.config.js';
export default {
    data(){
        return{
            isOpen:false,
            vcode:"",
            cellphone:"",
            msgCode:"",
            password:"",
            showCode:"http://vueshop.glbuys.com/api/vcode/chkcode?token=1ec949a15fb709370f",
            msgCodeText:'获取验证码',
            isSendMsgCode:false
        }
    },
    created(){
        
    },
    methods:{
        // 验证码刷新
        changVCode(e){
            e.target.src="http://vueshop.glbuys.com/api/vcode/chkcode?token=1ec949a15fb709370f"+"&random"+new Date().getTime()
        },
        checkCellphone(e){
            console.log('e',e.target.value)
        },
        // 注册
       async submit(){
            if(this.vcode.match(/^s*$/)){
                Toast('请输入图形验证码');
                return;
            }
            
            // let vcodeData =await this.checkVcode();
            // console.log('vcodeData',vcodeData)
            // if(vcodeData.code !=200){
            //     Toast('您输入的图文验证码不正确');
            //     return;
            // }
            if(this.cellphone.match(/^s*$/)){
                Toast('请输入手机号');
                return;
            }
            if(this.cellphone.match(/^1[0-9][0-9]\d{12}$/)){
                Toast('手机号格式不正确');
                return;
            }
            if(this.msgCode.match(/^s*$/)){
                Toast('请输入短信验证码');
                return;
            }
            if(this.password.match(/^s*$/)){
                Toast('请输入密码');
                return;
            }
            this.regUser()
        },
        // 检验验证码
        checkVcode(){
            this.axios({
                url:URL.getCheckVcode,
                method:'POST',
                data:{
                    vcode:this.vcode
                },
            })
            .then((res)=>{
                console.log('res',res)
            })
            .catch((err)=>{
                console.log('err',err)
            })
        },
        // 注册
        regUser(){
            this.axios({
                url:URL.getRegUser,
                method:'POST',
                data:{
                    vcode:this.vcode,
                    cellphone:this.cellphone,
                    password:this.password
                }
            }).then((res)=>{
                this.$router.push('/login')
            }).catch((err)=>{
                console.log('err',err)
            })
        },
        // 获取验证码
        getMsgCode(){
            this.isSendMsgCode=false;
            let time=10;
            this.msgCodeText="重新获取（"+time+"）";
            this.timer = setInterval(()=>{
                if(time>0){
                    time--;
                    this.msgCodeText="重新获取（"+time+"）"
                }else{
                    clearInterval(this.timer);
                    this.msgCodeText="获取短信验证码"
                    this.isSendMsgCode=true;
                }
            },1000)
        }
    },
    components:{
        subHeader
    },
    beforeDestroy(){
        clearInterval(this.timer)
    }
}
</script>
<style lang="less">
    .page{width:100%;height:100vh;background-color: #ffffff;}
    .main{width:100%;padding-top:1.4rem;}
    .cellphone-wrap{width:90%;height:0.84rem;margin:0 auto;display: flex;display: -webkit-flex;justify-content: space-between;-webkit-justify-content: space-between;margin-top:0.4rem;}
    .cellphone-wrap .cellphone{width:62%;height:100%;border:#EFEFEF solid 1px;border-radius: 2px;}
    .cellphone-wrap .cellphone input,.code-wrap input,.password-wrap .password input{width:92%;height:95%;font-size:0.28rem;padding-left:0.2rem;}
    .cellphone-wrap .code-btn{width:35%;height:0.82rem;background:#EAEAEA;color:#717376;border:#EAEAEA solid 1px;border-radius: 2px;font-size:0.28rem;text-align:center;line-height:0.82rem;}
    .cellphone-wrap .code-btn.success{background:#FFFFFF;border:1px solid #EB1625;color:#EB1625}
    .code-wrap{width:90%;height:0.84rem;margin:0 auto;border-radius: 2px;border:#EFEFEF solid 1px;margin-top:0.4rem;}
    .password-wrap{width:90%;height:0.84rem;margin:0 auto;border-radius: 2px;border:#EFEFEF solid 1px;margin-top:0.4rem;display:flex;display: -webkit-flex;}
    .password-wrap .password{width:80%;height:100%;}
    .password-wrap .switch-wrap{width:20%;margin-top:0.1rem;}
    .sure-btn{width:85%;height:0.8rem;margin:0 auto;background:#EB1625;font-size:0.36rem;color:#FFFFFF;line-height:0.8rem;text-align: center;margin-top:0.4rem;border-radius: 4px;}
    .fastreg-wrap{width:85%;display:flex;display:-webkit-flex;justify-content: space-between;-webkit-justify-content: space-between;font-size:0.24rem;margin:0 auto;margin-top:0.3rem;}
    .fastreg-wrap img{width:0.32rem;height:0.32rem;vertical-align: middle;}
    .inputs{width:90%;height:0.84rem;border:#EFEFEF solid 1px;border-radius:2px;background:#FFFFFF;margin:0 auto;line-height:0.84rem;padding-left:0.2rem;font-size:0.28rem;position:relative;box-sizing: border-box;}
    .inputs .vcode-img{width:20%;height:60%;position:absolute;right:0px;top:20%;border-left:1px solid #EFEFEF;text-align:center;}
    .inputs .vcode-img img{width:80%;height:100%;}
    .inputs input{width:80%;height:88%;}
</style>