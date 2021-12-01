<template>
  <div>
    <div id="main"></div>
  </div>
</template>

<script>
import http from "../../http/http";
import * as echarts from "echarts";
export default {
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    http({
      url: "/reports/type/1",
    }).then((res) => {
      console.log(res);
      console.log(this.list);
      var option = res.data;
      option.title = {
        text: "用户来源",
      };
       option.tooltip= {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
      option && myChart.setOption(option);
    });
  },
  components: {},
};
</script>

<style scoped lang="scss">
#main {
  width: 100%;
  height: 500px;
}
</style>

