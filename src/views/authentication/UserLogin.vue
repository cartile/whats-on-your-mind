<template>
<div class="limiter">
    <div class="container-login100">
        <div class="wrap-login100">
            <form class="login100-form validate-form" v-on:submit.prevent="onSubmit">
                <span class="login100-form-title p-b-26">
                    Welcome
                </span>
                <span class="login100-form-title p-b-48">
                    <i class="zmdi zmdi-font"></i>
                </span>

                <div class="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
                    <input class="input100" v-model="username" type="text"  id="username" placeholder="">
                    <span class="focus-input100" data-placeholder="Username"></span>
                </div>

                <div class="wrap-input100 validate-input" data-validate="Enter password">
                    <span class="btn-show-pass">
                        <i class="zmdi zmdi-eye"></i>
                    </span>
                    <input class="input100" type="password" name="pass" v-model="password" id="password">
                    <span class="focus-input100" data-placeholder="Password"></span>
                </div>

                <div class="container-login100-form-btn">
                    <div class="wrap-login100-form-btn">
                        <div class="login100-form-bgbtn"></div>
                        <button class="login100-form-btn" type="submit">
                            Login
                        </button>
                    </div>
                </div>

                <div class="text-center p-t-115">
                    <span class="txt1">
                        Don’t have an account?
                    </span>

                    <a class="txt2" href="#">
                        Sign Up
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>
    <div id="loginContainer">
        <div id="loginDiv">
            something
            <!--
            <h1>Login</h1>
            <form class="custom-form" v-on:submit.prevent="onSubmit">
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
            -->
        </div>
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
            onSubmit: async function() {
                const user = {
                    username: this.username,
                    password: this.password
                }
                await auth.login(user)
                this.$router.push({ name: 'home' })
            }
        }
    }
</script>

<style scoped>
    @import '../../assets/login/vendor/daterangepicker/daterangepicker.css';
    @import '../../assets/login/css/util.css';
    @import '../../assets/login/css/main.css';
</style>