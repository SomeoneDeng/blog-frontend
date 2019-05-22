<template>
    <!-- <v-navigation-drawer
    stateless
    value="true"> -->
    <v-list>
      <v-list-tile @click="()=>{$router.push('/')}">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile>

     <v-list-group
        no-action
        sub-group
        prepend-icon="edit"
        value="true">
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>编辑</v-list-tile-title>
          </v-list-tile>
        </template>

        <v-list-tile
          v-for="(ed, i) in edits"
          v-bind:to="ed[2]"
          :key="i">
          <v-list-tile-title v-text="ed[0]"></v-list-tile-title>
          <v-list-tile-action>
            <v-icon v-text="ed[1]"></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>

      <v-list-group
        sub-group
        prepend-icon="settings"
        no-action>
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>其他</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list-tile
          v-for="(od, i) in others"
          v-bind:to="od[2]"
          :key="i">
          <v-list-tile-title v-text="od[0]"></v-list-tile-title>
          <v-list-tile-action>
            <v-icon v-text="od[1]"></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list>
  <!-- </v-navigation-drawer> -->
</template>

<script>
  export default {
    data: () => ({
      edits: [
        ['新文章', 'add', '/admin/article-publish'],
        ['文章列表', 'table', '/admin/article-table'],
        ['分类', 'category', '/admin/category-panel']
      ],
      others: [
        ['一言', 'message', '/admin/hitokoto-list'],
        ['友联', 'people_outline', '/admin/'],
        ['留言', 'question_answer', '/admin/'],
        ['上传', 'backup', '/admin/upload'],
        ['设置', 'build', '/admin/']
      ]
    })
  }
</script>