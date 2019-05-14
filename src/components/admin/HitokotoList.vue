<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex md10 offset-md1>
                <v-toolbar flat color="white">
                <v-toolbar-title>一言</v-toolbar-title>
                <v-spacer></v-spacer>
                <button  @click="checkall" color="success">CheckAll</button>
                </v-toolbar>
                <v-data-table
                    :headers="headers"
                    :items="uncheckKotos"
                    item-key="id">
                <template v-slot:items="props">
                    <tr @click="props.expanded = !props.expanded">
                    <td class="text-md-center text-xs-center text-sm-center">{{ props.item.id }}</td>
                    <td class="text-md-center text-xs-center text-sm-center">{{ props.item.hito }}</td>
                    <td class="text-md-center text-xs-center text-sm-center">{{ props.item.koto }}</td>
                    <td class="text-md-center text-xs-center text-sm-center">{{ props.item.comes }}</td>
                    <td class="text-md-center text-xs-center text-sm-center">{{ new Date(props.item.createdAt) }}</td>
                    </tr>
                </template>
                <template v-slot:expand="props">
                    <v-card flat dense>
                    <v-btn block color="success" @click="checKoto(props.item.id)" dark >通过</v-btn>
                    <v-btn block color="error" dark>删除</v-btn>
                    </v-card>
                </template> 
                </v-data-table>
            </v-flex>
        </v-layout> 
    </v-container>
</template>

<script>
import Axios from 'axios';
import { log } from 'util';
import { mapState,mapMutations } from 'vuex'
export default {
    data() {
        return {
            headers: [
                { text: 'Id', value: 'id' },
                { text: 'hito', value: 'hito' },
                { text: 'koto', value: 'koto' },
                { text: 'comes', value: 'comes' },
                { text: 'created', value: 'createdAt' },        
            ],
        }
    },
    computed: {
        ...mapState({
            uncheckKotos: state=>state.uncheckHitokoTo,
            token : state => state.token
        })
    },
    mounted() {
        this.getUnCheckKotos()
    },
    methods: {
        ...mapMutations(['deleteHitokoto','uncheckHitokoTo']),
        getUnCheckKotos: function () {
            var that = this
            // 这样不会每次都请求
            if (this.uncheckKotos.length === 0){
                Axios({
                    url: that.$url + '/api/hitokoto/get/closed',
                    method: 'get',
                    headers: {
                        'authorization' : that.token
                    }
                }).then(resp => {
                    log(resp.data)
                    that.uncheckHitokoTo(resp.data.data)  
                })
            }
        },
        checKoto: function (id) {
            var that = this
            Axios({
                url : that.$url + '/api/hitokoto/check?id='+id + "&check=true",
                method : 'get',
                headers : {
                    'authorization' : that.token
                }
            }).then(resp => {
                if (resp.data.status === 200) {
                    that.deleteHitokoto(id)
                }
            })
        },
        checkall: function () {
            var that = this
            that.uncheckKotos.forEach(k => {
                that.checKoto(k.id)
            });     
        }
    },
}
</script>
