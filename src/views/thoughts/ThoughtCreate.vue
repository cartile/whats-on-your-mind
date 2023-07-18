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
              <textarea placeholder="Body" v-model="thought.body" name="body" id="body" class="form-control" cols="30" rows="10"></textarea>
          </div>
          <div class="form-group">
              <button type="submit" class="btn btn-secondary">Submit</button>
          </div>
          
      </form>
  </div>
</template>

<script>

  import * as thoughtService from '../../services/ThoughtService'
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';


  export default {
      name: 'thoughts-create',
      setup() {
        const thought = ref({
            title: '',
            body: ''
        })

        const router = useRouter()

        const onSubmit = async () => {
            const request = {
                thought: thought.value
            }
            await thoughtService.createThought(request)
            await router.push({ name: 'thoughts-all'})
        }
        return {
            thought,
            onSubmit,
        }
      }
  }
</script>