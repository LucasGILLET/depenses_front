<template>
	<h1>Hello App!</h1>
	<p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
	<nav class="flex flex-row gap-4">
		<RouterLink to="/test">Go to TEST</RouterLink>
		<RouterLink to="/test/add">Go to TEST ADD</RouterLink>
	</nav>
	<main class="bg-slate-400 w-full">
		<RouterView />
	</main>
</template>
