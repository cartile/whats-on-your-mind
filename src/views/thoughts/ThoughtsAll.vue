<template>
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
  <div class="d-flex flex-column">
    <div class="mb-4">
    <h1>Thought Wall</h1>
    <router-link to="/thoughts/new" class="btn btn-success ml-2" exact>
      Add a Thought
    </router-link>
  </div>
  <!-- v-if="thoughts && thoughts.length > 0" BELOW-->
  <div class="d-flex flex-wrap justify-content-between">
    <!-- v-for="thought in thoughts" :key="thought._id" BELOW-->
    <v-card 
    class="mx-auto mb-2 ml-2"
    color="#26c6da"
    theme="dark"
    max-width="400"
    title=""
  >
  <v-card-title>food for thought</v-card-title>
  <v-card-subtitle>currentDate</v-card-subtitle>


    <v-card-text class="text-h5 py-2">
      why do baby clothes have pockets they don't even own shit
    </v-card-text>

    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-avatar
            color="grey-darken-3"
            image="https://i.pinimg.com/750x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
          ></v-avatar>
        </template>

        <v-list-item-title>cartile</v-list-item-title>

        <v-list-item-subtitle>Bio</v-list-item-subtitle>

        <template v-slot:append>
          <div class="justify-self-end">
            <v-icon class="me-1" icon="mdi-heart"></v-icon>
            <span class="subheading me-2">256</span>
            <span class="me-1">·</span>
            <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
            <span class="subheading">45</span>
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
  </div>
  
  </div>
</template>

<script>

  export default {
    name: 'thoughts-all',
    data: function() {
      return {
        thoughts: null,
        currentThoughtId: null
      }
    }
  }
</script>



