<template>
    <v-container grid-list-md fluid fill-height align-start>
        <v-layout row wrap>
            <v-flex md8 sm12 xs12>
                <v-progress-linear color="teal" :indeterminate="true" v-if="loading"></v-progress-linear>
                <v-list subheader grid-list-sm >
                    <v-hover v-for="item in items" :key="item.title" style="cursor: pointer;" >
                        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" color="#ffffff"  style="margin-bottom:20px;" @click="toArticle(item.aid)">
                            <v-card-title primary-title >
                            <v-container fluid grid-list-xs>
                                <h3 class="headline mb-0 teal--text">{{item.title}}</h3>
                                <v-divider></v-divider>
                                <div style="margin-top:10px;overflow:hidden; white-space:nowrap; text-overflow:ellipsis"> {{ item.description }} </div>
                            </v-container>
                            </v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-chip color="teal darken-1" small text-color="white">{{dateFormate(item.created)}}</v-chip>
                            </v-card-actions>
                        </v-card>
                    </v-hover>
                </v-list>
            </v-flex>
            <v-flex md4 sm12 xs12>
                <CategoryList :catePage=true v-on:GetArticle="getArticle"></CategoryList>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { log } from 'util';
import Axios from 'axios'
import CategoryList from '../components/CategoryList.vue'
export default {
    components:{
        CategoryList
    },
    data: function () {
        return {
            cid: this.$route.query.cid,
            items: [],
            loading: false
        }
    },
    methods:{
        getArticle: function (cid) {
            var that = this
            this.loading = true
            Axios({
                url : that.$url + '/api/article/category/' + cid,
                method:'get'
            }).then(resp => {
                that.loading = false
                that.items = resp.data.data.reverse()
            })
        },
        toArticle: function (id) {
            this.$router.push({
                path: '/article',
                query: {
                    aid : id
                }
            })
        },
        dateFormate: function(hisTime){
            hisTime = new Date(hisTime).getTime()
            var now = new Date().getTime(),
            diffValue = now - hisTime,
            result='',
            minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            month = day * 30,
            year = month * 12,
            
            _year = diffValue/year,
            _month =diffValue/month,
            _week =diffValue/(7*day),
            _day =diffValue/day,
            _hour =diffValue/hour,
            _min =diffValue/minute;
                
            // log(now, hisTime, diffValue)

            if(_year>=1) result=parseInt(_year) + "年前";
            else if(_month>=1) result=parseInt(_month) + "个月前";
            else if(_week>=1) result=parseInt(_week) + "周前";
            else if(_day>=1) result=parseInt(_day) +"天前";
            else if(_hour>=1) result=parseInt(_hour) +"个小时前";
            else if(_min>=1) result=parseInt(_min) +"分钟前";
            else result="刚刚";
            return result;
        },
    },
    mounted: function () {
        log(this.cid)
        this.getArticle(this.cid)
    }
}
</script>
