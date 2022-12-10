<template>
	<div class="events container">
		<h2 class="subtitle is-3">Check out our upcoming events</h2>
		<div class="columns is-multiline">
			<div v-for="event in events" :event="event" :key="event.id" class="column is-one-quarter">
				<router-link :to="`/event/${event.id}`">
					<EventCard :event="event" />
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
import EventCard from "@/components/EventCard.vue";

export default {
	name: "EventsList",
	components: {
		EventCard,
	},
	data() {
		return {
			event: {},
			events: [],
		};
	},
	created() {
		this.getEventsData(); // call getEventData() when the instance is created
	},
	methods: {
		async getEventsData() {
			// Use the eventService to call the getEvents() method
			let res = await fetch("http://localhost:8080/events");
			const data = await res.json();
			console.log(data);
			this.events = data;
		},
	},
};
</script>
<style lang="scss" scoped>
.events {
	margin-top: 100px;
	text-align: center;
}
</style>
