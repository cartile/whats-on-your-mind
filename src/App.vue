<template>
    <Navbar v-if="!isLoginOrRegister"/>
    <div id="app-container" :class="{'full-screen': isLoginOrRegister}">
      <router-view/>
    </div>
    <AppFooter v-if="!isLoginOrRegister"/>
</template>

<script>
  import Navbar from '@/components/NavBar.vue'
  import AppFooter from '@/components/AppFooter.vue'
  
  export default {
    name: 'app',
    components: {
      Navbar,
      AppFooter
    },
    beforeCreate() {
      this.$store.dispatch('authenticate');
    },
    computed: {
      isLoginOrRegister() {
        return this.$route.name === "login" || this.$route.name === "register";
      }
    }
}
</script>
