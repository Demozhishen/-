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
      <el-input v-model="search" placeholder="请输入围栏名称" style="width:200px" clearable/>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
    </div>


    <!--    功能区-->


    <div style="margin: 10px">
      <el-button type="primary" @click="add">新增</el-button>

      <el-button type="primary" @click="exp">导出 <i class="el-icon-top"></i></el-button>

    </div>

    <!--    搜索区-->



    <el-table :data="tableData" border stripe  style="width: 100%" >
      <el-table-column prop="id" label="ID" width="80"/>
      <el-table-column prop="profilePhoto" label="头像">
        <template #default="scope">
          <div class="block">
            <el-avatar shape="square" :size="60" :src="scope.row.profilePhoto" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="老人信息" width="100">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>性别: {{ scope.row.gender }}</div>
              <div>电话号码: {{ scope.row.phone }}</div>
              <div>身份证号码: {{ scope.row.idCard }}</div>
              <div>出生日期: {{ scope.row.birthday }}</div>
            </template>
            <template #reference>
              <el-tag type="info">{{ scope.row.username }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="checkinDate" label="入养老院日期" />
      <el-table-column prop="checkoutDate" label="离开养老院日期" />
      <el-table-column prop="roomNumber" label="房间号" width="80" />
      <el-table-column label="第一监护人" width="100">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>第一监护人姓名: {{ scope.row.firstGuardianName }}</div>
              <div>第一监护人关系: {{ scope.row.firstGuardianRelationship }}</div>
              <div>第一监护人电话: {{ scope.row.firstGuardianPhone }}</div>
              <div>第一监护人微信: {{ scope.row.firstGuardianWechat }}</div>
            </template>
            <template #reference>
              <el-tag type="info">{{ scope.row.firstGuardianName }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="第二监护人" width="100">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>第二监护人姓名: {{ scope.row.secondGuardianName }}</div>
              <div>第二监护人关系: {{ scope.row.secondGuardianRelationship }}</div>
              <div>第二监护人电话: {{ scope.row.secondGuardianPhone }}</div>
              <div>第二监护人微信: {{ scope.row.secondGuardianWechat }}</div>
            </template>
            <template #reference>
              <el-tag type="info">{{ scope.row.secondGuardianName }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="healthState" label="健康状态" width="80"/>
      <el-table-column label="创建者" width="100">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>创建时间: {{ scope.row.created }}</div>
              <div>创建者: {{ scope.row.createdBy }}</div>
            </template>
            <template #reference>
              <el-tag type="info">{{ scope.row.createdBy }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="更新者" width="80">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>更新时间: {{ scope.row.updated }}</div>
              <div>更新者: {{ scope.row.updatedBy }}</div>
            </template>
            <template #reference>
              <el-tag type="info">{{ scope.row.updatedBy }}</el-tag>
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
        title="老人信息"
        width="30%"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="头像">
            <el-upload
                class="avatar-uploader"
                action="http://localhost:8081/file/upload/older"
                :on-success="handleAvatarSuccess">
              <img v-if="form.profilePhoto" :src="form.profilePhoto" class="avatar">
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
        </el-form-item>

        <el-form-item label="老人姓名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio v-model="form.gender" label="男">男</el-radio>
          <el-radio v-model="form.gender" label="女">女</el-radio>
          <el-radio v-model="form.gender" label="未知">未知</el-radio>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="form.idCard"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
              v-model="form.birthday"
              type="datetime"
              placeholder="选择出生日期"
          />
      </el-form-item>
        <el-form-item label="入养老院日期">
          <el-date-picker
              v-model="form.checkinDate"
              type="datetime"
              placeholder="选择出生日期"
          />
        </el-form-item>
        <el-form-item label="离开养老院日期">
          <el-date-picker
              v-model="form.checkoutDate"
              type="datetime"
              placeholder="选择出生日期"
          />
        </el-form-item>

        <el-form-item label="第一监护人" inline="true" >
          <el-input v-model="form.firstGuardianName" placeholder="监护人姓名" style="display:inline"></el-input>
          <el-input v-model="form.firstGuardianRelationship" placeholder="监护人关系" style="display:inline"></el-input>
          <el-input v-model="form.firstGuardianPhone" placeholder="监护人电话" style="display:inline"></el-input>
          <el-input v-model="form.firstGuardianWechat" placeholder="监护人微信" style="display:inline"></el-input>
        </el-form-item>
        <el-form-item label="第二监护人" inline="true">
          <el-input v-model="form.secondGuardianName" placeholder="监护人姓名" style="display:inline"></el-input>
          <el-input v-model="form.secondGuardianRelationship" placeholder="监护人关系" style="display:inline"></el-input>
          <el-input v-model="form.secondGuardianPhone" placeholder="监护人电话" style="display:inline"></el-input>
          <el-input v-model="form.secondGuardianWechat" placeholder="监护人微信" style="display:inline"></el-input>
        </el-form-item>
        <el-form-item label="健康状态">
          <el-input v-model="form.healthState"></el-input>
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
  name: 'staff',
  components: {

  },
  data(){
    return {
      form:{},
      dialogVisible:false,
      total:10,
      currentPage:1,
      pageSize:10,
      search:'',
      tableData:[]
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      request.get("/older", {
        params:{
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          search:this.search
        }
      }).then(res=>{
        console.log(res)
        this.tableData=res.data.records
        this.total=res.data.total
      })
    },

    add(){
      this.dialogVisible=true
      this.form={}
    },
    save(){

      if(this.form.id)
      {
        request.put("/older",this.form).then(res=>{

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
        request.post("/older", this.form).then(res => {
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
  exp(){
      window.open("http://localhost:8002/older/export")
  },
    handleEdit(row){
      this.form=JSON.parse(JSON.stringify(row))
      this.dialogVisible=true
      console.log(this.form.employeeId)
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
      request.delete("/older/"+id).then(res=>{
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
    handleAvatarSuccess(res) {
      if (res.code === '0') {
        console.log(res)
        this.form.profilePhoto = res.data
        this.$message.success("上传成功")
      } else {
        this.$message.error("上传失败")
      }
    }
  }
}
</script>


<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
