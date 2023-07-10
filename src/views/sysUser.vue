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
      <el-input v-model="search" placeholder="请输入用户名" style="width:200px" clearable/>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
    </div>


    <!--    功能区-->


    <div style="margin: 10px;text-align: center">
      <el-button type="primary" @click="add">新增<i class="el-icon-plus"></i></el-button>
<!--      <el-button type="danger">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      <el-button type="primary">导入 <i class="el-icon-bottom"></i></el-button>-->
      <el-button type="primary" @click="exp">导出<i class="el-icon-top"></i></el-button>

    </div>

<!--    搜索区-->



    <el-table :data="tableData" border stripe  style="width: 100%" >
      <el-table-column prop="id" label="系统管理员ID" width="80px" />
      <el-table-column prop="userName" label="用户名" width="110"/>
      <el-table-column prop="password" label="密码" width="150"/>
      <el-table-column prop="realName" label="真实姓名" width="120"/>
      <el-table-column prop="sex" label="性别" width="80"/>
      <el-table-column label="联系方式" width="180">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>电子邮件: {{ scope.row.email }}</div>
              <div>电话号码: {{ scope.row.phone }}</div>
              <div>手机号码: {{ scope.row.mobile }}</div>
            </template>
            <template #reference>
              <el-tag type="info">{{ scope.row.mobile }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="创建者" width="100">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>创建时间: {{ scope.row.created }}</div>
              <div>创建者: {{ scope.row.createBy }}</div>
            </template>
            <template #reference>
              <el-tag type="info">{{ scope.row.createBy }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="更新者" width="100">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>更新时间: {{ scope.row.updated }}</div>
              <div>更新者: {{ scope.row.updateBy }}</div>
            </template>
            <template #reference>
              <el-tag type="info">{{ scope.row.updateBy }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" />
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
        title="系统管理员"
        width="30%"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="系统管理员编号">
          <el-input v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" >
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
          <el-radio v-model="form.sex" label="未知">未知</el-radio>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
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
       request.get("/sysUser", {
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
      window.open("http://localhost:8081/sysUser/export")
    },

    add(){
      this.dialogVisible=true
      this.form={}
    },
    save(){
      this.systemUser=JSON.parse(localStorage.getItem("user"))
      console.log(this.form.id)
      if(this.form.id)
      {
        this.form.updateBy=this.systemUser.id
        request.put("/sysUser",this.form).then(res=>{

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
          this.form.createBy=this.systemUser.id
          request.post("/sysUser", this.form,{
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
