<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <h1>Reshape frontpage</h1>
        <button @click="accessResource">Login</button>
        <button @click="getFeatures">Get features</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AuthService from './services/auth.service'
import config from '../app.config'

export default Vue.extend({
    name: 'App',
    methods: {
        test: () => console.log('test'),
        accessResource: async () => {
            const res = await fetch(config.bmServiceUrl + '/identity')
            console.log(res)

            if (res.ok) {
                const json = await res.json()
                console.log(json)
            }
        },
        getFeatures: async () => {
            const res = await fetch('http://localhost:5000/api/v1/acc/accountadditions/features')

            if (res.ok) {
                const json = await res.json()
                console.log(json)
            }
            if (res.status == 401) {
                // window.location = "http://localhost:5200"
                // Redirect to login page
            }
        }
    }
})
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
