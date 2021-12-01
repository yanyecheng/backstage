<template>
  <div class="box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="box-bot">
      <el-input placeholder="请输入内容" v-model="input1" class="inp_" />
      <el-button
        type="primary"
        class="but_ el-icon-search"
        @click="search"
      ></el-button>
      <el-button type="primary" @click="mb = true">添加用户</el-button>

      <el-dialog
        title="添加用户"
        :visible.sync="mb"
        width="40%"
        :before-close="handleClose"
      >
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="user">
            <el-input
              type="text"
              v-model="ruleForm.user"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="mailbox">
            <el-input
              type="text"
              v-model="ruleForm.mailbox"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="手机" prop="phone">
            <el-input
              type="text"
              v-model="ruleForm.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="mb = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </span>
      </el-dialog>

      <el-table :data="list" style="width: 100%">
        <el-table-column label="#" width="50">
          <template slot-scope="list">
            <span style="margin-left: 10px">{{ list.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="list">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ list.row.username }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="邮箱">
          <template slot-scope="list">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ list.row.email }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="电话">
          <template slot-scope="list">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ list.row.mobile }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template slot-scope="list">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ list.row.role_name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="list">
            <el-switch
              v-model="list.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="change(list.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              class="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-dialog
              title="修改用户"
              :visible.sync="xiu"
              width="40%"
              :before-close="handleCloses"
            >
              <div class="mb-div">
                <span>用户名：</span>
                <el-input v-model="yhm" :disabled="true"> </el-input>
              </div>
              <div class="mb-div">
                <span>邮箱：</span>
                <el-input placeholder="请输入邮箱" v-model="yx" clearable>
                </el-input>
              </div>
              <div class="mb-div">
                <span>手机：</span>
                <el-input placeholder="请输入手机号" v-model="sj" clearable>
                </el-input>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="xiu = false">取 消</el-button>
                <el-button type="primary" @click="xiug">确 定</el-button>
              </span>
            </el-dialog>
            <el-button
              class="el-icon-delete-solid"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="warning"
              class="el-icon-s-help"
              @click="jurisdiction(scope.$index, scope.row)"
            ></el-button>
            <el-dialog
              title="分配角色"
              :visible.sync="fp"
              width="40%"
              :before-close="handleCloses"
            >
              <div class="mb-div">
                <span>当前的用户名：{{ yhm }}</span>
              </div>
              <div class="mb-div">
                <span>当前的角色：</span>
              </div>
              <div class="mb-div">
                <span>手机：</span>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="fp = false">取 消</el-button>
                <el-button type="primary" @click="fp = false">确 定</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 1, 2, 3, 4]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="zs"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http/http.js";
export default {
  props: {},
  data() {
    var User = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var Mailbox = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var Phone = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("请输入手机号"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      fp: false,
      name: [],
      id_: null,
      sj: null,
      yx: "",
      yhm: "",
      xiu: false,
      mb: false,
      list: [],
      input1: "",
      zs: 0,
      my: 5,
      dqy: 1,
      ruleForm: {
        pass: "",
        user: "",
        mailbox: "",
        phone: null,
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        user: [{ validator: User, trigger: "blur" }],
        mailbox: [{ validator: Mailbox, trigger: "blur" }],
        phone: [{ validator: Phone, trigger: "blur" }],
      },
    };
  },
  methods: {
    search() {
      http({
        url: "/users",
        params: {
          pagenum: 1,
          pagesize: this.zs,
        },
      }).then((res) => {
        for (let i = 0; i < res.data.users.length; i++) {
          this.name.push(res.data.users[i].username);
        }
        console.log(this.name);
        var index = this.name.indexOf(this.input1);
        console.log(index);
        if (index == -1) {
          this.$message.error("暂没有查到当前用户名");
          this.name = [];
        } else {
          http({
            url: `users/${res.data.users[index].id}`,
          }).then((res) => {
            console.log(res);
            this.list = [];
            this.list.push(res.data);
            this.name = [];
          });
        }
      });
    },
    xiug() {
      console.log(this.id_);
      this.xiu = false;
      http({
        url: `users/${this.id_}`,
        method: "put",
        data: {
          email: this.yx,
          mobile: this.sj,
        },
      }).then((res) => {
        console.log(res);
        this.$message({
          message: res.meta.msg,
          type: "success",
        });
        http({
          url: "/users",
          params: {
            pagenum: this.dqy,
            pagesize: this.my,
          },
        }).then((res) => {
          this.list = res.data.users;
          this.zs = res.data.total;
        });
      });
    },
    change(v) {
      console.log(v);
      http({
        url: `/users/${v.id}/state/${v.mg_state}`,
        method: "put",
      }).then((res) => {
        console.log(res);
        this.$message({
          message: res.meta.msg,
          type: "success",
        });
      });
    },
    add() {
      http({
        url: "/users",
        method: "post",
        data: {
          username: this.ruleForm.user,
          password: this.ruleForm.user,
          email: this.ruleForm.mailbox,
          mobile: this.ruleForm.phone,
        },
      }).then((res) => {
        if (res.data != null) {
          this.mb = false;
          this.$message({
            message: "添加成功",
            type: "success",
          });
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.my = val;
      http({
        url: "/users",
        params: {
          pagenum: this.dqy,
          pagesize: val,
        },
      }).then((res) => {
        this.list = res.data.users;
      });
    },
    handleCurrentChange(val) {
      this.dqy = val;
      console.log(`当前页: ${val}`);
      http({
        url: "/users",
        params: {
          pagenum: val,
          pagesize: this.my,
        },
      }).then((res) => {
        console.log(res);
        this.list = res.data.users;
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.xiu = true;
      this.yhm = row.username;
      this.yx = row.email;
      this.sj = row.mobile;
      this.id_ = row.id;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row.id);
          http({
            url: `users/${row.id}`,
            method: "delete",
          }).then((res) => {
            this.$message({
              type: "success",
              message: res.meta.msg,
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    jurisdiction(index, row) {
      console.log(index, row);
      this.fp = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((res) => {
          console.log(res);
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCloses(done) {
      this.$confirm("确认关闭？")
        .then((res) => {
          console.log(res);
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    http({
      url: "/users",
      params: {
        pagenum: 1,
        pagesize: 5,
      },
    }).then((res) => {
      console.log(res);
      this.list = res.data.users;
      this.zs = res.data.total;
    });
  },
  components: {},
};
</script>

<style scoped lang="scss">
.el-button--danger {
  margin-left: 10px;
}
.mb-div {
  display: flex;
  margin-top: 20px;
  div {
    padding-left: 10px;
  }
  span {
    display: block;
    width: 70px;
    text-align: right;
    line-height: 40px;
  }
}
.inp_ {
  width: 250px;
  margin-right: 20px;
  margin-bottom: 20px;
  position: relative;
  .but_ {
    position: absolute;
    right: 0;
    font-size: 14px;
  }
}
.box-bot {
  width: 100%;
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
}
.cell {
  flex: 1;
}
.call:nth-child(1) {
  width: 50px;
}
.box {
  width: 100%;
  height: 100%;
  background-color: #eaedf1;
  padding: 0 20px;
  > p {
    font-size: 14px;
    color: #ccc;
    .xz {
      color: #000;
    }
    span {
      color: #736e6b;
      font-size: 14px;
    }
  }
}
</style>
