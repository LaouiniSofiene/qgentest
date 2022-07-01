import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddUserView from '../views/AddUserView.vue'
import UpdateUserView from '../views/UpdateUserView.vue'
import UserListView from '../views/UserListView.vue'
import DeleteUserView from '../views/DeleteUserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserListView
    },
    {
      path: '/add',
      name: 'add',
      component: AddUserView
    },
    {
      path: '/update/:id',
      name: 'update',
      component: UpdateUserView
    },
    {
      path: '/delete/:id',
      name: 'delete',
      component: DeleteUserView
    }
  ]
})

export default router
