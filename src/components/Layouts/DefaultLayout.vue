<template>
	<nav class="flex flex-col sm:flex-row gap-4 bg-slate-500 text-3xl justify-around py-4 sm:py-1 px-4">
		<!-- Lien Voir mes dépenses -->
		<RouterLink
			to="/"
			class="py-2 px-8 sm:px-40 rounded-md shadow-md duration-200 transition-all ease-in-out hover:bg-blue-600 font-semibold text-center"
			:class="{ 'bg-blue-500': route.path === '/', 'bg-gray-400': route.path !== '/' }"
		>
			Voir mes dépenses
		</RouterLink>

		<!-- Lien Ajouter une dépense -->
		<RouterLink
			to="/add"
			class="py-2 px-8 sm:px-40 rounded-md shadow-md duration-200 transition-all ease-in-out hover:bg-blue-600 font-semibold text-center"
			:class="{ 'bg-blue-500': route.path === '/add', 'bg-gray-400/80': route.path !== '/add' }"
		>
			Ajouter une dépense
		</RouterLink>
	</nav>

	<main class="bg-slate-400 w-full">
		<RouterView />
	</main>
</template>

<script setup>
	import { useRoute } from "vue-router";

	const route = useRoute();
</script>
