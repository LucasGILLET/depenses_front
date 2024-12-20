<template>
	<div class="flex flex-col bg-slate-400 w-full min-h-screen">
		<div class="mx-4 sm:mx-8 md:mx-16 lg:mx-40 my-4 gap-5">
			<!-- <div class="flex font-semibold text-3xl justify-center">This is my test add vue</div> -->

			<!-- Formulaire pour ajouter une nouvelle catégorie -->
			<form @submit.prevent="submitCategoryForm" class="mb-8">
				<div class="text-2xl font-semibold text-center text-gray-800 mb-6">Add a New Category</div>
				<div class="mb-4">
					<label for="newCategoryName" class="block text-sm font-medium text-gray-700 mb-2">Category Name:</label>
					<input
						type="text"
						id="newCategoryName"
						v-model="newCategoryName"
						class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="Enter a new category name"
					/>
				</div>
				<button
					type="submit"
					class="w-full py-3 px-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
				>
					Add Category
				</button>
			</form>

			<!-- Formulaire pour ajouter une nouvelle dépense -->
			<form @submit.prevent="submitForm">
				<div class="text-2xl font-semibold text-center text-gray-800 mb-6">Add a New Expense</div>

				<div class="space-y-4">
					<div class="mb-4">
						<label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name:</label>
						<input
							type="text"
							id="name"
							v-model="name"
							class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder="Enter expense name"
						/>
					</div>

					<div class="mb-4">
						<label for="description" class="block text-sm font-medium text-gray-700 mb-2">Description:</label>
						<textarea
							id="description"
							v-model="description"
							class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder="Enter a description"
						></textarea>
					</div>

					<div class="mb-4">
						<label for="value" class="block text-sm font-medium text-gray-700 mb-2">Value:</label>
						<input
							type="number"
							id="value"
							v-model="value"
							class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder="Enter the value"
						/>
					</div>

					<div class="mb-4">
						<label for="categoryId" class="block text-sm font-medium text-gray-700 mb-2">Category:</label>
						<select
							id="categoryId"
							v-model="categoryId"
							class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option v-for="category in categories" :key="category.id" :value="category.id">
								{{ category.name }}
							</option>
						</select>
					</div>

					<div class="mb-4">
						<label for="date" class="block text-sm font-medium text-gray-700 mb-2">Date:</label>
						<input
							type="date"
							id="date"
							v-model="date"
							class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>

					<button
						type="submit"
						class="w-full py-3 px-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	import { onMounted, ref } from "vue";
	import { useListStore } from "../stores/list";
	import axiosClient from "../axios";

	const listStore = useListStore();

	const name = ref("");
	const description = ref("");
	const value = ref(null);
	const date = ref("");
	const categoryId = ref(null);
	const categories = ref([]);
	const newCategoryName = ref("");

	const submitForm = () => {
		console.log("Form submitted with values:", {
			name: name.value,
			description: description.value,
			value: value.value,
			date: date.value,
			categoryId: categoryId.value
		});

		listStore.addToList({
			name: name.value,
			description: description.value,
			value: value.value,
			date: new Date(date.value),
			categoryId: categoryId.value
		});

		name.value = "";
		description.value = "";
		value.value = null;
		date.value = "";
		categoryId.value = "";
	};

	const submitCategoryForm = async () => {
		try {
			const response = await axiosClient.post("/categories", {
				name: newCategoryName.value
			});
			categories.value.push(response.data); // Ajouter la nouvelle catégorie à la liste
			newCategoryName.value = ""; // Réinitialiser le champ
		} catch (error) {
			console.error("Failed to add category:", error);
		}
	};

	onMounted(async () => {
		try {
			const response = await axiosClient.get("/categories");
			categories.value = response.data;
		} catch (error) {
			console.error("Failed to fetch categories:", error);
		}
	});
</script>
