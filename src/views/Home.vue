<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-header style="padding: 0px"><HeadBar></HeadBar></el-header>
      <el-container>
        <el-aside class="aside"><NavBar> </NavBar></el-aside>
        <el-main style="padding: 20px 40px"
          ><MainContent> </MainContent
        ></el-main>
      </el-container>
    </el-container>
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

<style>
.aside {
  width: 200px !important;
  height: calc(100vh - 100px);
}
</style>
