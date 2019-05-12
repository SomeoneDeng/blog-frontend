<template>
  <v-layout row>
    <v-flex xs12 sm12>
        <v-progress-linear
            v-if="loading"
            :indeterminate="true"
            color="teal"
        ></v-progress-linear>
        <v-list subheader v-if="!loading">
          <v-list-tile
            v-for="item in nonZeroCate"
            @click="toCategory(item.id)"
            :key="item.title">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-chip color="white"  text-color="teal">{{ item.count }}</v-chip>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import { log } from 'util';
import axios from 'axios'
export default {
    props:['catePage','onGetArticle'],
    methods: {
        toCategory: function (to) {
            if (this.catePage) {
                log('in page: ',to)
                this.$emit('GetArticle',to)
                return
            }
            log('goto: ',to)
            this.$router.push({
                path: '/category',
                query: {
                    cid : to
                }
            })
        },
        getCategory: function () {
            var that = this
            that.loading = true
            axios({
                method: 'get',
                url: that.$url + '/api/category/all',
            }).then(resp=>{
                that.loading = false
                that.items = resp.data.data
            })
        }
    },
    data () {
        return {
            items: [],
            loading: false
        }
    },
    computed:{
        nonZeroCate: function () {
            return this.items.filter(i => i.count > 0)
        }
    },
    mounted : function () {
        this.getCategory()
    }
}
</script>

