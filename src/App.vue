<template>
  <v-app id="inspire">
    <MainDrawer v-model="drawer"></MainDrawer>
    <v-toolbar color="teal" dark fixed app>
      <v-toolbar-items>
        <v-btn flat class="hidden-sm-and-down" >Shirakami</v-btn>
      </v-toolbar-items>
      <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat class="hidden-md-and-up">Shirakami</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(item, index) in toolBtns" :key="index" flat v-bind:to="item.to">{{item.title}}</v-btn>
      </v-toolbar-items>
      </v-toolbar>
      <v-content>
          <router-view></router-view>
      </v-content>
    </v-app>
</template>

<script>
const script = document.createElement('script')
script.type = 'text/javaScript'
//var text = script.textContent //|| script.innerText;
document.body.appendChild(script)
script.innerText = `var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1276226627'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s5.cnzz.com/z_stat.php%3Fid%3D1276226627%26show%3Dpic1' type='text/javascript'%3E%3C/script%3E"));`
import 'vuetify/dist/vuetify.min.css' 
import MainDrawer from './components/MainDrawer.vue'
export default {
  name: 'app',
  components:{
    MainDrawer
  },
  data: () => ({
    drawer: false,
    toolBtns: [
          { title: 'Home', icon: 'home' , to: '/'},
          { title: '归档', icon: 'archive', to: '/archive' },
          { title: '留言', icon: 'message' , to: '/message'},
          { title: '关于', icon: 'info', to: '/about' }
        ],
  }),
  mounted: function () {
    
  }
}
</script>
