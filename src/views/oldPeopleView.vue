<template>
  <div class="home">
    <div id="myChart" :style="{width: '700px', height: '700px'}"></div>
  </div>
  <div class="home">
    <div id="chart" :style="{width: '700px', height: '700px', position: 'right'}"></div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: 'oldPeopleView',
  data(){
    return{
      data: [
        {name: 'Search Engine', value: 1048},
      ],
      data2: [
        {name:'', value:0}
      ],
      sum:[],
    }
  },
  mounted() {

    request.get("/file/echart", {
    }).then(res=>{
      const sum = res.data;
      console.log(sum)
      this.drawBar(sum)
    })
    request.get('http://localhost:8081/older').then((res) => {
      let old = res.data.records
      let data = []
      let oldAge = ['61-70岁', '71-80岁', '81-90岁', '91-100岁']
      let ageNum = [0, 0, 0, 0]

      for (let i = 0;i < old.length;i++){
        if(old[i].age > 60 && old[i].age <= 70){
          ageNum[0]++
        }
        if(old[i].age > 70 && old[i].age <= 80){
          ageNum[1]++
        }
        if(old[i].age > 80 && old[i].age <= 90){
          ageNum[2]++
        }
        if(old[i].age > 90 && old[i].age <= 100){
          ageNum[3]++
        }

      }

      for (let i = 0;i < old.length;i++){
        let d = {ageRange:'', ageCount: 0}
        d.name = oldAge[i]
        d.value = ageNum[i]
        data.push(d)
      }

      //data.sort((a , b) => b.value - a.value)
      this.data = data
      console.log(this.data)
      this.draw()
    }).catch((err) => {
      console.log(err)
      alert('检查后端接口')
    })

  },
  methods: {
    draw() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))

      // 绘制图表
      myChart.setOption({
        // options配置项
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data:this.data
          }
        ]
      })
    },
    drawBar(sum) {



      //   // 基于准备好的dom，初始化echarts实例
       let myChart = this.$echarts.init(document.getElementById('chart'))

       // 绘制图表
       myChart.setOption({
        xAxis: {
           type: 'category',
           data: ['义工', '老人', '员工', '管理员']
         },
         yAxis: {
           type: 'value'
         },
         series: [
           {
             data: sum,
              type: 'bar',
             emphasis: { label: { show: true ,position:'top'} },
             itemStyle: {
               color: 'lightblue' // 将颜色设置为蓝色
             }
           },
        ]
       })
     }
  }
}
</script>
