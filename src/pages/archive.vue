<template>
    <v-container  grid-list-md fluid fill-height align-start>
        <v-layout row wrap>
            <v-flex md8 offset-md2>
                <v-layout row wrap>
                     <v-flex md8 xs12 sm12>
                        <v-progress-linear color="teal" :indeterminate="true" v-if="loading"></v-progress-linear>
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
                        <v-timeline dense clipped align-top>
                            <v-timeline-item 
                                v-bind:color="randomColor()"
                                right
                                fill-dot
                                v-for="item in archives" :key="item.date">
                                <v-card>
                                    <v-card-title primary-title>
                                        <div>
                                            <h3 class="headline mb-0">{{item.date}}</h3>
                                        </div>
                                    </v-card-title>
                                    <v-list>
                                        <v-list-tile
                                            v-for="article in item.data" 
                                            @click="toArticle(article.aid)"
                                            :key="article.aid">
                                            <!-- <v-list-tile-title>{{article.title}}</v-list-tile-title> -->
                                            <v-list-tile-content>
                                                {{article.title}}
                                            </v-list-tile-content>
                                            <v-list-tile-action>
                                                <v-chip>{{new Date(article.created).getUTCDate()+'号'}}</v-chip>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                    </v-list>
                                </v-card>
                            </v-timeline-item>
                        </v-timeline>
                    </v-flex>
                    <v-flex md4 sm12 xs12 style="margin-top: 24px;">
                        <CategoryList :catePage=false></CategoryList>
                    </v-flex>
                </v-layout> 
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import CategoryList from '../components/CategoryList.vue'
import Axios from 'axios';
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
    components:{
        CategoryList,
    },
    data(){
        return {
            loading : false,
            colors: [ 
                'red',
                'purple',
                '#4DB6AC',
                'teal',
                'yellow',
                '#303F9F',
                '#0277BD',
                '#FF9100'
              ],
            easing: 'easeInOutCubic',
        }
    },
    computed:{
        ...mapState({
            archives: state => state.archives
        }),
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
    methods:{
        ...mapMutations(['setArchives']),
        randomColor : function () {
            return this.colors[Math.floor(Math.random() * Math.floor(this.colors.length))]
        },
        getArchive:function () {
            if(this.archives.length > 0) return
            var that = this
            that.loading = true
            Axios({
                url : that.$url + '/api/article/archive',
                method:'get',
            }).then(resp => {
                that.loading = false
                that.setArchives(resp.data.data)
            })
        },
        toArticle: function (id) {
            this.$router.push({
                path: '/article',
                query: {
                    aid : id
                }
            })
        }
    },
    mounted: function () {
        this.getArchive()
    }
}
</script>
