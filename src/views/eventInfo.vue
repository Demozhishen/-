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
      <el-input v-model="search" placeholder="请输入事件信息" style="width:200px" clearable/>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
    </div>


    <!--    功能区-->


    <div style="margin: 10px">
<!--      <el-button type="danger">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      <el-button type="primary">导入 <i class="el-icon-bottom"></i></el-button>-->

    </div>

<!--    搜索区-->



    <el-table :data="tableData" border stripe  style="width: 100%" >
      <el-table-column prop="id" label="事件id" sortable width="110" />
      <el-table-column  label="图像" width="140">
        <template #default="scope">
          <div class="block">
            <el-avatar shape="square" :size="60" :src="scope.row.img" />
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="event_type" label="事件类型"  />
      <el-table-column prop="event_date" label="事件发生的时间" />

      <el-table-column prop="event_location" label="事件发生的地点"   />
      <el-table-column prop="event_desc" label="事件描述"   />
      <el-table-column prop="oldperson_id" label="老人ID" />
      <el-table-column fixed="right" label="Operations" >
        <template #default="scope">
        <el-button type="success" @click="handleEdit(scope.row.img)" round>查看</el-button>
        </template>
      </el-table-column>
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
    <el-dialog v-model="dialogVisible" max-width="500px">
      <!-- 图片组件 -->
      <el-image :src="src" style="height: 500px"></el-image>
    </el-dialog>



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
      preview: false,
      src:"",
    }
    },
  created() {
    this.load()
  },
  methods:{
    load(){
       request.get("http://192.168.54.196:5000/event2", {
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

    exp(){
      window.open("http://localhost:8081/eventInfo/export")
    },

    add(){
      this.dialogVisible=true
      this.form={}
    },
    save(){
      console.log(this.form.id)
      if(this.form.id)
      {
        request.put("/eventInfo",this.form).then(res=>{

          if(res.code==='0')
          {
            this.$message({
              type:"success",
              message:"修改成功"
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
      }else
        {
          request.post("/eventInfo", this.form,{
            params:{
              search:this.search
            }}).then(res => {
            console.log(res)
            this.$message({
              type:"success",
              message:"新增成功"
            })
            this.load();
          })
        }

      this.dialogVisible=false
    },

    Repair(){
      console.log(this.form);
      request.post("/eventInfo/repair",this.form,{  params:{
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
      this.src=row
      /*this.form=JSON.parse(JSON.stringify(row))*/
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
      request.delete("/eventInfo/"+id).then(res=>{
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
