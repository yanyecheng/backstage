<template>
  <el-container>
    <el-header>电商后台管理系统 <button>退出</button></el-header>
    <el-container>
      <el-aside width="250px">
        <div class="san"><i class="el-icon-s-tools"></i></div>

        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="isover"
          :router="is"
        >
          <el-submenu :index="'' + item.id" v-for="item in list" :key="item.id">
            <template slot="title">
              <i :class="ico[item.order]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'' + itm.id"
              v-for="itm in item.children"
              :key="itm.id"
              :route="{ path: '/home/' + itm.path }"
              >{{ itm.authName }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import http from "../http/http.js";
export default {
  props: {},
  data() {
    return {
      ico:['','el-icon-user-solid','el-icon-bangzhu','el-icon-shopping-bag-1','el-icon-notebook-2','el-icon-pie-chart'],
      list: [],
      isover: true,
      is: true,
    };
  },
  mounted() {
    http({
      url: "menus",
    }).then((res) => {
      this.list = res.data;
    });
  },
  methods: {},
  components: {},
};
</script>

<style scoped lang="scss">
.el-container {
  width: 100%;
  height: 100%;
  .el-header {
    background-color: #373d41;
    font-size: 20px;
    color: #fff;
    height: 80px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      width: 70px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      background-color: #ccc;
      border: none;
      border-radius: 5px;
    }
  }
  .el-aside {
    overflow: hidden;
    background-color: #333744;
    width: 250px !important;
    .san {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      color: #fff;
      background-color: #4a5064;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.el-menu-vertical-demo {
  width: 250px;
}
</style>
