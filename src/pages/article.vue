<template>
    <v-container grid-list-md fill-height align-start>
    <v-layout row wrap>
        <v-flex md8 sm12 xs12 offset-md2>
            <a id="top" hidden></a>
            <v-btn
                @click="$vuetify.goTo(target, options)"
                fixed
                dark
                fab
                bottom
                right
                color="teal">
              <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
            <v-spacer v-if="!done"></v-spacer>
            <v-progress-linear
                v-if="!done"
                :indeterminate="true"
                color="teal"
            ></v-progress-linear>
            <v-spacer v-if="!done"></v-spacer>
            <v-card v-if="done"> 
                <v-parallax
                    height="300"
                    v-bind:src="article.imageUri" >  
                </v-parallax>
                <span class="headline titleText" style="padding-left:4px">   
                        {{article.title}}
                </span>     
                <v-card-title>
                    <div class="card-content">
                        <vue-markdown :source="article.content">
                        </vue-markdown>
                    </div>
                </v-card-title>
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
        </v-flex>   
    </v-layout>
    </v-container>
</template>

<script>
import { log } from 'util';
import axios from 'axios'
import VueMarkdown from 'vue-markdown'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
export default {
    components: {
        VueMarkdown
    },
    data(){
        return {
            aid : this.$route.query.aid,
            article: {},
            done: false,
            snack: {
                text: '没写这个功能ヾ(≧▽≦*)o',
                snackbar: false,
                color: 'success'
            },
            easing: 'easeInOutCubic',
            client_id: '2d90c0d9eb06377ef3ee97a4bb3abf71bdb23472bfcd5f9b3040240067c5192a',
            collection:[
                151521,

            ]
        }
    },
    computed:{
        target () {
            return "#top"
        },
        options () {
            return {
                duration: 1000,
                offset: 0,
                easing: this.easing
            }
        },
    },
    mounted: function () {
        var that = this
        axios({
            url : that.$url + '/api/article/get/' + that.aid,
            method:'get'
        }).then(resp=>{
            that.article = resp.data.data
            if (that.article.imageUri === '/static/image/article_default.png') {
                setTimeout(() => {
                    axios({
                        method: 'get',
                        url:'https://api.unsplash.com/photos/random?client_id='+that.client_id,
                    }).then(resp => {
                        log(that.article.imageUri = resp.data.urls["regular"])
                        that.article.imageUri = resp.data.urls["regular"]
                    })
                }, 0);
            }
            that.done = true
        })
    },
    updated: function () {
        const preEl = document.querySelectorAll('pre')
            preEl.forEach((el) => {
                hljs.highlightBlock(el)
        })
    }
}
</script>

<style>

 p > code { 
    box-shadow: none;
    background: #eeeeee;
    display: inline;
 }

 pre > code {
    color: rgba(0,0,0,0.87);
    width: 100%; 
    padding: 20px;
    font-size: 14px;
    font-family: 'Raboto mono';
    background: #fff;
 }

 pre{
     padding-bottom: 4px !important;
 }

 p > img {
     width: 80%;
 }

 .hljs{
     background: #fff;
 }

 .titleText{
    /* -webkit-text-stroke: 0.8px teal; */
 }

 .card-content{
    overflow:auto;
 }
</style>
