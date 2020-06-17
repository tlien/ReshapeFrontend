<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" height="50px" />
        <h1>Reshape Frontend</h1>
        <div>
            <div>
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
                <div class="left">
                    <span class="dot bg-green"></span>
                    <span>Requires authorization, but no elevated access</span>
                </div>
                <br />
                <div class="left">
                    <span class="dot bg-orange"></span>
                    <span>Requires admin permissions</span>
                </div>
                <br />
                <div class="left">
                    <span class="dot bg-blue"></span>
                    <span>Not related to services, strictly for information</span>
                </div>
                <div id="callTheApiContent">
                    <div v-if="requestStatusCode" v-bind:class="{ green: isSuccessStatusCode, red: isErrorStatusCode, blue: isServerErrorStatusCode }" class="request-status">
                        {{ requestStatusCode + ' ' + requestStatusText }}
                    </div>
                    <div class="cta-actions flex">
                        <div>
                            <h4><span class="dot bg-orange"></span> Business Management Service</h4>
                            <button @click="getBusinessTiers">Get business tiers</button>
                        </div>
                        <div>
                            <h4>Account Service</h4>
                            <button @click="getFeatures" class="btn-green">Get features</button>
                            <button @click="getAccount" class="btn-green">>>Get account</button>
                            <button @click="getAllAccounts" class="btn-orange">>> Get all accounts</button>
                        </div>
                        <div>
                            <h4><span class="dot bg-blue"></span> Current user claims</h4>
                            <button @click="getClaims">Get all user claims</button>
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
                console.log('user:', user);
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
        getClaims: async function() {
            if (this.isLoggedIn) {
                console.log("User is logged in, adding token to request")
                const token = await auth.getAccessToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            }
            axios
                .get(config.accServiceUrl + 'identity')
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
        },
        getFeatures: async function() {
            if (this.isLoggedIn) {
                console.log("User is logged in, adding token to request")
                const token = await auth.getAccessToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            }
            axios
                .get(config.accServiceUrl + 'accountadditions/features')
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
        },
        getBusinessTiers: async function() {
            if (this.isLoggedIn) {
                console.log("User is logged in, adding token to request")
                const token = await auth.getAccessToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            }
            axios
                .get(config.bmServiceUrl + 'businesstiers')
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
        },
        getAccount: async function() {
            if (this.isLoggedIn) {
                console.log("User is logged in, adding token to request")
                const token = await auth.getAccessToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            }
            axios
                .get(config.accServiceUrl + 'account/own')
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
        },
        getAllAccounts: async function() {
            if (this.isLoggedIn) {
                console.log("User is logged in, adding token to request")
                const token = await auth.getAccessToken();
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            }
            axios
                .get(config.accServiceUrl + 'account')
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
        },
        notImplemented: function() {
            alert('Not implemented');
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
    top: -40px;
    font-size: 24px;
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

.flex div {
    flex: 1;
}

.dot {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 15px;
}

.bg-green {
    background-color: green;
}

.bg-orange {
    background-color: orange;
}

.bg-blue {
    background-color: steelblue;
}

.btn-green {
    background-color: green;
    color: white;
}

.btn-orange {
    background-color: orange;
    color: white;
}

.left {
    float: left;
}
</style>
