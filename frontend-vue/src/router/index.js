import tokenService from '@/services/token.service';
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
    path: '/admin/users/:id/edit',
    name: 'UserEdit',
    component: () => import('../views/admin/UserEditView.vue')
  },
  {
    path: '/staff/courses',
    name: 'CourseList',
    component: () => import('../views/admin/CourseListView.vue')
  },
  {
    path: '/staff/courses/create',
    name: 'CourseCreate',
    component: () => import('../views/admin/CourseCreateView.vue')
  },
  {
    path: '/staff/courses/:id/edit',
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
router.beforeEach((to, from, next) => {
  const restrictedPages = ['/profile'];
  const staffPage = '/staff';
  const superUserPage = '/admin';

  let authRequired = false
  let staffRequired = false
  let superUserRequired = false

  restrictedPages.forEach(restrictedPage => {
    if(to.path.startsWith(restrictedPage))
    authRequired = true
  });

  if(to.path.startsWith(staffPage)){
    staffRequired = true
  }

  if(to.path.startsWith(superUserPage)){
    superUserRequired = true
  }

  // const authRequired = restrictedPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  const userData = tokenService.getUserData()

  // trying to access a restricted page + not logged in
  // redirect to login page
  if ((authRequired || staffRequired || superUserRequired) && !userData) {
    next('/login');
  } else if(staffRequired && !userData.is_staff){
    next('/');
  } else if (superUserRequired && !userData.is_superuser){
    next('/');
  } else {
    next();
  }

});
export default router
