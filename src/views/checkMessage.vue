<template>
  <div style="padding: 10px;width: 100%" >


<!--    搜索区-->
<!--    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search"></el-input>
      <el-input style="width: 200px" placeholder="请输入邮箱" suffix-icon="el-icon-message" class="ml-5"></el-input>
      <el-input style="width: 200px" placeholder="请输入地址" suffix-icon="el-icon-position" class="ml-5"></el-input>
      <el-button class="ml-5" type="primary">搜索</el-button>
    </div>-->

    <div style="margin: 10px">
      <el-input v-model="search" placeholder="请输入查询信息" style="width:200px" clearable/>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
    </div>






    <el-table :data="tableData" border stripe  style="width: 100%" >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="elderly_id" label="老人ID" width="80"/>
      <el-table-column prop="speech" label="发言" />
      <el-table-column prop="answer" label="回答" />

    </el-table>

    <div style="margin: 10px">
    <el-pagination
        v-model:current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
    </div>


  </div>
</template>

<script>




import request from "@/utils/request";

export default {
  name: 'HomeView',
  components: {

  },
  data(){
    return {
      form:{},
      dialogVisible:false,
      dialogDescription:false,
      Description:'',
      total:10,
      currentPage:1,
      pageSize:5,
      search:'',
      tableData:[],
      systemUser:{},
    }
    },
  created() {
    this.load()
  },
  methods:{
    load(){
       request.get("http://192.168.54.31:5000/query2", {
         params:{
           pageNum:this.currentPage,
           pageSize:this.pageSize,
           search:this.search
         }
       }).then(res=>{
          console.log(res)
         this.tableData=res.events
         this.total=res.pagination.total
       })
    },


    add(){
      this.dialogVisible=true
      this.form={}
    },


    Repair(){
      console.log(this.form);
      request.post("/sysUser/repair",this.form,{  params:{
          Description:this.Description,
        }}).then(res=>{
        this.$message({
          type:"success",
          message:"已加入检修队列"
        })
        this.dialogDescription=false
        this.load()
      })

    },
    handleEdit(row){
      this.form=JSON.parse(JSON.stringify(row))
      this.dialogVisible=true
    },
    handleRepair(row){
      this.dialogDescription=true
      this.form=row;
    },
    handleSizeChange(pageSize){
      this.pageSize=pageSize;
      this.load()
    },
    handleCurrentChange(pageNum){
      this.currentPage=pageNum;
      this.load()
    },
    handleDelete(id){
      console.log(id)
      request.delete("/sysUser/"+id).then(res=>{
        if(res.code==='0')
        {
          this.$message({
            type:"success",
            message:"删除成功"
          })
        }
        else {
          this.$message({
            type:"error",
            message: res.msg
          })
        }
        this.load()
      })
    },
  }
}
</script>


<style>
.headerBg {
  background: #eee!important;
}
</style>
