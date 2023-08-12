<template>
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
  <div class="d-flex flex-column">
    <div class="mb-4">
      <h1>Thought Wall</h1>
      <router-link to="/thoughts/new" class="btn btn-success ml-2" exact>
        Add a Thought
      </router-link>
    </div>
    <div class="thought-cards-container" v-if="thoughts && thoughts.length > 0">
        <div class="leftDiv">
          <h2>Latest Thoughts:</h2>
          
        <thoughtCard
          v-for="(thought, index) in thoughts"
          :key="thought._id"
          :thought="thought"
          :index="index"
          :isClicked="isClickedList[index]"
          :isOwned="isOwnedList[index]"
          @update:isClicked="value => isClickedList[index] = value"
          @edit="handleEdit"
          @delete="handleDelete"
          @click="handleClick"
        />
      </div>
      <div class="rightDiv">
        <h2>Top Thoughts:</h2>
      </div>
    </div>
  </div>
</template>

<script>
  import * as thoughtService from '../../services/ThoughtService'
  import * as authService from '../../services/AuthService'
  import thoughtCard from '../../components/thoughtCard.vue'

  export default {
    name: 'thoughts-all',
    components: {
      thoughtCard
    },
    data() {
      return {
        thoughts: [],
        isClickedList:[],
        isOwnedList: [],
        currentThoughtId: null,
        myUser: null,
        editDialogs: [],
        deleteDialogs: [],
        
        valid: false,
        title: '',
        titleRules: [
          value => {
            if(value) return true

            return 'Title is required'
          }
        ], 
        body: '',
        bodyRules: [
          value => {
            if(value) return true

            return 'Body is required'
          }
        ]
      }
    },
    methods: {
      async handleEditDialog(index){
        this.editDialogs[index] = true;
      },
      async handleDeleteDialog(index) {
        this.deleteDialogs[index] = true;
      },
      async handleDelete(thought) {
        await thoughtService.deleteThought(thought._id);
        const index = this.thoughts.findIndex(thoughtListItem => thoughtListItem._id === thought._id);
        this.thoughts.splice(index, 1);
      }, 
      async handleEdit(thought, index, title, body) {

          this.editDialogs[index] = false
          thought.title = title
          thought.body = body
          thought.updatedAt = new Date()

          await thoughtService.updateThought(thought)
      },
      async handleClick(index) {
        // true means liked 
        this.isClickedList[index] = !this.isClickedList[index]
        if (this.isClickedList[index]) {
          this.thoughts[index].likes += 1 //like
        } else {
          this.thoughts[index].likes -= 1 //unliked
        }
        const thought = this.thoughts[index]
        await thoughtService.updateThoughtLikes(thought._id, thought.likes)
      },
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
      }, isOwned(index){
        return this.isOwnedList[index]
      }
    }, async mounted() {
      try {
        this.thoughts = this.$route.meta.thoughts;
        this.myUser = await thoughtService.getUser(authService.getUser().id)
        this.isClickedList = Array(this.$route.meta.thoughts.length).fill(false);
        this.isOwnedList = Array(this.$route.meta.thoughts.length).fill(false);
        this.deleteDialogs = Array(this.$route.meta.thoughts.length).fill(false);
        this.editDialogs = Array(this.$route.meta.thoughts.length).fill(false);
        
        this.thoughts.forEach((thought, index) => {
            if(this.myUser.data.user.likedPosts.includes(thought._id)) {
              this.isClickedList[index] = true
            }
            if(thought.author._id === this.myUser.data.user._id) {
              this.isOwnedList[index] = true
            }
        })
      console.log(this.isOwnedList)
      } catch (error) {
      console.error('Error fetching user data:', error)
      }
    }
}
</script>

<style>
.thought-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 400px));
  grid-gap: 10px; /* Adjust the gap between cards as needed */
  justify-content: start;
}
</style>



