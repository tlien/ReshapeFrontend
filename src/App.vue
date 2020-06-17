<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" height="50px"/>
        <h1>Reshape Frontend</h1>
        <div>
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
            <div>
                <h2>Call the API</h2>
                <div id="callTheApiContent">
                    <div v-if="requestStatusCode" v-bind:class="{ green: isSuccessStatusCode, red: isErrorStatusCode, blue: isServerErrorStatusCode }" class="request-status">
                        {{ requestStatusCode + ' ' + requestStatusText }}
                    </div>
                    <div class="cta-actions flex">
                        <div>
                            <h4>Business Management Service</h4>
                            <button @click="getBmAuthRequired">Get bm auth required</button>
                        </div>
                        <div>
                            <h4>Account Service</h4>
                            <button @click="getFeatures">Get features</button>
                        </div>
                    </div>
                </div>
                <br />
                <div>
                    <textarea v-model="data" class="text-area"></textarea>
                </div>
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
            requestStatusCode: 0 as number,
            requestStatusText: '' as string,
            features: '' as string
        };
    },
    computed: {
        isSuccessStatusCode(): boolean {
            return this.requestStatusCode >= 200 && this.requestStatusCode < 300;
        },
        isErrorStatusCode(): boolean {
            return this.requestStatusCode >= 400 && this.requestStatusCode < 500;
        },
        isServerErrorStatusCode(): boolean {
            return this.requestStatusCode >= 500 && this.requestStatusCode < 600;
        }
    },
    mounted: function() {
        auth.getUser().then(user => {
            if (user) {
                this.authResponse = JSON.stringify(user, null, 2);
                this.currentUser = user.profile.name;
                this.accessTokenExpired = user.expired;
                this.isLoggedIn = user !== null && !user.expired;
                console.log("user:", user);
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
        getBmAuthRequired: function() {
            if (this.isLoggedIn) {
                auth.getAccessToken().then((token: string) => {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    axios
                        .get(config.bmServiceUrl + '/identity')
                        .then((response: any) => {
                            this.data = JSON.stringify(response.data, null, 2);
                            this.requestStatusCode = response.status;
                            this.requestStatusText = response.statusText;
                        })
                        .catch((error: any) => {
                            alert(error);
                            this.data = JSON.stringify(error.data, null, 2);
                            this.requestStatusCode = error.status;
                            this.requestStatusText = error.statusText;
                        });
                });
            } else {
                axios
                    .get(config.bmServiceUrl + '/identity')
                    .then((response: any) => {
                        this.data = JSON.stringify(response.data, null, 2);
                        this.requestStatusCode = response.status;
                        this.requestStatusText = response.statusText;
                    })
                    .catch((error: any) => {
                        this.data = JSON.stringify(error.response.data, null, 2);
                        this.requestStatusCode = error.response.status;
                        this.requestStatusText = error.response.statusText;
                    });
            }
        },
        getFeatures: function() {
            if (this.isLoggedIn) {
                auth.getAccessToken().then((token: string) => {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    axios
                        .get(config.accServiceUrl + '/accountadditions/features')
                        .then((response: any) => {
                            this.data = JSON.stringify(response.data, null, 2);
                            this.requestStatusCode = response.status;
                            this.requestStatusText = response.statusText;
                        })
                        .catch((error: any) => {
                            this.data = JSON.stringify(error.response.data, null, 2);
                            this.requestStatusCode = error.response.status;
                            this.requestStatusText = error.response.statusText;
                        });
                });
            } else {
                axios
                    .get(config.accServiceUrl + '/accountadditions/features')
                    .then((response: any) => {
                        this.data = JSON.stringify(response.data, null, 2);
                        this.requestStatusCode = response.status;
                        this.requestStatusText = response.statusText;
                    })
                    .catch((error: any) => {
                        this.data = JSON.stringify(error.response.data, null, 2);
                        this.requestStatusCode = error.response.status;
                        this.requestStatusText = error.response.statusText;
                    });
            }
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

#callTheApiContent {
    position: relative;
}

.request-status {
    position: absolute;
    width: 100%;
    top: -20px;
    text-align: center;
}

.green {
    color: green;
}

.blue {
    color: steelblue;
}

.red {
    color: red;
}
</style>
