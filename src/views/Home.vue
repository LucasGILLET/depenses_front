<template>
	<div class="flex flex-col bg-slate-400 w-full min-h-screen">
		<!-- Container for the pie chart -->
		<div class="my-5 gap-5 w-full mx-auto flex text-center flex-col items-center px-4">
			<piechart
				:width="options.chart.width"
				:options="options"
				:series="series"
				v-if="options != null && series != null"
				class="w-full max-w-[600px]"
			/>
		</div>

		<!-- Container for the list and button -->
		<div class="my-10 gap-5 flex flex-col items-center px-4">
			<list />

			<!-- Add Item Button -->
			<button @click="addItem" class="mt-5 p-4 sm:p-6 bg-blue-500 text-white rounded text-2xl w-full sm:w-auto">
				Add Item
			</button>
		</div>
	</div>
</template>

<script setup>
	import { onMounted, ref } from "vue";
	import list from "../components/list.vue";
	import piechart from "../components/piechart.vue";
	import { useListStore } from "../stores/list";

	const listStore = useListStore();
	const options = ref();
	const series = ref();

	onMounted(async () => {
		await listStore.fetchList();

		options.value = {
			chart: {
				width: 500,
				type: "pie"
			},
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 400
						},
						legend: {
							position: "bottom"
						}
					}
				}
			]
		};

		series.value = listStore.myList.map((item) => item.value);
		const categories = [...new Set(listStore.myList.map((item) => item.categoryName))];
		options.value.labels = categories;
		series.value = categories.map((category) => {
			return listStore.myList
				.filter((item) => item.categoryName === category)
				.reduce((sum, item) => sum + item.value, 0);
		});
	});

	const addItem = () => {
		const newItem = {
			name: "Nouvel item de loisir",
			value: 20,
			description: "Description de loisir",
			category: "Loisirs",
			date: new Date()
		};

		listStore.addToList(newItem);
	};
</script>
