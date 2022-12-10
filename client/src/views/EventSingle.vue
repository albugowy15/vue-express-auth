<template>
	<div class="event-single">
		<section class="hero is-primary">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">{{ event.name }}</h1>
					<h2 class="subtitle">
						<strong>Date:</strong>
						{{ event.date }}
						<br />
						<strong>Time:</strong>
						{{ event.time }}
					</h2>
				</div>
			</div>
		</section>
		<section class="event-content">
			<div class="container">
				<p class="is-size-4 description">{{ event.description }}</p>
				<p class="is-size-5">
					<strong>Location:</strong>
					{{ event.location }}
				</p>
				<p class="is-size-5">
					<strong>Category:</strong>
					{{ event.category }}
				</p>
				<div class="event-images columns is-multiline has-text-centered">
					<div v-for="image in event.images" :key="image.id" class="column is-one-third">
						<img :src="`${image}`" :alt="`${event.name}`" />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
// import EventService
import EventService from "@/services/EventService.js";
import { useAuth0 } from "@auth0/auth0-vue";
export default {
	name: "EventSingle",
	data() {
		// initialize the event object
		return {
			event: {},
		};
	},
	setup() {
		const { getAccessTokenSilently } = useAuth0();
		return {
			doSomethingWithToken: async () => {
				console.log("start run fetch");
				const token = await getAccessTokenSilently();
				console.log(token);
				const res = await fetch("http://localhost:8080/events/1", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await res.json();
				console.log(data);
			},
		};
	},
	mounted() {
		this.doSomethingWithToken();
	},
	methods: {
		async getEventData() {
			// Get the access token from the auth wrapper
			const accessToken = await this.doSomethingWithToken();
			console.log(accessToken);
			const res = await fetch("http://localhost:8080/events/1", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const data = await res.json();
			this.event = data;
			console.log(data);

			// Use the eventService to call the getEventSingle method
			// EventService.getEventSingle(this.$route.params.id, accessToken).then(
			// 	((event) => {
			// 		this.$set(this, "event", event);
			// 	}).bind(this)
			// );
		},
	},
};
</script>
