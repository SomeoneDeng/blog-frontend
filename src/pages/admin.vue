<template>
    <v-container grid-list-md fluid>
        <v-layout row wrap v-if="token != ''">
            <v-flex md2 xs12 sm12>
                <AdminDrawer></AdminDrawer>
            </v-flex>

            <v-flex md10 xs12 sm12>
                <router-view></router-view>
            </v-flex>
        </v-layout>
        <LoginPanel :dialog='loginShow' v-on:close="closeLogin"></LoginPanel>
    </v-container>
</template>

<script>
import LoginPanel from '../components/LoginPanel.vue'
import AdminDrawer from '../components/admin/AdminDrawer.vue'
import { log } from 'util';
export default {
    components:{
        LoginPanel,
        AdminDrawer
    },
    data(){
        return {
            loginShow: false,
            token: this.$store.getters.userToken
        }
    },
    mounted: function () {
        log('admin page token: ',this.token)
        if (this.token === '' || this.token === undefined) {
            //todo 尝试cookie获取
            this.loginShow = true
        }
    },
    methods: {
        closeLogin: function (token) {
            log('login panel closed')
            this.loginShow = false
            if (token != '' ) {
                this.token = token
                this.$store.commit('userToken', token)
            }else{
                this.$router.push('/')
            }
        }
    },
}
</script>
