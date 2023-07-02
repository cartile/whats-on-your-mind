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
  }
}
</script>
