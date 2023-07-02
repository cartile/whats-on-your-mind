<template>
    <Navbar />
  <router-view/>
</template>

<script>
  import Navbar from '@/components/NavBar.vue'

  export default {
    name:'app',
    components: {
      Navbar
    }
  }
</script>
