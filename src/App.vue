<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <h1>Reshape Frontend</h1>
        <div v-bind:class="{ flex: isLoggedIn }">
            <div v-bind:class="{ 'auth-response': isLoggedIn }">
                <h2 v-if="isLoggedIn && currentUser">Logged in as {{ currentUser }}</h2>
                <button @click="login()" v-if="!isLoggedIn">Login</button>
                <button @click="logout()" v-if="isLoggedIn">Logout</button>
                <br />
                <br />
                <div v-if="authResponse">
                    <textarea v-model="authResponse" class="text-area"></textarea>
                </div>
            </div>
            <br />
            <br />
            <div v-bind:class="{ 'api-data': isLoggedIn }">
                <h3 v-if="isLoggedIn">Call the API</h3>
                <button @click="getBmAuthRequired">Get bm auth required</button>
                <button @click="getFeatures">Get features</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import AuthService from './services/auth.service';
import config from '@/app.config';

const auth = new AuthService();

export default Vue.extend({
    name: 'App',
    data() {
        return {
            isLoggedIn: false as boolean,
            accessTokenExpired: false as boolean,
            currentUser: '' as string | undefined,
            authResponse: '' as string,
            data: '' as string,
            dataStatus: '' as string
        };
    },
    mounted: function() {
        auth.getUser().then(user => {
            if (user) {
                this.authResponse = JSON.stringify(user, null, 2);
                this.currentUser = user.profile.name;
                this.accessTokenExpired = user.expired;
                this.isLoggedIn = user !== null && !user.expired;
                console.log(user);
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
        getFeatures: function() {
            auth.getAccessToken().then((token: string) => {
                axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

                axios
                    .get(config.accServiceUrl + '/accountadditions/features')
                    .then((response: any) => {
                        this.data = JSON.stringify(response.data, null, 2);
                        this.dataStatus = response.status;
                    })
                    .catch((error: any) => {
                        alert(error);
                    });
            });
        }
    },
    filters: {
        pretty: function(value: string) {
            return JSON.stringify(JSON.parse(value), null, 4);
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

.flex {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin: 20px;
}

.auth-response {
    flex: 1;
    margin: 15px;
}

.api-data {
    flex: 1;
    margin: 15px;
}

.text-area {
    width: 100%;
    height: 400px;
}
</style>
