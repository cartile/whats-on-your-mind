<template>
<div class="limiter">
    <div class="container-login100">
        <div class="wrap-login100">
            <form class="login100-form validate-form" v-on:submit.prevent="onSubmit">
                <span class="login100-form-title p-b-26">
                    <img src="../../assets/loginLogo.png" alt="Site Logo">
                </span>
                <span class="login100-form-title p-b-48">
                    <i class="zmdi zmdi-font"></i>
                </span>

                <div class="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
                    <input class="input100" v-model="username" type="text"  id="username" placeholder="">
                    <span class="focus-input100" data-placeholder="Username"></span>
                </div>

                <div class="wrap-input100 validate-input" data-validate="Enter password">
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

                <div class="text-center p-t-40">
                    <span class="txt1">
                        Don’t have an account? <router-link to="/register" class="nav-link txt2" style="display: inline; padding: 2px;" exact> Sign Up </router-link>
                    </span>
                    
                    <h2 class="txt1" style="margin-bottom: 0px; margin-top: 5px;">
                        Or, 
                    </h2>
                    <router-link to="/" class="nav-link txt2" style="padding-bottom:20px; padding-top: 6px;" exact> 
                        Continue without logging in
                    </router-link>
                </div>
            </form>
        </div>
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