<template>
  <v-layout row justify-center>
    <v-dialog v-model="open" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Administrator Login</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md >
            <v-layout wrap>
              <v-flex xs12 >
                <v-text-field label="User" v-model="username" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="closeLogin('')">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="login">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>



<script>
// import { log } from 'util';
import Axios from 'axios'
export default {
    props: ['dialog'],
    data() {
        return {
            open: false,
            username: '',
            password: ''
        }
    },
    watch:{
        dialog(v){
            this.open = v
        }
    },
    methods:{
        closeLogin: function (token) {
            this.open = false
            this.$emit('close',token)
        },
        login: function () {
            var that = this
            Axios({
                url: that.$url + '/api/user/login',
                method: 'post',
                data:{
                    'name': that.username,
                    'password': that.password
                }
            }).then(resp => {
                if (resp.data.status === 200) {
                    that.closeLogin(resp.data.data)
                } else {
                    that.$router.push('/')
                }
            })
        }
    }
}
</script>
