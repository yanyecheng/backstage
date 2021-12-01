<template>
  <div>
    <p>首页>订单管理>订单列表</p>
    <div>
      <el-input
        placeholder="请输入内容"
        
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          class="ipt_btn"
        ></el-button>
      </el-input>

      <el-table  style="width: 100%" border  :data="tableData">
        <el-table-column label="#" width="100" type="index">
        </el-table-column>

        <el-table-column label="订单编号" width="400" prop="order_number">
        </el-table-column>

        <el-table-column label="订单价格" width="180" prop="order_price">
        </el-table-column>



        <el-table-column label="是否付款" width="180" prop="pay_status">
          <el-button type="danger" plain v-if="pay_status='0'">未付款</el-button>
          <el-button type="danger" plain v-else>已付款</el-button>
        </el-table-column>

        
        <el-table-column label="是否发货" width="180" prop="is_send">
        </el-table-column>



        <el-table-column label="下单时间" width="180" prop="">
        </el-table-column>

        <el-table-column label="操作">
          <template>
            <el-button size="mini" @click="handleEdit(tableData.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
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
      tableData:[

      ],

    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  mounted() {
    http({
      url: "/orders",
      params: {
        pagenum: 1,
        pagesize: 5,
      },
    }).then((res) => {
      console.log(res);
      this.tableData=res.data.goods
      console.log(this.tableData)
    });
  } ,
  components: {},
};
</script>

<style scoped lang="scss">
.input-with-select {
  width: 350px;
  margin: 20px 0;
}
</style>
