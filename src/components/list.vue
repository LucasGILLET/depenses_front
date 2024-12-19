<template>
	<div>
		<div class="flex flex-col bg-slate-400 w-full">
			<div class="mx-40 my-4 gap-4">
				<div class="flex text-3xl font-semibold">This is my list view</div>
			</div>
			<div class="mx-40 my-4 gap-4">
				<ul>
					<li v-for="(item, index) in values" :key="index" class="mb-4 p-4 bg-white rounded shadow">
						<h3 class="text-xl font-bold">{{ item.name }}</h3>
						<p class="text-gray-700">Value: {{ item.value }}</p>
						<p class="text-gray-700">Description: {{ item.description }}</p>
						<p class="text-gray-700">Tags: {{ item.tags.join(", ") }}</p>
						<p class="text-gray-700">Date: {{ item.date.toLocaleDateString() }}</p>
						<button @click="removeItem(item)" class="mt-2 px-4 py-2 bg-red-500 text-white rounded">Remove</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import { useListStore } from "../stores/list";

	const listStore = useListStore();
	const values = ref([]);

	onMounted(() => {
		listStore.fetchList();
		values.value = listStore.myList;
		console.log(values.value);
	});

	const removeItem = async (item) => {
		const newList = await listStore.removeFromList(item);
		values.value = newList;
	};
</script>
