<template>
	<div>
		<div class="flex flex-col bg-slate-400 w-full min-h-screen">
			<div class="mx-4 sm:mx-8 md:mx-16 lg:mx-40 my-4 gap-4">
				<div class="flex text-3xl font-semibold justify-center">Liste de mes dépenses</div>
			</div>
			<div class="mx-4 sm:mx-8 md:mx-16 lg:mx-40 my-4 gap-4">
				<ul class="space-y-4">
					<li
						v-for="(item, index) in listStore.myList"
						:key="index"
						class="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all"
					>
						<h3 class="text-xl font-bold mb-2">{{ item.name }}</h3>
						<p class="text-gray-700 mb-1">Value: {{ item.value }} €</p>
						<p class="text-gray-700 mb-1">Description: {{ item.description }}</p>
						<p class="text-gray-700 mb-1">Catégorie: {{ item.category }}</p>
						<p class="text-gray-700 mb-1">Date: {{ new Date(item.date).toLocaleDateString() }}</p>
						<button
							@click="removeItem(item)"
							class="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
						>
							Remove
						</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useListStore } from "../stores/list";

	const listStore = useListStore();

	const removeItem = async (item) => {
		const newList = await listStore.removeFromList(item);
	};
</script>
