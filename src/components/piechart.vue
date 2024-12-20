<template>
	<div id="chart">
		<piechart type="pie" :width="width" :options="chartOptions" :series="series"></piechart>
	</div>
</template>

<script setup>
	import piechart from "vue3-apexcharts";

	const props = defineProps({
		type: {
			type: String,
			default: "pie"
		},
		width: {
			type: Number,
			default: 380
		},
		options: {
			type: Object,
			default: () => ({
				chart: {
					width: 380,
					type: "pie"
				},
				labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
				responsive: [
					{
						breakpoint: 480,
						options: {
							chart: {
								width: 200
							},
							legend: {
								position: "bottom"
							}
						}
					}
				]
			})
		},
		series: {
			type: Array,
			default: () => [44, 55, 13, 43, 22]
		}
	});

	// const series = [44, 55, 13, 43, 22]; // => props.series

	const series = props.series;

	const chartOptions = props.options;

	// chart: {
	// 	width: 380,
	// 	type: "pie"
	// },
	// 	chart: props.options.chart,
	// 	labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
	// 	responsive: [
	// 		{
	// 			breakpoint: 480,
	// 			options: {
	// 				chart: {
	// 					width: 200
	// 				},
	// 				legend: {
	// 					position: "bottom"
	// 				}
	// 			}
	// 		}
	// 	]
	// };
</script>
