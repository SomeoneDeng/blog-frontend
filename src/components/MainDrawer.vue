<template>
    <v-navigation-drawer
        v-bind:value="value" 
        v-on:input="$emit('input', $event)"
        fixed
        app
        temporary>
        <v-list class="pa-1">
            <v-list-tile avatar>
            <v-list-tile-avatar>
                <img src="https://shirakamifubuki.com/static/image/headimg.jpeg">
            </v-list-tile-avatar>

            <v-list-tile-content>
                <v-list-tile-title>Someone Deng</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
            <v-divider></v-divider>

            <v-list-tile
            v-for="item in toolBtns"
            :key="item.title"
            v-bind:to="item.to"
            >
            <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data () {
      return {
        toolBtns: [
          { title: 'Home', icon: 'home' , to: '/'},
          { title: '归档', icon: 'archive', to: '/archive' },
        //   { title: '好友', icon: 'people' , to: '/friends'},
          { title: '留言', icon: 'message' , to: '/message'},
          { title: '关于', icon: 'info', to: '/about' }
        ],
      }
    }
}
</script>
