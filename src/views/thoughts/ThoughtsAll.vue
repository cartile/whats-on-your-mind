<template>
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
  <div class="d-flex flex-column">
    <div class="mb-4">
      <h1>Thought Wall</h1>
      <router-link to="/thoughts/new" class="btn btn-success ml-2" exact>
        Add a Thought
      </router-link>
    </div>
    <div class="d-flex flex-wrap justify-content-between" v-if="this.$route.meta.thoughts && this.$route.meta.thoughts.length > 0">
      <v-card
        v-for="thought in this.$route.meta.thoughts"
        :key="thought._id"
        class="mx-auto mb-2 ml-2"
        color="#26c6da"
        theme="dark"
        max-width="400"
        min-width="350"
        title=""
        style="display: flex; flex-direction: column; height: 100%;" 
      >
        <v-card-title>{{ thought.title }}</v-card-title>
        <v-card-subtitle>
          {{ isUpdated(thought) ? 'Updated ' : 'Created ' }} {{ formatDate(isUpdated(thought) ? thought.updatedAt : thought.createdAt) }}
        </v-card-subtitle>

        <div style="flex: 1; overflow: auto;">
          <v-card-text class="text-h5 py-2">
            {{thought.body}}
          </v-card-text>
        </div>

        <!-- Move v-card-actions inside a separate div -->
        <div style="margin-top: auto;"> <!-- Add inline style to push v-card-actions to the bottom -->
          <v-card-actions>
            <div style="position: absolute; bottom: 5px;">
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-avatar
            color="grey-darken-3"
            image="https://i.pinimg.com/750x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
          ></v-avatar>
        </template>

        <v-list-item-title>{{thought.author.username}}</v-list-item-title>

        <v-list-item-subtitle>Bio</v-list-item-subtitle>

        
      </v-list-item>
      </div>
          <div class="d-flex" style="position: absolute; right: 20px;" >
            <v-icon class="me-1" icon="mdi-heart"></v-icon>
            <span class="subheading me-2">{{thought.likes}}</span>
            <span class="me-1">·</span>
            <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
            <span class="subheading">{{thought.shares}}</span>
          </div>
          </v-card-actions>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'thoughts-all',
    data: function() {
      return {
        currentThoughtId: null
      }
    },
    methods: {
      isUpdated(thought) {
      // Check if updatedAt exists and is different from createdAt
      //console.log(thought.updatedAt && thought.updatedAt !== thought.createdAt)
      return thought.updatedAt && thought.updatedAt !== thought.createdAt;
      },
      formatDate(date) {
        const dateObj = new Date(date)
        const now = new Date()

        // If it's today, show the time in "hh:mm am/pm" format
        if (dateObj.toDateString() === now.toDateString()) {
          const hours = dateObj.getHours()
          const minutes = dateObj.getMinutes()
          const amOrPm = hours >= 12 ? 'pm' : 'am'
          const formattedHours = (hours % 12) || 12
          const formattedMinutes = minutes.toString().padStart(2, '0')
          return `at ${formattedHours}:${formattedMinutes} ${amOrPm}, Today`
        }
        
        if (dateObj < new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())) {
          const year = dateObj.getFullYear()
          return `on ${formattedDate}, ${year}`
        }
        // If it's not today, show the date in "MMM DD" format
        const options = { month: 'short', day: 'numeric' }
        const formattedDate = dateObj.toLocaleDateString(undefined, options)

        // If it's older than a year, show the date in "MMM DD, YYYY" format
        
        return `on ${formattedDate}`
      },
    },
}
</script>



