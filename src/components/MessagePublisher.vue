<template>
    <v-layout row justify-center>
    <v-snackbar
      v-model="snack.snackbar"
      right
      multi-line
      :color="snack.color"
      :timeout="1000"
      top>
      <v-spacer></v-spacer> {{ snack.text }}<v-spacer></v-spacer> 
    </v-snackbar>
    <v-dialog v-model="dialog" persistent max-width="600px">
      
      <v-card>
        <v-card-title>
          <span class="headline teal--text" color="teal darken-2">新留言</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="msg.name" color="teal lighten-2" label="尊姓大名" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="msg.mail"  color="teal lighten-2"  label="邮箱" hint="非必要" ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="msg.link"  color="teal lighten-2"  label="网站" hint="非必要" type="text"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="msg.image"  color="teal lighten-2"  label="头像链接" hint="非必要" type="text"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  name="input-7-1"
                  label="内容"
                  color="teal"
                  value=""
                  v-model="msg.content" 
                  hint="支持markdown语法"
                ></v-textarea>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  name="name"
                  label="验证码"
                  color="teal"
                  hint="点击刷新验证码"
                  id="id"
                  v-model="checkcode"
                ></v-text-field>
              </v-flex>
              <v-flex xs4>
                <img v-bind:src="codeSrc" @click="getImg" alt="alt">
              </v-flex>
            </v-layout>
          </v-container>
          <small>* 你的邮箱不会被公开，当然也可以不输</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="closeDialog(undefined)">取消</v-btn>
          <v-btn color="blue darken-1" flat @click="postMsg">提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Axios from 'axios'
import { log } from 'util'
export default {
  props: ['dialog'],
  data: () => ({
    codeSrc: null,
    checkcode: "",
    msg: {
      code: "",
      name: "",
      content: "",
      image: "/static/image/huaji.png",
      link: "",
      mail: ""
    },
    snack: {
        text: '提交成功',
        snackbar: false,
        color: 'success'
      },
    }),
  methods:{
    closeDialog:function (data) {
      this.$emit('close', data)
      this.dialog = false
    },
    getImg:function () {
      var that = this
      Axios({
        url : that.$url + '/api/kaptcha',
        method: 'get',
        responseType: 'blob'
      }).then(resp => {
        var blob=new Blob(); 
        blob=resp.data;
        that.codeSrc = window.URL.createObjectURL(blob);
        that.msg.code = resp.headers['code']+":"
      })
    },
    postMsg:function () {
      var that = this

      Axios({
        url: that.$url + '/api/message/add',
        method: 'post',
        data: {
          name: that.msg.name,
          content: that.msg.content,
          image: that.msg.image,
          code: that.msg.code + that.checkcode,
          link: that.msg.link,
          mail: that.msg.mail
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(resp => {
        log(resp.data)
        if (resp.data.status === 403 || resp.data.status === 404) {
          that.snack = {
            text: resp.data.msg,
            snackbar: true,
            color: 'error'
          }
          that.errMsg = resp.data.msg
        }else if(resp.data.status === 200){
          that.snack = {
            text: '提交成功',
            snackbar: true,
            color: 'success'
          }
          that.closeDialog(resp.data.data)
        }
      })
    }
  }
}
</script>
