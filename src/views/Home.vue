<template>
  <div>
    <el-header><HeadBar></HeadBar></el-header>
    <el-container>
      <el-aside width="200px"><NavBar> </NavBar></el-aside>
      <el-main><MainContent> </MainContent></el-main>
    </el-container>
    <!-- <el-row style="height: 60px"> <HeadBar></HeadBar></el-row>
    <el-row>
      <el-col :span="3">
        <NavBar> </NavBar>
      </el-col>
      <el-col :span="21" style="padding: 20px 0px 0px">
        <MainContent> </MainContent>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import HeadBar from "./HeadBar/HeadBar";
import NavBar from "./NavBar/NavBar";
import MainContent from "./MainContent/MainContent";
export default {
  components: {
    HeadBar: HeadBar,
    NavBar: NavBar,
    MainContent: MainContent,
  },
};
</script>

<style></style>
