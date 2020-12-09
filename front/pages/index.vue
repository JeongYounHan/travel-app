<template>
  <v-container class="container">
    <div v-for="trip in trips" :key="trip.id">
      <v-card class="card__item ma-2" nuxt :to="'/itinerary/' + trip.id">
        <v-img
          :src="trip.bg_image"
          class="card__image white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2)"
          height="200px"
        >
          <v-card-title v-text="trip.city"></v-card-title>
        </v-img>
        <p>{{ trip.date_from }}</p>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  computed: {
    ...mapState({
      me: state => state.users.me,
      trips: state => state.trips.trips
    })
  }
}
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

@media screen and (max-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .card__image {
    height: 150px !important;
  }
}
</style>
