<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex md10 offset-md1>
                <v-card>
                    <v-card-title>
                    <span class="headline">新文章</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-text-field color="teal" v-model="article.title" label="标题*" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field color="teal" v-model="article.description" label="描述*" hint="example of helper text only on focus"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea
                                    required
                                    color="teal"
                                    clearable
                                    auto-grow
                                    label="内容*"
                                    textarea
                                    v-model="article.content"
                                ></v-textarea>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-select
                                    color="teal" 
                                    :items="categories"
                                    item-text="name"
                                    item-value="id"
                                    label="分类*"
                                    required
                                    flat
                                    v-model="article.category"
                                >
                                </v-select>  
                            </v-flex>
                            <v-flex xs12 sm6 md8>
                                <v-text-field color="teal" v-model="article.tags" placeholder="例如：java,小程序" label="标签*" hint="英文逗号隔开'" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md8>
                                <v-text-field color="teal" v-model="article.image_uri" placeholder="/static/image/article_default.png" label="标签*" hint="英文逗号隔开'" required></v-text-field>
                            </v-flex>
                            <v-flex xs1>
                                <v-checkbox label="可评论" v-model="article.commentable" color="teal" ></v-checkbox>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small class="teal--text">*表示必填</small>
                    <v-dialog
                        v-model="dialog"
                        hide-overlay
                        persistent
                        width="300">
                        <v-card
                            v-bind:color="dialogClr"
                            dark>
                            <v-card-text class="text-lg-center text-md-center text-xs-center">
                                {{dialogMsg}}
                            <v-progress-linear v-if="publishState == 1"
                                indeterminate
                                color="white"
                                class="mb-0">
                            </v-progress-linear>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="teal darken-1 white--text" @click="publish">发布</v-btn>
                        <v-btn color="teal darken-1" flat>草稿</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Axios from 'axios';
import { log } from 'util';
import { mapState } from 'vuex'
export default {
    data() {
        return {
            categories: [],
            article: {
                title:'',
                content:'',
                category: 0,
                tags:'',
                image_uri:'/static/image/article_default.png',
                commentable:true,
                description: "作者很懒，没有描述~~~",
            },
            // 0 common , 1 publishing , 2 failed , 3 success
            publishState:0,      
            errMsg: ""
        }
    },
    computed: {
        ...mapState({
            token : state => state.token
        }),
        dialog: function () {
            return this.publishState != 0
        },
        dialogMsg : function () {
            if (this.publishState === 1) return "发布中"
            if (this.publishState === 2) return this.errMsg
            if (this.publishState === 3) return "发布成功"
            return ""
        },
        dialogClr: function () {
            if (this.publishState === 1) return "primary"
            if (this.publishState === 2) return "red"
            if (this.publishState === 3) return "success"
            return "primary"
        }
    },
    mounted: function () {
        this.getCategorys()
    },
    methods:{
        cateSelectChange: function (e) {
            log(e)
        },
        publish: function () {
            if (this.publishState === 1) {
                return
            }
            this.publishState = 1;
            var that = this
            if (this.checkArticle()){
                setTimeout(() => {
                    that.publishState = 0
                    that.errMsg = ""
                }, 3000);
                return
            }
            Axios({
                method: "post",
                url: that.$url + '/api/article/add',
                headers:{
                    'authorization' : that.token
                },
                data:{
                    title: that.article.title,
                    description: that.article.description,
                    content: that.article.content,
                    imageUri: that.article.image_uri,
                    tags: that.article.tags,
                    clicks: 0,
                    istopped: false,
                    iscommentable: that.article.commentable,
                    categoryid:that.article.category
                },
                transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
                }],
            }).then(resp => {
                log(resp.data)
                if (resp.status == 200 || resp.msg == 'ok') {
                    that.publishState = 3;
                }else {
                    that.publishState = 2;
                    that.errMsg = resp.msg
                }
                setTimeout(() => {
                    that.publishState = 0
                    that.errMsg = ""
                }, 3000);
            })
        },
        getCategorys: function () {
            var that = this
            Axios({
                method: 'get',
                url: that.$url + '/api/category/all',
                headers: {
                    'authorization' : that.token
                },
            }).then(resp => that.categories = resp.data.data)
        },
        // return true if article validate error
        checkArticle: function () {
            var that = this
            if (that.article.title === "" || that.article.title === undefined) {
                that.publishState = 2
                that.errMsg = "标题为空"
                return true
            }
            if (that.article.content === "" || that.article.content === undefined) {
                that.publishState = 2
                that.errMsg = "内容为空"
                return true
            }
            return false
        }
    }
}
</script>
