<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <h1>Reshape Frontend</h1>
        <h2 v-if="isLoggedIn && currentUser">Logged in as {{ currentUser }}</h2>
        <button @click="login()" v-if="!isLoggedIn">Login</button>
        <button @click="logout()" v-if="isLoggedIn">Logout</button>
        <br />
        <br />
        <button @click="getBmAuthRequired">Get bm auth required</button>
        <button @click="getFeatures">Get features</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AuthService from './services/auth.service';
import config from '@/app.config';

const auth = new AuthService();

export default Vue.extend({
    name: 'App',
    data() {
        return {
            isLoggedIn: false as boolean,
            accessTokenExpired: false as boolean,
            currentUser: '' as string | undefined
        };
    },
    mounted: function() {
        auth.getUser().then(user => {
            if (user) {
                this.currentUser = user.profile.name;
                this.accessTokenExpired = user.expired;
                this.isLoggedIn = user !== null && !user.expired;
            }
        });
    },
    methods: {
        login: () => {
            auth.login();
        },
        logout: () => {
            auth.logout();
        },
        getBmAuthRequired: async () => {
            const res = await fetch(config.bmServiceUrl + '/identity');
            console.log(res);

            if (res.ok) {
                const json = await res.json();
                console.log(json);
            }
        },
        getFeatures: async () => {
            const res = await fetch('http://localhost:5000/api/v1/acc/accountadditions/features');

            if (res.ok) {
                const json = await res.json();
                console.log(json);
            }
            if (res.status == 401) {
                // window.location = "http://localhost:5200"
                // Redirect to login page
            }
        }
    }
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
