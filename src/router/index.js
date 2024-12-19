import { createRouter, createWebHistory } from "vue-router";

import test from "../components/test.vue";
import HomeView from "../views/Home.vue";
import TestAddView from "../views/TestAdd.vue";

const routes = [
	{
		path: "/",
		component: test, // Utilisation du layout
		meta: { isGuest: true },
		children: [
			{
				path: "test",
				name: "test",
				component: HomeView // Composant pour la route '/'
			},
			{
				path: "test/add",
				name: "testAdd",
				component: TestAddView // Composant pour la route '/'
			}
		]
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore()
//   const authUser = JSON.parse(localStorage.getItem('authUser') || '{}')

//   if (authUser?.token) {
//     userStore.authUser = authUser
//   }

//   if (to.meta.requiresAuth && !userStore.authUser.token) {
//     next({ name: 'login' })
//   } else if (userStore.authUser.token && to.meta.isGuest) {
//     next({ name: 'home' })
//   } else {
//     next()
//   }
// })

export default router;
