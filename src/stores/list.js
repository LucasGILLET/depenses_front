import { ref } from "vue";
import { defineStore } from "pinia";
import axiosClient from "../axios";
import { useRouter } from "vue-router";
import { useToasterStore } from "./toaster";

export const useListStore = defineStore("listStore", () => {
	const router = useRouter();
	const toaster = useToasterStore();

	const myList = ref([]);

	const addToList = async (item) => {
		console.log("Called addToList");
		try {
			const response = await axiosClient.post("/depenses", item); // yes but not until I have done the backend
			myList.value.push(response.data);
			// myList.value.push(item);
			myList.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

			toaster.success("Item added to list");
		} catch (error) {
			console.error(error.message);
			toaster.error("Failed to add item to list");
		}
	};

	const removeFromList = async (item) => {
		console.log("Called removeFromList");
		try {
			const response = await axiosClient.delete(`/depenses/${item.id}`); // yes but not until I have done the backend
			myList.value = myList.value.filter((i) => i.id !== item.id);
			toaster.success("Item removed from list");
			return myList.value;
		} catch (error) {
			toaster.error("Failed to remove item from list");
		}
	};

	const fetchList = async () => {
		console.log("Called fetchList");

		try {
			const response = await axiosClient.get("/depenses"); // yes but not until I have done the backend
			myList.value = response.data;
			console.log(myList.value);

			// if (myList.value.length < 1) {
			// 	myList.value = [
			// 		{
			// 			id: 1,
			// 			name: "Loyer",
			// 			value: 619,
			// 			description: "Le prix du loyer pur et simple",
			// 			category: "Loyer",
			// 			date: new Date()
			// 		},
			// 		{
			// 			id: 2,
			// 			name: "Courses alimentaires",
			// 			value: 100,
			// 			description: "Les courses de début de moi à Leclerc",
			// 			category: "Nourriture",
			// 			date: new Date()
			// 		},
			// 		{
			// 			id: 3,
			// 			name: "Amazon Prime",
			// 			value: 7,
			// 			description: "Abonnement Amazon Prime",
			// 			category: "Abonnements",
			// 			date: new Date()
			// 		}
			// 	];
			// 	toaster.success("default list fetched successfully");
			// }
		} catch (error) {
			toaster.error("Failed to fetch list");
		}
	};

	return { myList, addToList, removeFromList, fetchList };
});
