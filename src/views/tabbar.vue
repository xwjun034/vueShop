<template>
  <div>
    <router-view />
    <div class="bottom-nav">
      <ul>
        <li class="home" @click="goPage('/index')">
          <i></i>
          <p>首页</p>
        </li>
        <li class="cart" @click="goPage('/cart')">
          <i></i>
          <p>购物车</p>
        </li>
        <li class="mine" @click="goPage('/mine')">
          <i></i>
          <p>我的</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "tabbar",
  data() {
    return {};
  },
  methods: {
    goPage(url) {
      this.$router.replace(url);
    },
  },
};
</script>
<style lang="less">
.bottom-nav {
  width: 100%;
  height: 1.2rem;
  background-color: #ffffff;
  box-shadow: 0 0 10px #efefef;
  position: fixed;
  z-index: 10;
  left: 0px;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0.5rem;
  box-sizing: border-box;
}
.bottom-nav ul {
  width: 100%;
  display: flex;
}
.bottom-nav ul li {
  width: 33.3%;
  text-align: center;
}
.bottom-nav ul li i {
  width: 0.6rem;
  height: 0.6rem;
  margin: 0 auto;
  display: block;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.bottom-nav ul li.home i {
  background-image: url("~@/assets/images/home/main/home1.png");
}
.bottom-nav ul li.cart i {
  background-image: url("~@/assets/images/home/main/cart1.png");
}
.bottom-nav ul li.mine i {
  background-image: url("~@/assets/images/home/main/my1.png");
}
</style>