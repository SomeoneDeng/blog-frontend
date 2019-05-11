<template>
    <v-container grid-list-md fill-height align-start>
        <v-layout column>  
            {{text}}
            <!-- <v-btn color="success" @click="login">登录</v-btn> -->
        </v-layout>
    </v-container>
</template>

<script>
import Axios from 'axios';
import { log } from 'util';
export default {
    data(){
        return {
            text: "博客自用，持续施工中。。。(￣▽￣)"
        }
    },
    methods:{
        login: function () {
            var that = this
            Axios({
                url: that.$url + '/user/login',
                method: 'post',
                data:{
                    'name': 'root',
                    'password': 'dqn'
                }
            }).then(resp => {
                log(resp)
                Axios({
                    url : this.$url + '/api/message/all/true',
                    method: 'get',
                    headers: {
                        // 'authorization' : resp.data+''
                    }
                }).then(resp => {
                    that.kotoLoad = true
                    that.hitokoto = resp.data.data
                })
            })
        }
    }
}
</script>