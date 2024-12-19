import { defineStore } from "pinia";
import { createToaster } from "@meforma/vue-toaster";

export const useToasterStore = defineStore("toaster", {
	state: () => ({
		toast: createToaster(),
		errorCount: 0,
		errorTimer: undefined,
		isShaking: false
	}),
	actions: {
		success(message) {
			this.toast.success(message);
		},
		newNotification(message) {
			this.toast.success(message, { duration: false });
		},
		info(message) {
			this.toast.info(message, { duration: false });
		},
		show(message) {
			this.toast.show(message);
		},
		error(message) {
			this.toast.error(message);
			this.errorCount++;

			if (this.errorCount === 5) {
				this.handleMultipleErrors();
			}

			if (this.errorTimer) {
				clearTimeout(this.errorTimer);
			}
			this.errorTimer = setTimeout(() => {
				this.errorCount = 0;
			}, 10000);
		},
		handleMultipleErrors() {
			this.shakeScreen();
			this.errorCount = 0;
			this.toast.show("Arrête de cliquer ou je te clique ! 🤬");
		},
		showPopup(content) {
			alert(content);
		},
		shakeScreen() {
			const body = document.querySelector("body");
			if (!body) return;

			this.isShaking = true;

			setTimeout(() => {
				this.isShaking = false;
			}, 1000);

			body.classList.add("shake-animation");

			setTimeout(() => {
				body.classList.remove("shake-animation");
			}, 1000);
		}
	},
	getters: {}
});
