<template>
  <div id="custom-home">
    <MyHome />
  </div>
</template>

<script>
// @ is an alias to /src
import MyHome from '@/components/MyHome.vue'

export default {
  name: 'HomeView',
  components: {
    MyHome
  }, /*
  beforeCreate: function() {
    fetch(this.$store.state.apiUrl + '/user', {
      method:'GET'
    })
    .then(res => console.log(res))
    .then(res => res.json())
    .then(res=> console.log(res))
\
  }
  */
}
</script>
