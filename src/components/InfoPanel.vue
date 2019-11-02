<template>
    <v-layout column wrap style="padding-left:4px;padding-right:4px">
        <v-flex md12 xs12 sm12>
            <v-layout column >
                <v-list-tile avatar @click="toAdmin"> 
                    <v-list-tile-avatar :size="56">
                        <img src="../assets/logo.png">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-spacer></v-spacer>
                        <v-list-tile-title>
                            <h4>Someone</h4>
                        </v-list-tile-title>      
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile >
                    <v-tooltip right>
                        <template v-slot:activator="{ on }">
                            <v-list-tile-sub-title v-on="on">Coder，喜欢编程;</v-list-tile-sub-title>
                        </template>
                        <span>Coder，喜欢编程;</span>
                    </v-tooltip> 
                </v-list-tile>
            </v-layout>
            <v-divider color="teal" class="hidden-sm-and-down"></v-divider>
            <v-layout column class="hidden-sm-and-down">
                <v-list-tile >
                    <span style="display-1;margin-top:10px">Contact</span>
                </v-list-tile>
                <v-list-tile v-for="item in contacts"
                :key="item.title" >
                    <v-list-tile-action>
                        <v-icon v-html="'$vuetify.icons.'+item.icon"></v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content class="align-content-end">
                        <v-list-tile-title><a :href="item.title">{{item.icon}}</a></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-layout>
            <v-layout column v-if="kotoLoad">
                <v-card>
                    <v-card-title primary-title>
                        {{hitokoto.koto}}
                    </v-card-title>
                    <v-card-text class="align-content-end">
                        {{'----' + hitokoto.comes}} 
                    </v-card-text>
                </v-card>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import Axios from 'axios';
import { setInterval } from 'timers';
export default {
    data (){
        return {
            contacts: [
                {title : "https://github.com/SomeoneDeng",icon : 'github'},
                {title : "https://steamcommunity.com/id/jiayimiao1s/",icon : 'steam'},
                {title : "iamdqncoder@gmail.com",icon : 'email'},
                // {title : "https://space.bilibili.com/12057351",icon : 'link'},
            ],
            hitokoto:{},
            kotoLoad: false,
            toAdminSign: 0
        }
    },
    methods: {
        getKoto: function () {
            var that = this
            Axios({
                url : this.$url + '/api/hitokoto/get',
                method: 'get'
            }).then(resp => {
                that.kotoLoad = true
                that.hitokoto = resp.data.data
            })
        },
        toAdmin: function () {
            if (this.toAdminSign < 5) {
                this.toAdminSign += 1;
            } else {
                this.toAdminSign = 0;
                this.$router.push('/admin')
            }
        }
    },
    mounted: function () {
        this.getKoto()
        setInterval(() => {
            this.getKoto()
        }, 20000);
    }
}
</script>

<style>
    a{
        text-decoration-line: none;
        color: teal;
    }

    .koto {
        display: flex;
        word-break: break-all;
        flex-wrap: wrap;
        height: auto;
        text-align: start;
    }
</style>
