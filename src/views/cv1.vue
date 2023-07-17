
<template>
  <div>
    <div class="video">
      <img :src=src  width="1000" height="800" style="margin-left: 500px;margin-top: 100px"/>
    </div>
  </div>
</template>






<script >
import request from "@/utils/request";
import axios from "axios";

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

    setTimeout(() => {
      this.load();
    }, 2000);
  },
  mounted(){
  },
  methods:{

    load(){
      this.postData.param1=1
      request.post("http://192.168.54.196:5000/video_feed", this.postData).then(res => {
        console.log(res)
        this.$message({
          type:"success",
          message:"0发送成功"
        })
      })

    },
    load2(){
      request.post("http://192.168.54.196:5000/video_feed4", this.postData).then(res => {
        console.log(res)
        this.$message({
          type:"success",
          message:"1发送成功"
        })
      })
      request.post("http://192.168.54.196:5000/video_feed3", this.postData).then(res => {
        console.log(res)
        this.$message({
          type:"success",
          message:"0发送成功"
        })
      })
      request.post("http://192.168.54.196:5000/video_feed2", this.postData).then(res => {
        console.log(res)
        this.$message({
          type:"success",
          message:"0发送成功"
        })
      })
      request.post("http://192.168.54.196:5000/video_feed5", this.postData).then(res => {
        console.log(res)
        this.$message({
          type:"success",
          message:"0发送成功"
        })
      })
    },

  },


}

</script>


<style scoped>

</style>