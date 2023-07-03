<template>
    <div>
        <h1>Login Route</h1>
        <form class="custom-form" v-on:submit="onSubmit">
            <div class="form-group">
                <label for="username">Username</label>
                <input v-model="username" type="text" class="form-control" id="username" placeholder="Enter username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-secondary">Submit</button>
            </div>
            
        </form>
    </div>
</template>

<script>

    import * as auth from '../../services/AuthService'
    export default {
        name: 'UserLogin',
        data() {
            return {
                username: '', 
                password: ''
            }
        },
        methods: {
            onSubmit(event) {
                event.preventDefault()
                auth.login()
                this.$router.push({ name: 'home' })
            }
        }
    }
</script>