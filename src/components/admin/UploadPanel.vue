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
            }      
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
        onFileAdded: function (files, event) {
            log(files,event)
        }
    },
}
</script>