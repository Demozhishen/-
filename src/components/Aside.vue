<template>
  <div>
    <el-menu
        :default-active= "path"
        router
        class="el-menu-vertical-demo"
        style="min-height: calc(100vh - 50px)"
    >

<!--      <div v-for="item in menu" :key="item.id">
        <div v-if="!item.path">
          <el-sub-menu :index="item.id+''">
            <template #title>

              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group >
              <div v-for="subitem in item.children">
              <el-menu-item :index="subitem.path">{{ subitem.name }}</el-menu-item>
              </div>
            </el-menu-item-group>
          </el-sub-menu>
        </div>

      </div>-->


      <el-sub-menu index="1">
        <template #title>
          <el-icon><user/></el-icon>
          <span>个人中心</span>
        </template>
        <el-menu-item-group >
          <el-menu-item index="/home" >
            <el-icon><HomeFilled /></el-icon>
            <span>主页</span>
          </el-menu-item>
          <el-menu-item index="/sysUser">
            <el-icon><UserFilled /></el-icon>
            <span>管理员信息</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-sub-menu index="2">
        <template #title>
          <el-icon><Bicycle /></el-icon>
          <span>信息管理</span>
        </template>
        <el-menu-item-group >
          <el-menu-item index="/oldPersonInfo" >
            <el-icon><Place /></el-icon>
            <span>老人信息管理</span>
          </el-menu-item>
          <el-menu-item index="/employeeInfo" >
            <el-icon><Coordinate /></el-icon>
            <span>员工信息管理</span>
          </el-menu-item>
          <el-menu-item index="/volunteerInfo">
            <el-icon><Timer /></el-icon>
            <span>义工信息管理</span>
          </el-menu-item>
        </el-menu-item-group>

      </el-sub-menu>

      <el-sub-menu index="3">
        <template #title>
          <el-icon><location /></el-icon>
          <span>事件管理</span>
        </template>
        <el-menu-item-group >
          <el-menu-item index="/eventInfo" >
            <el-icon><Promotion /></el-icon>
            <span>事件信息</span>
          </el-menu-item>

        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  User,
  UserFilled,
} from '@element-plus/icons-vue'
import {
  AddLocation,
  Bicycle,
  Coordinate,
  Guide,
  HomeFilled,
  Place,
  Promotion,
  SortUp,
  Timer
} from "@element-plus/icons";




export default {
  name: "Aside",
  components:{
    SortUp,
    UserFilled,
    Setting,
    IconMenu,
    Location,
    Document,
    User,
    Bicycle,
    Place,
    Coordinate,
    Timer,
    Guide,
    AddLocation,
    HomeFilled,
    Promotion,
  },
  data(){
    return{
      path:this.$route.path,
      //menu:localStorage.getItem("menu") ? JSON.parse(localStorage.getItem("menu")) : [],
    }
  }
}
</script>

<style scoped>

</style>