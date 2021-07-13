const BASEURL = "http://vueshop.glbuys.com/api/"
const URL = {
    getBan:BASEURL+'home/index/slide?token=1ec949a15fb709370f', // banner
    getNav:BASEURL+'home/index/nav?token=1ec949a15fb709370f',
    getGoods:BASEURL+'home/index/goodsLevel?token=1ec949a15fb709370f', // 首页商品
    getRecomGoods:BASEURL+'home/index/recom?token=1ec949a15fb709370f', // 推荐商品
    getCategory:BASEURL+'home/category/menu?token=1ec949a15fb709370f', //商品分类侧边导航栏
    getCategoryGoods:BASEURL+'home/category/show?cid=493&token=1ec949a15fb709370f',// 商品分类右侧商品
    getHotSearch:BASEURL+'home/public/hotwords?token=1ec949a15fb709370f', //热门搜索
    getPrice:BASEURL,
    getLogin:BASEURL+'home/user/pwdlogin?token=1ec949a15fb709370f', // 登录
    getCheckVcode:BASEURL+'home/user/checkvcode?token=1ec949a15fb709370f', // 检验验证码
    getRegUser:BASEURL+'home/user/reg?token=1ec949a15fb709370f', // 注册
    getUser:BASEURL+'user/myinfo/userinfo/uid/696443691?token=1ec949a15fb709370f', //个人中心信息
    outLogin:BASEURL+'home/user/safeout?token=1ec949a15fb709370f', // 安全退出
} 

module.exports = URL