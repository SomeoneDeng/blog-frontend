<template>
    <v-container grid-list-md fill-height align-start>
        <v-layout row wrap>
            <v-flex md10>
                <canvas id="pic" width="1270" height="900"></canvas>
            </v-flex>
            <v-flex md2>
                <h1 class="teal--text">随便画一下</h1>
                <label for="colorpanel">画笔颜色: </label>
                <colorPicker id="colorpanel" v-model="penColor" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Axios from 'axios';
import { log } from 'util';
export default {
    data(){
        return {
            points: [],
            isKeyDown: false,
            can: null,
            ctx: null,
            img: null,
            penColor: "#000000"
        }
    },
    methods:{
        onMouseDown: function () {
            this.isKeyDown = true
            this.ctx.beginPath()
            this.points = []
        },
        onMouseUp: function () {
            this.isKeyDown = false
            this.ctx.closePath()
            // send points
            Axios({
                url: this.$url + "/draw",
                method: "post",
                data: {points: this.points},
            }).then(resp => {
                log(resp)
                this.img.src = this.$url + "/pic"
            })
        },
        onMouseMove: function (e) {
            if (this.isKeyDown) {
                this.ctx.fillStyle = "#1230ff"
                var rect = this.can.getBoundingClientRect()
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top; 
                this.ctx.lineWidth = 1;
                log("key move [", e.clientX, ", " , e.clientY,"], [", x, ",", y, "]")
                this.ctx.lineTo(Math.round(x),Math.round(y))
                this.ctx.stroke()
                x = Math.round(1920 * ( x / 1270))
                y = Math.round(1080 * ( y / 900))
                this.points.push({
                    "x": x,
                    "y": y,
                    "color": this.penColor.substr(1)
                })
            } 
        },
        createPat: function () {
            this.ctx.strokeStyle = this.penColor
            this.ctx.fillRect(0,0,this.can.width,this.can.height)
            this.ctx.drawImage(this.img, 0,0,1270,900)
        }
    },
    mounted: function () {
        this.can = document.getElementById("pic")
        this.ctx = this.can.getContext("2d")
        this.img = new Image()
        this.img.src = this.$url + "/pic"
        this.img.onload = this.createPat

        this.can.addEventListener("mousedown", this.onMouseDown)
        this.can.addEventListener("mouseup", this.onMouseUp)
        this.can.addEventListener("mousemove", this.onMouseMove)


    }
}
</script>