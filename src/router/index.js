import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'
import Index from '@/pages/Index'
import Chat from '@/pages/Chat'
import Game from '@/pages/Game'
import Person from '@/pages/Person'
import Login from '@/components/Login'
import Register from '@/components/Register'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/Index',
            component: Index,
            children: [
                {
                    path: '/Index/chat',
                    component: Chat,
                },
                {
                    path: '/Index/game',
                    component: Game,
                },
                {
                    path: '/Index/person',
                    component: Person,
                },
            ]

        },
    ]
})
