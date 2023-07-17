<template>
  <div>
      <h1>Create Thought</h1>
      <form class="custom-form" v-on:submit.prevent="onSubmit">
          <div class="form-group">
              <label for="username">Title</label>
              <input v-model="thought.title" type="text" class="form-control" id="title" placeholder="Title">
          </div>
          <div class="form-group">
              <label for="body">Body</label>
              <textarea v-model="thought.body" name="body" id="body" cols="30" rows="10"></textarea>
          </div>
          <div class="form-group">
              <button type="submit" class="btn btn-secondary">Submit</button>
          </div>
          
      </form>
  </div>
</template>

<script>

  import * as thoughtService from '../../services/ThoughtService'
  export default {
      name: 'thoughts-create',
      data() {
          return {
              task: {
                title: '',
                body: ''
              }
          }
      },
      methods: {
          onSubmit: async function() {
              const request = {
                  thought: this.thought
              }
              await thoughtService.createThought(request)
              this.$router.push({ name: 'thoughts-all' })
          }
      }
  }
</script>