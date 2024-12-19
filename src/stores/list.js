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
			// const response = await axiosClient.post("/list", item); // yes but not until I have done the backend
			// myList.value.push(response.data);
			myList.value.push(item);
			toaster.success("Item added to list");
		} catch (error) {
			console.error(error.message);
			toaster.error("Failed to add item to list");
		}
	};

	const removeFromList = async (item) => {
		console.log("Called removeFromList");
		try {
			// const response = await axiosClient.delete(`/list/${item.id}`); // yes but not until I have done the backend
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
			// const response = await axiosClient.get("/list"); // yes but not until I have done the backend
			// myList.value = response.data;
			if (myList.value.length < 1) {
				myList.value = [
					{
						id: 1,
						name: "Sample Entry",
						value: 100,
						description: "This is a sample description",
						tags: ["tag1", "tag2"],
						date: new Date()
					},
					{
						id: 2,
						name: "Another Entry",
						value: 200,
						description: "This is another sample description",
						tags: ["tag3", "tag4"],
						date: new Date()
					},
					{
						id: 3,
						name: "Third Entry",
						value: 300,
						description: "This is yet another sample description",
						tags: ["tag5", "tag6"],
						date: new Date()
					}
				];
			}
			toaster.success("List fetched successfully");
		} catch (error) {
			toaster.error("Failed to fetch list");
		}
	};

	return { myList, addToList, removeFromList, fetchList };
});
