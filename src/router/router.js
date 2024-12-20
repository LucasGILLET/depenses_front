import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "../components/Layouts/DefaultLayout.vue";
import HomeView from "../views/Home.vue";
import AddView from "../views/Add.vue";

const routes = [
	{
		path: "/",
		component: DefaultLayout, // Utilisation du layout
		meta: { isGuest: true },
		children: [
			{
				path: "",
				name: "Home",
				component: HomeView // Composant pour la route '/'
			},
			{
				path: "add",
				name: "Add",
				component: AddView // Composant pour la route '/add'
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
