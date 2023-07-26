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
      <v-card
        v-for="(thought, index) in thoughts"
        :key="thought._id"
        class="mx-auto mb-2 ml-2"
        color="#26c6da"
        theme="dark"
        max-width="400"
        min-width="350"
        title=""
        style="display: flex; flex-direction: column; height: 100%;" 
      >
      
      <div class="d-flex" style="position: absolute; right: 0px; top: 5px;" >
          <div class="text-center">
            <v-dialog
              v-model="editDialogs[index]"
              width="auto"
            >
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" @click="handleEditDialog(index)" style="display: flex; align-items: center; cursor: pointer; margin-right:5px; background-color: #016FB9">
                  <v-icon 
                  class="me-1" 
                  icon="mdi-pencil" />
                </v-btn>
              </template>

              <v-card>
                <v-card-text>
                  tryna edit sumn? {{ index }}
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" block @click="this.editDialogs[index] = false">Close Dialog</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>

          <div class="text-center">
            <v-dialog
              v-model="deleteDialogs[index]"
              width="auto"
            >
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" @click="handleDeleteDialog(index)" style="display: flex; align-items: center; cursor: pointer; margin-right:5px; background-color: #016FB9">
                  <v-icon 
                  class="me-1" 
                  icon="mdi-delete" />
                </v-btn>
              </template>

              <v-card>
                <v-card-text class="text-center">
                  Are you sure you want to delete: "{{thoughts[index].title || 'No Title'}}"? 
                  <br>
                  <br>
                  This action cannot be undone.
                </v-card-text>
                <v-card-actions class="pa-1" style="margin-botton:0px;">
                  <v-btn color="red" style="background-color:red;" block @click="this.deleteDialogs[index] = false; handleDelete(thoughts[index])">Confirm Delete</v-btn>
                </v-card-actions>
                <v-card-actions class="pa-0" style="margin-botton:0px;">
                  <v-btn color="primary" block @click="this.deleteDialogs[index] = false">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>

        <v-card-title>{{ thought.title || 'No Title'  }}            
        </v-card-title>
        
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
            <div @click="handleClick(index)" style="display: flex; align-items: center; cursor: pointer;">
              <v-icon 
              class="me-1" 
              :style="{ color: isClickedList[index] ? 'red' : '' }" 
              icon="mdi-heart" />
            <span class="subheading me-2" style="user-select: none;">{{thought.likes}}</span>
            </div>
            <span class="me-1" style="user-select: none;">·</span>
            <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
            <span class="subheading" style="user-select: none;">{{thought.shares}}</span>
          </div>
          </v-card-actions>
        </div>
        
      </v-card>
    </div>
  </div>
</template>

<script>
  import * as thoughtService from '../../services/ThoughtService'
  import * as authService from '../../services/AuthService';

  export default {
    name: 'thoughts-all',
    data() {
      return {
        thoughts: [],
        isClickedList:[],
        isOwnedList: [],
        currentThoughtId: null,
        myUser: null,
        editDialogs: [],
        deleteDialogs: []
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
        await thoughtService.deleteThought(thought._id)
        console.log(thought)
        const index = this.thoughts.findIndex(thoughtListItem => thoughtListItem._id === thought._id)
        this.thoughts.splice(index, 1)
      },
      async handleEdit(thought) {
        console.log(thought)
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
      },
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



