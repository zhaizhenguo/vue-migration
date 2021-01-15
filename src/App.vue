<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      input: "",
    };
  },
  created() {},
  sockets: {
    connect: function () {
      console.log("socket connected");
      //this.$socket.emit('login', 'socket connectedxxxx');
    },
    msginfo: function (data) {
      console.log("client: " + data);
    },
  },
};
</script>

<style></style>
