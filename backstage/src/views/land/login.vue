<template>
  <div class="box">
    <div class="login">
      <div class="ico"><img src="@/assets/img/ico.webp" alt="" /></div>
      <el-input
        placeholder=""
        prefix-icon="el-icon-user-solid"
        v-model="input1"
      >
      </el-input>
      <el-input placeholder="" prefix-icon="el-icon-lock" v-model="input2">
      </el-input>
      <div class="button">
        <button @click="Login">登陆</button>
        <button class="reset">重置</button>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http/http";
export default {
  props: {},
  data() {
    return {
      input1: "",
      input2: "",
    };
  },
  methods: {
    Login() {
      http({
        url: "/login",
        method: "post",
        data: {
          username: this.input1,
          password: this.input2,
        },
      }).then((res) => {
        if (res.data != null) {
          sessionStorage.setItem("token", res.data.token);
          this.$message({
            message: res.meta.msg,
            type: "success",
            duration: 1000,
            customClass: "icoo",
            onClose: () => {
              this.$router.push("/home");
            },
          });
        } else {
          this.$message({
            type: "error",
            message: res.meta.msg,
            duration: 1000,
            customClass: "icoo",
          });
        }
      });
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100vh;
  background-color: rgb(43, 75, 107);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  .login {
    width: 50%;
    height: 300px;
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    position: relative;
    .ico {
      width: 150px;
      height: 150px;
      padding: 22px;
      background-color: #fff;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: -80px;
      transform: translateX(-50%);
      overflow: hidden;
      border: 1px solid #efefef;
      box-shadow: 1px 1px 0 0 #efefef;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .el-input {
      margin-top: 45px;
    }
    .button {
      width: 100%;
      height: 40px;
      .reset {
        background-color: #909399;
      }
      button {
        float: right;
        width: 70px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin-left: 20px;
        border: none;
        border-radius: 5px;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
}
</style>
