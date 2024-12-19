<template>
	<div class="flex flex-col bg-slate-400 w-full min-h-screen">
		<div class="m-40 gap-5">
			<div class="flex font-semibold text-3xl">This is my test add vue</div>
			<form @submit.prevent="submitForm">
				<div class="flex flex-col gap-4">
					<label class="flex flex-col">
						Name:
						<input type="text" class="p-2 border rounded" v-model="name" />
					</label>
					<label class="flex flex-col">
						Description:
						<textarea class="p-2 border rounded" v-model="description"></textarea>
					</label>
					<label class="flex flex-col">
						Value:
						<input type="number" class="p-2 border rounded" v-model="value" />
					</label>
					<!-- <label class="flex flex-col">
						Category:
						<input type="text" class="p-2 border rounded" />
					</label>
					<label class="flex flex-col">
						Tags:
						<input type="text" class="p-2 border rounded" />
					</label> -->
					<label class="flex flex-col">
						Date:
						<input type="date" class="p-2 border rounded" v-model="date" />
					</label>
					<button type="submit" class="p-2 bg-blue-500 text-white rounded">Submit</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { useListStore } from "../stores/list";

	const listStore = useListStore();

	const name = ref("");
	const description = ref("");
	const value = ref(null);
	const date = ref("");

	const submitForm = () => {
		console.log("Form submitted with values:", {
			name: name.value,
			description: description.value,
			value: value.value,
			date: date.value
		});

		listStore.addToList({
			name: name.value,
			description: description.value,
			value: value.value,
			date: new Date(date.value),
			tags: []
		});
	};
</script>
