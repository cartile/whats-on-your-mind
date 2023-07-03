<template>
    <Navbar />
    <div id="app-container">
      <router-view/>
    </div>
    <AppFooter />
</template>

<script>
  import Navbar from '@/components/NavBar.vue'
  import AppFooter from '@/components/AppFooter.vue'

  export default {
    name:'app',
    components: {
      Navbar,
      AppFooter
    },
    beforeCreate: function() {
      this.$store.dispatch('authenticate')
    }

  }
</script>
