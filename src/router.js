import Vue from "vue";
import VueRouter from "vue-router";

import Index from "./pages/index.vue";
import Archive from "./pages/archive.vue"
import Article from "./pages/article.vue"
import Category from "./pages/category.vue"
import Friends from "./pages/friends.vue"
import Message from "./pages/message.vue"
import About from "./pages/about.vue"
import Admin from "./pages/admin.vue"

import ArticlePublish from './components/admin/ArticlePublish.vue'
import ArticleTable from './components/admin/ArticleTable.vue'
import CategoryPanel from './components/admin/CategoryPanel.vue'

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'index',
		component: Index
    },
    {
        path: '/archive',
        name:'archive',
        component: Archive
    },
    {
        path: '/article',
        name:'article',
        component: Article
    },
    {
        path: '/category',
        name:'category',
        component: Category
    },
    {
        path: '/friends',
        name:'friends',
        component: Friends
    },
    {
        path: '/message',
        name:'message',
        component: Message
    },
    {
        path: '/about',
        name:'about',
        component: About
    },
    {
        path: '/admin',
        name:'admin',
        component: Admin,
        children :[
            {
                path: 'article-publish',
                component: ArticlePublish
            },
            {
                path: 'article-table',
                component: ArticleTable
            },
            {
                path: 'category-panel',
                component: CategoryPanel
            },
            {
                path: 'article-table',
                component: ArticleTable
            }
        ]
    }
]

let router = new VueRouter({
	routes
})

export default router;