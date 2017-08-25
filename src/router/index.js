import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'
import Index from '@/pages/Index'
import Gameroom from '@/pages/Gameroom'
import Chatroom from '@/pages/Chatroom'
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
            name: 'hello',
            component: Hello
        },
        {
            path: '/Index',
            redirect: '/Index/chat',
            component: Index,
            name: 'chat',
            children: [
                {
                    path: '/Index/chat',
                    component: Chat,
                    name: 'chat'
                },
                {
                    path: '/Index/game',
                    component: Game,
                    name: 'game'
                },
                {
                    path: '/Index/person',
                    component: Person,
                    name: 'person'
                },
            ]

        },
        {
            path: '/Chatroom',
            component: Chatroom,
            name: 'Chatroom',
        },
        {
            path: '/Gameroom',
            component: Gameroom,
            name: 'Gameroom',
        }
    ]
})
