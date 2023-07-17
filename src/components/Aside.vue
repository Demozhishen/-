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
          <el-icon><VideoCamera /></el-icon>
          <span>监控中心</span>
        </template>
        <el-menu-item-group >
          <el-menu-item index="/cv1" >
            <el-icon><CameraFilled /></el-icon>
            <span>摄像头</span>
          </el-menu-item>

          <el-menu-item index="/cv2" >
            <el-icon><CameraFilled /></el-icon>
            <span>禁区闯入检测</span>
          </el-menu-item>
          <el-menu-item index="/cv3" >
            <el-icon><CameraFilled /></el-icon>
            <span>老人房间检测</span>
          </el-menu-item>
          <el-menu-item index="/cv4" >
          <el-icon><CameraFilled /></el-icon>
          <span>交互检测</span>
        </el-menu-item>
          <el-menu-item index="/cv5" >
          <el-icon><CameraFilled /></el-icon>
          <span>摔倒检测</span>
        </el-menu-item>
          <el-menu-item index="/face" >
            <el-icon><CameraFilled /></el-icon>
            <span>人脸采集</span>
          </el-menu-item>

          \
        </el-menu-item-group>
      </el-sub-menu>

      <el-sub-menu index="2">
        <template #title>
          <el-icon><Document /></el-icon>
          <span>信息管理</span>
        </template>
        <el-menu-item-group >
          <el-menu-item index="/sysUser">
            <el-icon><UserFilled /></el-icon>
            <span>管理员信息</span>
          </el-menu-item>
          <el-menu-item index="/oldPersonInfo" >
            <el-icon><Notebook /></el-icon>
            <span>老人信息管理</span>
          </el-menu-item>
          <el-menu-item index="/employeeInfo" >
            <el-icon><ScaleToOriginal /></el-icon>
            <span>员工信息管理</span>
          </el-menu-item>
          <el-menu-item index="/volunteerInfo">
            <el-icon><Postcard /></el-icon>
            <span>义工信息管理</span>
          </el-menu-item>
        </el-menu-item-group>

      </el-sub-menu>

      <el-sub-menu index="3">
        <template #title>
          <el-icon><List /></el-icon>
          <span>事件管理</span>
        </template>
        <el-menu-item-group >
          <el-menu-item index="/eventInfo" >
            <el-icon><Reading /></el-icon>
            <span>事件信息</span>
          </el-menu-item>

        </el-menu-item-group>
      </el-sub-menu>

      <el-sub-menu index="4">
        <template #title>
          <el-icon><TrendCharts /></el-icon>
          <span>统计信息</span>
        </template>
        <el-menu-item-group >
          <el-menu-item index="/oldPeopleView" style="text-align: center">
            <el-icon><CircleCheck /></el-icon>
            <span>老人信息统计</span>
          </el-menu-item>
          <el-menu-item index="/check" style="text-align: center">
            <el-icon><Check /></el-icon>
            <span>信息监测</span>
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
  VideoCamera,
  TrendCharts,
  Check

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
  Timer,
  CameraFilled,
  Notebook,
  ScaleToOriginal,
  Postcard,
  List,
  Reading,
  CircleCheck
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
    CameraFilled,
    Notebook,
    ScaleToOriginal,
    Postcard,
    List,
    Reading,
    VideoCamera,
    TrendCharts,
    Check,
    CircleCheck
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