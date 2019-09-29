<template>
    <v-layout row wrap>
        <v-flex md10 offset-md1 xs12 sm12>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">上传</h3>
                        <div>文件上传</div>
                    </div>
                </v-card-title>
                <v-layout row wrap>
                    <v-flex  md10 offset-md1 xs12 sm12> 
                        <uploader :options="uploadOptions" :files-submitted="onSubmitted"  class="uploader-example">
                            <uploader-unsupport></uploader-unsupport>
                            <uploader-drop>
                                <p>拖拽文件到这里，或</p>
                                <uploader-btn>选择文件</uploader-btn>
                            </uploader-drop>
                            <uploader-list></uploader-list>
                        </uploader>
                    </v-flex>
                </v-layout>
                
            </v-card>
        </v-flex>

        <v-flex md10 offset-md1 xs12 sm12>
            <v-card>
                <v-card-title primary-title>
                    <v-layout row wrap>
                        <v-flex md11 xs10 sm10>
                            <div class="headline mb-0">文件列表</div>
                        </v-flex>
                        <v-flex md1  xs2 sm2>
                            <v-btn small color="primary" @click="getDir">刷新</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="files"
                    sort
                    :loading="loading"
                    item-key="Id">
                <template v-slot:items="props">
                    <tr @click="props.expanded = !props.expanded">
                    <td class="text-md-center text-xs-center text-sm-center">{{ props.item.Id }}</td>
                    <td class="text-md-center text-xs-center text-sm-center">{{ props.item.Name }}</td>
                    <td class="text-md-center text-xs-center text-sm-center">{{ props.item.Md5 }}</td>
                    <td class="text-md-center text-xs-center text-sm-center">{{ props.item.Path }}</td>
                    <td class="text-md-center text-xs-center text-sm-center"><a :href="props.item.Download" target="blank">下载</a></td>
                    </tr>
                </template>
                <!-- <template v-slot:expand="props">
                    <v-card flat dense>
                    <v-btn block color="error" dark @click="deleteDialog(props.item.aid)">删除</v-btn>
                    <v-btn block color="orange" dark>编辑</v-btn>
                    </v-card>
                </template>  -->
                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
</template>


<script>
import Axios from 'axios';
import { log } from 'util';
export default {
    data() {
        return {
            uploadOptions: {
                target: this.$url + "/upload",
                fileParameterName: 'file',
                testChunks: false,
                fileAdded: this.onFileAdded
            },
            headers: [
                { text: 'Id', value: 'id' },
                { text: '文件名', value: 'Name' },
                { text: 'Md5', value: 'Md5' },
                { text: '文件路径', value: 'Path' },
                { text: '下载', value: 'Download' },
            ],
            files: [],
            loading : false      
        }
    },
    methods: {
        checkMd5 : function () {
            var that = this
            Axios({
                url : that.$url + '/md5-check?md5=2dec646919479928e4849cb3c35a88a3',
                method: 'get',
            }).then(resp => {
                log(resp)
            })
        },
        onSubmitted: function (files, event) {
            log(files,event)
        },
        getDir: function () {
            var that = this
            that.files = []
            that.loading = true
            Axios({
                url: that.$url + '/wdnmdir',
                method: 'get'
            }).then(resp => {
                for (const f of resp.data) {
                    f.Download = that.$url + '/uploads' + f.Path
                    that.files.push(f)
                }
                that.loading = false
                // that.files = resp.data
            })
        }
    },
    mounted: function () {
        this.getDir()
    }
}
</script>