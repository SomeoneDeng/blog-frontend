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
            this.publishState = 1;
            var that = this
            Axios({
                method: "post",
                url: that.$url + '/api/article/add',
                headers:{
                    'authorization' : that.$store.getters.userToken
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
                    // M.toast({html: '发布失败'});
                }
                setTimeout(function () {
                    that.publishState = 0;
                },2000);
            })
        },
        getCategorys: function () {
            var that = this
            Axios({
                method: 'get',
                url: that.$url + '/api/category/all',
                headers: {
                    'authorization' : that.$store.getters.userToken
                },
            }).then(resp => that.categories = resp.data.data)
        }
    }
}
</script>
