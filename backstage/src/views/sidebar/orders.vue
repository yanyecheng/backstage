<template>
  <div>
    <p>首页>订单管理>订单列表</p>
    <div>
      <el-input placeholder="请输入内容" class="input-with-select">
        <el-button
          slot="append"
          icon="el-icon-search"
          class="ipt_btn"
        ></el-button>
      </el-input>

      <el-table style="width: 100%" border :data="tableData" resizable="true">
        <el-table-column label="#" width="50" type="index"> </el-table-column>

        <el-table-column label="订单编号" width="300" prop="order_number">
        </el-table-column>

        <el-table-column label="订单价格" width="130" prop="order_price">
        </el-table-column>

        <el-table-column label="是否付款" width="180" prop="pay_status">
          <el-button type="danger" plain v-if="tableData.pay_status == '0'"
            >未付款</el-button
          >
          <el-button type="primary" plain v-else>已付款</el-button>
        </el-table-column>

        <el-table-column label="是否发货" width="180" prop="is_send">
        </el-table-column>

        <el-table-column label="下单时间" width="180" prop="update_time">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="order_price">
            <!-- 修改地址 -->
            <el-button type="primary" size="mini" @click="change"
              ><i class="el-icon-edit"></i
            ></el-button>
            <!-- 物流信息 -->
            <el-button type="success" size="mini" @click="logistics"
              ><i class="el-icon-location"></i
            ></el-button>

            <!-- 订单详情 -->
            <el-button
              type="success"
              size="mini"
              @click="amend(order_price.row)"
              >订单详情</el-button
            >
            <!-- 修改订单状态 -->
            <el-button type="success" size="mini" @click="cord(order_price)"
              >修改订单状态</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100"
        @size-change="fy"
        @current-change="gs"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pgs"
      >
      </el-pagination>
    </div>
    <!-- 修改地址 -->
    <el-dialog title="收货地址" :visible.sync="chang">
      <el-form>
        <el-form-item label="省市区/县" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="chang = false">取 消</el-button>
        <el-button type="primary" @click="chang = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 物流管理 -->
    <el-dialog title="物流管理" :visible.sync="logistic"> </el-dialog>
    <!-- 订单详情弹出框 -->
    <el-dialog title="订单详情" :visible.sync="dialogVisible" width="30%">
      <span> </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改订单状态弹出框 -->
    <el-dialog title="收货地址" :visible.sync="cor">
      <el-form :model="form">
        <el-form-item label="订单 ID" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单是否发货" :label-width="formLabelWidth">
          <el-input v-model="form.is_send" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单支付" :label-width="formLabelWidth">
          <el-input v-model="form.order_pay" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单价格" :label-width="formLabelWidth">
          <el-input v-model="form.order_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单数量" :label-width="formLabelWidth">
          <el-input v-model="form.order_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付状态" :label-width="formLabelWidth">
          <el-input v-model="form.pay_status" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cord_cancel">取 消</el-button>
        <el-button type="primary" @click="corde_confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import http from "../../http/http.js";
export default {
  props: {},
  data() {
    return {
      tableData: [],
      kuaidi: [],
      orderid: "",
      dialogVisible: false,
      chang: false,
      cor: false,
      logistic: false,
      pgn: 1,
      pgs: 10,

      form: {
        delivery: false,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    // 分页
    fy(asd) {
      console.log(asd);
      this.pgs=asd;
    },
    gs(zxc) {
      console.log(zxc);
      this.pgn=zxc;
      http({
        url: "/orders",
        params: {
          pagenum: this.pgn,
          pagesize: this.pgs,
        },
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.goods;
        // console.log(this.tableData);
      });
    },

    // 修改地址
    change() {
      this.chang = true;
    },
    // 物流信息
    logistics() {
      http({
        url: `/kuaidi/1106975712662`,
      }).then((res) => {
        console.log(res);
        this.kuaidi = res.data;
        this.logistic = true;
      });
    },

    // 订单详情
    amend(row) {
      http({
        url: `/orders/${row.order_id}`,
      }).then((res) => {
        console.log(res);
        this.dialogVisible = true;
      });
    },
    // 修改订单状态
    // 弹窗
    cord(row) {
      this.cor = true;
      console.log(row);
      console.log((this.orderid = row.row.order_id));
      this.orderid = row.row;
    },
    // 修改状态取消
    cord_cancel() {
      this.cor = false;
    },
    // 修改状态确定
    corde_confirm() {
      http({
        url: `/orders/${this.orderid.order_id}`,
        method: "put",
        data: {
          order_pay: this.form.order_pay,
          is_send: this.form.is_send,
          order_price: this.form.order_price,
          order_number: this.form.order_number,
          pay_status: this.form.pay_status,
        },
      }).then((res) => {
        console.log(res);
        http({
          url: "/orders",
          params: {
            pagenum: 1,
            pagesize: 5,
          },
        }).then((res) => {
          console.log(res);
          this.tableData = res.data.goods;
          console.log(this.tableData);
        });
      });
    },
  },
  mounted() {
    http({
      url: "/orders",
      params: {
        pagenum: this.pgn,
        pagesize: this.pgs,
      },
    }).then((res) => {
      console.log(res);
      this.tableData = res.data.goods;
      console.log(this.tableData);
    });
  },
  components: {},
};
</script>

<style scoped lang="scss">
.input-with-select {
  width: 350px;
  margin: 20px 0;
}
</style>
