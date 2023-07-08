<template>
  <div style="padding: 10px;width: 100%" >


<!--    搜索区-->
<!--    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search"></el-input>
      <el-input style="width: 200px" placeholder="请输入邮箱" suffix-icon="el-icon-message" class="ml-5"></el-input>
      <el-input style="width: 200px" placeholder="请输入地址" suffix-icon="el-icon-position" class="ml-5"></el-input>
      <el-button class="ml-5" type="primary">搜索</el-button>
    </div>-->

    <div style="margin: 10px;text-align: center">
      <el-input v-model="search" placeholder="请输入车辆状态" style="width:200px" clearable/>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
    </div>


    <!--    功能区-->


    <div style="margin: 10px;text-align: center">
      <el-button type="primary" @click="add">新增<i class="el-icon-plus"></i></el-button>
<!--      <el-button type="danger">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      <el-button type="primary">导入 <i class="el-icon-bottom"></i></el-button>-->
      <el-button type="primary" @click="exp">导出 <i class="el-icon-top"></i></el-button>

    </div>

<!--    搜索区-->



    <el-table :data="tableData" border stripe  style="width: 100%" >
      <el-table-column prop="id" label="事件id" sortable width="110" />
      <el-table-column prop="eventType" label="事件类型"  />
      <el-table-column prop="eventDate" label="事件发生的时间" />
      <el-table-column prop="eventLocation" label="事件发生的地点"   />
      <el-table-column prop="eventDesc" label="事件描述"   />
      <el-table-column prop="oldpersonId" label="老人ID" />
      <el-table-column fixed="right" label="Operations" >
        <template #default="scope">
        <el-button type="success" @click="handleEdit(scope.row)" round>编辑</el-button>
          <el-popconfirm title="确认删除？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button type="danger" round>删除 </el-button>
            </template>
          </el-popconfirm>
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

    <el-dialog
        v-model="dialogVisible"
        title="事件信息"
        width="30%"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="事件编号">
          <el-input v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="事件类型" >
          <el-input v-model="form.eventType"></el-input>
        </el-form-item>
        <el-form-item label="事件发生的时间">
          <el-input v-model="form.eventDate"></el-input>
        </el-form-item>
        <el-form-item label="事件发生的地点">
          <el-input v-model="form.eventLocation"></el-input>
        </el-form-item>
        <el-form-item label="事件描述">
          <el-input v-model="form.eventDesc"></el-input>
        </el-form-item>
        <el-form-item label="老人ID">
        <el-input v-model="form.oldpersonId"></el-input>
      </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>

    <el-dialog
        v-model="dialogDescription"
        title="检修描述"
        width="30%"
    >
        <el-input
            v-model="Description"
            :rows="2"
            type="textarea"
            placeholder="请描述车辆问题"
        />
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogDescription = false">取消</el-button>
        <el-button type="primary" @click="Repair">
          确认
        </el-button>
      </span>
      </template>
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
      tableData:[]
    }
    },
  created() {
    this.load()
  },
  methods:{
    load(){
       request.get("/eventInfo", {
         params:{
           pageNum:this.currentPage,
           pageSize:this.pageSize,
           search:this.search
         }
       }).then(res=>{

         console.log(res)
         console.log(this.search)
         this.tableData=res.data.records
         this.total=res.data.total
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
