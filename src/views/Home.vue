<template>
	<div class="flex flex-col bg-slate-400 w-full min-h-screen">
		<div class="m-40 gap-5">
			<div class="flex font-semibold text-3xl">This is my home view</div>
			<list />
			<button @click="addItem" class="mt-5 p-2 bg-blue-500 text-white rounded">Add Item</button>
		</div>
		<div>
			<piechart />
		</div>
	</div>
</template>

<script setup>
	import list from "../components/list.vue";
	import piechart from "../components/piechart.vue";
	import { useListStore } from "../stores/list";

	const listStore = useListStore();

	const addItem = () => {
		const newItem = {
			name: "Sample Entry",
			value: 100,
			description: "This is a sample description",
			tags: ["tag1", "tag2"],
			date: new Date()
		};

		listStore.addToList(newItem);
	};
</script>
