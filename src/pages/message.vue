<template>
    <!-- <v-container grid-list-md fill-height> -->
        <v-layout row wrap>  
            <v-flex md12 xs12 sm12 offset-md2>
                <v-layout row wrap>
                    <v-progress-linear color="teal" :indeterminate="true" v-if="loading.friend"></v-progress-linear>
                    <v-flex md12 xs12 sm12 v-if="!loading.friend">
                        <h4 class="display-0 teal--text">好友(排名不分先后)</h4>
                        <v-hover v-for="item in friends" :key="item.id" >
                            <v-chip slot-scope="{ hover }" :class="`elevation-${hover ? 8 : 2}`" >
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <div  v-on="on">
                                            <v-avatar>
                                                <img v-bind:src="$url + item.image" alt="alt">
                                            </v-avatar>
                                            <a :href="item.link" style="color:black">{{item.nickName}}</a>
                                        </div>
                                    </template>
                                    <span>{{item.description}}</span>
                                </v-tooltip>
                            </v-chip>
                        </v-hover>
                    </v-flex>
                    
                    <v-flex md12 xs12 sm12 >
                        <h4 class="display-0 teal--text">大佬们如是说：</h4>
                        <v-progress-linear color="teal" :indeterminate="true" v-if="loading.msg"></v-progress-linear>
                        <v-timeline dense  align-top v-if="!loading.msg">
                            <v-timeline-item
                                v-for="item in messages"
                                right
                                small
                                :key="item.id">
                                <template v-slot:icon>
                                    <v-avatar>
                                    <img v-bind:src="item.image">
                                    </v-avatar>
                                </template>
                                <v-card >
                                    <v-card-title class="title">{{item.name}}</v-card-title>
                                    <v-subheader>{{getDate(item.created)}}</v-subheader>
                                    <v-card-text v-html="item.content">           
                                    </v-card-text>
                                <v-card-actions>
                                        <v-snackbar
                                            v-model="snack.snackbar"
                                            left
                                            multi-line
                                            :color="snack.color"
                                            :timeout="1000"
                                            top>
                                            <v-spacer></v-spacer> {{ snack.text }}<v-spacer></v-spacer> 
                                        </v-snackbar>
                                        <v-spacer></v-spacer>
                                        <v-btn flat class="teal--text" @click="snack.snackbar = true"><v-icon>thumb_up</v-icon></v-btn>
                                        <v-btn flat class="teal--text" @click="snack.snackbar = true"><v-icon>message</v-icon></v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-timeline-item>
                        </v-timeline>
                        <!-- </v-flex> -->
                        <v-spacer></v-spacer>
                    </v-flex>
                    <v-menu open-on-hover top offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn
                            color="pink"
                            fixed
                            dark
                            v-on="on"
                            right
                            bottom
                            fab>
                            <v-icon>add</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-btn color="success" @click="()=>{messageDialog = true}">说点什么</v-btn>
                        </v-list>
                    </v-menu>
                    <MessageDialog v-bind:dialog="messageDialog" v-on:close="messageDialogClose"></MessageDialog>
                </v-layout>
            </v-flex>
        </v-layout>
        
    <!-- </v-container> -->
</template>

<script>
import Axios from 'axios';
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import MessageDialog from '../components/MessagePublisher.vue'
export default {
    components: {
        MessageDialog
    },
    data(){
        return {
            friends: [],
            messages: [],
            snack: {
                text: '没写这个功能ヾ(≧▽≦*)o',
                snackbar: false,
                color: 'success'
            },
            loading:{
                friend: false,
                msg: false
            },
            messageDialog: false
        }
    },
    methods:{
        messageDialogClose: function(data) {
            this.messageDialog = false
            if( data != null || data != undefined){
                data.image === '/static/image/huaji.png' ?  data.image = this.$url +  data.image :  data.image
                data.content = data.content.replace("<audio", 'au')
                data.content = data.content.replace("<video", 'vi')
                data.content = data.content.replace("<script", 'sc')
                data.content = data.content.replace("<iframe", 'ir')
                data.content = data.content.replace("<style", 'sty')
                this.messages.unshift(data)
            }
        },
        getFriends: function () {
            this.loading.friend = true
            var that = this
            Axios({
                url: that.$url + '/api/friend/all/checked',
                method: 'get',
            }).then(resp => {
                that.loading.friend = false
                that.friends = resp.data.data
            })
        },
        getMessages: function () {
            var that = this
            that.loading.msg = true
            Axios({
                url: that.$url + '/api/message/all',
                method: 'get'
            }).then(resp => {
                that.loading.msg = false
                resp.data.data.forEach(m => {
                    m.image === '/static/image/huaji.png' ? m.image = that.$url + m.image : m.image
                    m.content = m.content.replace("<audio", 'au')
                    m.content = m.content.replace("<video", 'vi')
                    m.content = m.content.replace("<script", 'sc')
                    m.content = m.content.replace("<iframe", 'ir')
                    m.content = m.content.replace("<style", 'sty')
                })
                that.messages = resp.data.data
            })
        },
        getDate:function(dateStr) {
            var dateTime = new Date(dateStr);
            return dateTime.getFullYear() + "年" +
                (dateTime.getMonth() + 1) + "月" +
                dateTime.getDate() + "日 " +
                dateTime.getHours() + ":" +
                dateTime.getUTCMinutes()
        },
    },
    mounted: function () {
        this.getFriends()
        this.getMessages()
    },
    updated: function () {
        const preEl = document.querySelectorAll('pre')
            preEl.forEach((el) => {
                hljs.highlightBlock(el)
        })
    }
}
</script>