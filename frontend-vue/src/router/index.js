import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../views/courses/CoursesView.vue')
  },
  {
    path: '/courses/:id',
    name: 'Course',
    component: () => import('../views/courses/CourseView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/admin',
    name: 'AdminView',
    component: () => import('../views/admin/AdminView.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },  
  {
    path: '/admin/users',
    name: 'UserList',
    component: () => import('../views/admin/UserListView.vue')
  },  
  {
    path: '/admin/courses',
    name: 'CourseList',
    component: () => import('../views/admin/CourseListView.vue')
  },
  {
    path: '/admin/users/:id/edit',
    name: 'UserEdit',
    component: () => import('../views/admin/UserEditView.vue')
  },
  {
    path: '/admin/courses/create',
    name: 'CourseCreate',
    component: () => import('../views/admin/CourseCreateView.vue')
  },
  {
    path: '/admin/courses/:id/edit',
    name: 'CourseEdit',
    component: () => import('../views/admin/CourseEditView.vue')
  },
  //redirect
  {
    path: '/redirect-me',
    redirect: '/'
  },
  //catch all 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
