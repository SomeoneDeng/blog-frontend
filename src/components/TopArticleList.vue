<template>
    <v-layout row>
    <v-flex xs12 sm12 md12>
        <v-progress-linear
                v-if="loading"
                :indeterminate="true"
                color="teal"
            ></v-progress-linear>
        <v-list subheader grid-list-sm v-if="!loading">
            <v-hover v-for="item in topArticles" :key="item.title" style="cursor: pointer;" >
                <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" color="#ffffff"  style="margin-bottom:8px;" @click="toArticle(item.aid)">
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
  </v-layout>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
    methods:{
        ...mapMutations(['setTopArticles']),
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
        toArticle: function (id) {
            this.$router.push({
                path: '/article',
                query: {
                    aid : id
                }
            })
        },
        getArticle: function () {
            var that = this
            if (that.topArticles.length > 0) return
            that.loading = true
            axios({
                url : that.$url + '/api/article/get/page/0/size/10/order/aid/direct/desc/',
                method:'get'
            }).then(resp=>{
                that.loading = false
                that.setTopArticles(resp.data.data.content)
            })
        }
    },
    data(){ return {
            loading : false
        }
    },
    computed: {
        ...mapState({
            topArticles: state => state.topArticles
        }),
    },
    mounted: function () {
        this.getArticle()
    }
}
</script>
