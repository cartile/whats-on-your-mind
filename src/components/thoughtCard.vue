<template>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <v-card color="#26c6da">
      <div class="d-flex" style="position: absolute; right: 0px; top: 5px;" v-if="isOwned">
          <div class="text-center">
            <v-dialog
              v-model="isEditDialogOpen"
              width="600"
            >
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" @click="isEditDialogOpen = !isEditDialogOpen" style="display: flex; align-items: center; cursor: pointer; margin-right:5px; background-color: #016FB9">
                  <v-icon 
                  class="me-1" 
                  icon="mdi-pencil" />
                </v-btn>
              </template>

              <v-card>
                <v-form v-model="valid" validate-on="submit lazy" @submit.prevent="handleEdit(thought, title, body)">
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="title"
                          :rules="titleRules"
                          label="Title"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                      >
                        <v-text-field
                          v-model="body"
                          :rules="bodyRules"
                          label="Body"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-btn
                        :loading="loading"
                        type="submit"
                        block
                        class="mt-2"
                        text="Submit"
                        style="background-color:green"
                      ></v-btn>
                    </v-row>
                  </v-container>
                </v-form>
                <v-card-actions>
                  <v-btn color="primary" block @click="isEditDialogOpen = !isEditDialogOpen">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>

          <div class="text-center">
            <v-dialog
              v-model="isDeleteDialogOpen"
              width="auto"
            >
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" @click="isDeleteDialogOpen = !isDeleteDialogOpen" style="display: flex; align-items: center; cursor: pointer; margin-right:5px; background-color: #016FB9">
                  <v-icon 
                  class="me-1" 
                  icon="mdi-delete" />
                </v-btn>
              </template>

              <v-card>
                <v-card-text class="text-center">
                  Are you sure you want to delete: "{{thought.title || 'No Title'}}"? 
                  <br>
                  <br>
                  This action cannot be undone.
                </v-card-text>
                <v-card-actions class="pa-1" style="margin-bottom:0px;">
                  <v-btn color="red" style="background-color:red;" block @click="isDeleteDialogOpen = !isDeleteDialogOpen; handleDelete(thoughts)">Confirm Delete</v-btn>
                </v-card-actions>
                <v-card-actions class="pa-0" style="margin-bottom:0px;">
                  <v-btn color="primary" block @click="isDeleteDialogOpen = !isDeleteDialogOpen">Cancel</v-btn>
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
            <div @click="handleClick" style="display: flex; align-items: center; cursor: pointer;">
              <v-icon 
              class="me-1" 
              :style="{ color: isClicked ? 'red' : '' }" 
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
</template>

<script>
export default {
    name: 'ThoughtCard',
    data() {
        return {
        isEditDialogOpen: false,
        isDeleteDialogOpen: false,
        title: '',
        body: '',
        }
    },
    props: {
        thought: {
            type: Object,
            required: true,
        },
        index: {
        type: Number,
        required: true,
        },
        isClicked: {
        type: Boolean,
        default: false,
        }, isOwned: {
        type: Boolean,
        default: false
        },
    },
    methods: {
        handleEdit() {
            this.$emit('edit', this.thought, this.title, this.body);
        },
        handleDelete() {
            this.$emit('delete', this.thought);
        },
        handleClick() {
            this.$emit('click', this.index);
        }, 
        isUpdated(thought) {
            return thought.updatedAt && thought.updatedAt !== thought.createdAt;
        }, formatDate(date) {
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
      }
        
    },
    emits: ['update:isClicked', 'edit', 'delete', 'click', 'isOwned']
}
</script>