<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md10 offset-md1>
        <v-toolbar flat color="white">
          <v-toolbar-title>文章列表</v-toolbar-title>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="articles"
    
          sort
          item-key="aid">
          <template v-slot:items="props">
            <tr @click="props.expanded = !props.expanded">
              <td class="text-md-center text-xs-center text-sm-center">{{ props.item.aid }}</td>
              <td class="text-md-center text-xs-center text-sm-center">{{ props.item.title }}</td>
              <td class="text-md-center text-xs-center text-sm-center">{{ props.item.created }}</td>
            </tr>
          </template>
          <template v-slot:expand="props">
            <v-card flat dense>
              <v-btn block color="error" dark @click="deleteDialog(props.item.aid)">删除</v-btn>
              <v-btn block color="orange" dark>编辑</v-btn>
            </v-card>
          </template> 
        </v-data-table>
      </v-flex>
    </v-layout> 
    <v-dialog v-model="dialog" persistent max-width="460">
      <v-card>
        <v-card-title class="headline">确认删除文章【id: {{deleteTarget}}】?</v-card-title>
        <v-card-text>不可逆转的操作.</v-card-text>
        <v-card-text v-if="errorMsg != ''" class="red--text">
          {{errorMsg}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" flat @click="dialog = false">取消</v-btn>
          <v-btn color="green darken-1 white--text"  @click="deleteArticle">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>   
  </v-container>
</template>

<script>
import Axios from 'axios';
export default {
  data () {
    return {
      deleting: false,
      deleteTarget: 0,
      dialog: false,
      errorMsg: '',
      headers: [
        { text: 'Id', value: 'id' },
        { text: '标题', value: 'title' },
        { text: '创建时间', value: 'created' },
      ],
      articles: [],
      currentPage:0,
      pageSize:10000,
      totalPage:0,
      totalArticles: 0,
      order:'asc'
    }
  },
  mounted() {
    this.getArticlePage()
  },
  methods: {
    deleteDialog: function (aid) {
      this.dialog = true
      this.deleteTarget = aid
    },
    getArticlePage: function () {
      var that = this;
      Axios({
        url : that.$url + '/api/article/get/page/' +
          that.currentPage +
          '/size/' +
          that.pageSize +
          '/order/aid/direct/'+that.order,
        headers : {
          'authorization' : that.$store.getters.userToken
        }
      }).then(resp => {
        if (resp.status === 200) {
          that.articles = resp.data.data.content;
          that.currentPage = resp.data.data.pageable.pageNumber;
          that.totalPage = resp.data.data.totalPages;
          that.totalArticles = resp.data.data.totalElements;
        }else {
          if (that.currentPage < 0) {
              that.currentPage = 0;
          } else if (that.currentPage >= that.totalPage - 1) {
              that.currentPage = that.totalPage - 1;
          }
        }
      })
    },
    deleteArticle: function () {
      var that = this;
      if (that.deleting === true) return
      that.deleting = true
      Axios({
        url: that.$url + "/api/article/del",
        headers:{
          'authorization': that.$store.getters.userToken
        },
        data:{
          id: that.deleteTarget
        },
        transformRequest: [
          function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }
        ],
        method: 'post'
      }).then(resp => {
        if (resp.status === 200) {
            that.getArticlePage();
        } else {
            that.errorMsg = '删除失败'
        }
        setTimeout(() => {
          that.dialog = false
          that.deleting = false
        }, 2000);
      })
    }
  }
}
</script>