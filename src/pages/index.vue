<template> 
    <v-container fluid fill-height>
        <v-layout wrap>
            <v-flex xs12 sm12 md2>
                <InfoPanel></InfoPanel>
            </v-flex>
            <v-flex xs12 sm12 md8>
                <TopArticleList></TopArticleList>
            </v-flex>
            <v-flex xs12 sm12 md2>
                <CategoryList :catePage=false></CategoryList>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import CategoryList from '../components/CategoryList.vue'
import TopArticleList from '../components/TopArticleList.vue'
import InfoPanel from '../components/InfoPanel.vue'
export default {
    components:{
        CategoryList,
        TopArticleList,
        InfoPanel
    },
    data(){
        return {
            name: 'dqn',
        }
    }
}
</script>
