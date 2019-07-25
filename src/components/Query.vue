<template>
  <div class="query">
    <form @submit.prevent="submitQuery(word)">
    <input v-model="word" placeholder="Search icons. Try postbox,  drink, ..." />
    </form>
  </div>
</template>

<script>
export default {
  name: 'Query',
  data: function () {
    return {
      word: ''
    }
  },
  methods: {
    submitQuery: function (word) { 
      this.$emit('submitquery', word);
      this.word = '';
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.query input {
  background-color: black;
  border: 2px solid white;
  border-radius: 5px;
  color: whitesmoke;
  font-size: 20px;
  font-weight: 100;
  letter-spacing: 2px;
  outline: none;
  opacity: 0.5;
  position: relative;
  padding: 15px 40px 15px 20px;
  width: 400px;
}
input::placeholder {
  color: lightgray;
}
</style>
