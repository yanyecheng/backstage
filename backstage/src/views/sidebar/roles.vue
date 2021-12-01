<template>
  <div class="box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="box-bot">
      <el-button type="primary" class="add" @click="add_js">添加角色</el-button>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-input
          v-model="input"
          placeholder="请输入角色名称"
          class="mb-in"
        ></el-input>
        <el-input
          v-model="input1"
          placeholder="请输入角色描述"
          class="mb-in"
        ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="yes">确 定</el-button>
        </span>
      </el-dialog>

      <el-table :data="list" style="width: 100%" :border="br">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="item1 in scope.row.children"
              :key="item1.id"
              class="centerRow"
            >
              <el-col :span="5">
                <el-tag closable>{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 还剩余 19 列，分配给二三级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="item2 in item1.children"
                  :key="item2.id"
                  class="centerRow"
                >
                  <el-col :span="6">
                    <el-tag closable type="success">{{
                      item2.authName
                    }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 还剩余 19 列，分配给二三级权限 -->
                  <el-col :span="18">
                    <el-row
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      class="centerRow"
                    >
                      <el-col :span="5">
                        <el-tag closable type="warning">{{
                          item3.authName
                        }}</el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <!-- 还剩余 19 列，分配给二三级权限 -->
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" width="50">
          <template slot-scope="list">
            <span style="margin-left: 10px">{{ list.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色名称">
          <template slot-scope="list">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ list.row.roleName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="角色描述">
          <template slot-scope="list">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ list.row.roleDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="list">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="dialogVisibles = true"
              >编辑</el-button
            >
            <el-dialog
              title="修改角色"
              :visible.sync="dialogVisibles"
              width="40%"
              :before-close="handleCloses"
            >
              <el-input
                placeholder="修改后的角色名"
                v-model="input2"
                clearable
                class="mb-in"
              >
              </el-input>
              <el-input
                placeholder="修改后的描述"
                v-model="input3"
                clearable
                class="mb-in"
              >
              </el-input>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibles = false">取 消</el-button>
                <el-button type="primary" @click="bj(list.row)"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="err(list.row)"
              >删除</el-button
            >

            <el-button
              type="warning"
              size="small"
              icon="el-icon-help"
              @click="qxlb(list.row)"
              >分配权限</el-button
            >
            <el-dialog
              title="权限分配"
              :visible.sync="dialogVisibled"
              width="30%"
              :before-close="handleClosed"
            >
              <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                :props="defaultProps"
                :default-expand-all = brz
                :default-checked-keys = list_num
              >
              </el-tree>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibled = false">取 消</el-button>
                <el-button type="primary" @click="fp(list.row)"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import http from "../../http/http.js";
export default {
  props: {},
  data() {
    return {
      list_num:[],
      brz:true,
      input: "",
      input1: "",
      input2: "",
      input3: "",
      br: true,
      list: [],
      dialogVisible: false,
      dialogVisibles: false,
      dialogVisibled: false,
      data: [],
      defaultProps: {
        children: "children",
        label: "authName",
      },
    };
  },
  methods: {
    qxlb(v){
      this.dialogVisibled = true
      this.list_num = []
      for(let i = 0 ; i < v.children.length ; i++){
        for(let s = 0 ; s < v.children[i].children.length ; s++){
          for(let b = 0 ; b < v.children[i].children[s].children.length ; b++){
            this.list_num.push(v.children[i].children[s].children[b].id)
            console.log(this.list_num);
          }
        }
      }
      console.log(v);
      http({
        url:'rights/tree'
      }).then((res)=>{
        console.log(res);
        this.data = res.data
      })
    },
    fp(v) {
      console.log(v);
      // http({
      //   url: "roles/:roleId/rights",
      //   method: "post",
      // });
    },
    bj(v) {
      http({
        url: `roles/${v.id}`,
        method: "put",
        data: {
          roleName: this.input2,
          roleDesc: this.input3,
        },
      }).then((res) => {
        console.log(res);
        if (res.data == null) {
          this.$message({
            showClose: true,
            type: "error",
            message: res.meta.msg,
          });
        } else {
          this.dialogVisibles = false;
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
        }
      });
    },
    err(v) {
      console.log(v);
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          http({
            url: `roles/${v.id}`,
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
    yes() {
      this.dialogVisible = true;
      http({
        url: "/roles",
        method: "post",
        data: {
          roleName: this.input,
          roleDesc: this.input1,
        },
      }).then((res) => {
        console.log(res);
        if (res.data == null) {
          this.$message({
            showClose: true,
            type: "error",
            message: res.meta.msg,
          });
        } else {
          this.dialogVisible = false;
          this.$message({
            showClose: true,
            message: res.meta.msg,
            type: "success",
          });
        }
      });
    },
    add_js() {
      this.dialogVisible = true;
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
    handleClosed(done) {
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
  components: {},
  mounted() {
    http({
      url: "/roles",
    }).then((res) => {
      this.list = res.data;
      console.log(this.list);
    });
  },
};
</script>

<style scoped lang="scss">
.mb-in {
  margin-top: 10px;
}
.el-table_3_column_14 {
  width: 50px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.box {
  width: 100%;
  height: 100%;
  background-color: #eaedf1;
  padding: 0 20px;
  .box-bot {
    margin-top: 20px;
    background-color: #fff;
    padding: 10px;

    .add {
      margin: 10px 0;
    }
  }
}
</style>
