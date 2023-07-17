
<template>
  <div>
    <div class="video">
      <img src="http://192.168.54.196:5000/video_feed3" width="1000" height="800" style="margin-left: 500px;margin-top: 100px" />
    </div>
  </div>
</template>






<script >
import request from "@/utils/request";

export default {
  data() {
    return {
      postData : {
        param1:0,
      },

      src: "http://192.168.54.196:5000/video_feed"
    };
  },
  created(){
    // this.load()

      this.load2();
  },
  mounted(){
  },
  methods:{
    load(){
      request.post("http://192.168.54.196:5000/video_feed2", this.postData).then(res => {
        console.log(res)
        this.$message({
          type:"success",
          message:"0发送成功"
        })
      })


    },
    load2(){
      this.postData.param1=1
      console.log(this.param1)
      request.post("http://192.168.54.196:5000/video_feed3", this.postData).then(res => {
        console.log(res)
        this.$message({
          type:"success",
          message:"1发送成功"
        })
      })
    },

  },

}
</script>


<style scoped>

</style>