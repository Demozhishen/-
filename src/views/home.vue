<template>
  <div>
    <audio ref="audioPlayer" controls>
      <source src="http://127.0.0.1:5000/robot" type="audio/mp3">
      Your browser does not support the audio element.
    </audio>
  </div>
</template>
<script>
export default {
  data() {
    return {
      preview: false,
      src:""
    };
  },
  components: {
  },
  methods: {

    },



};
</script>
<style >
.video{
  margin-left: 100px;
  margin-top: 100px;
}

.container {

  display: flex;
  flex-direction: column;
}

.button {
  margin-bottom: 30px;

}
</style>
