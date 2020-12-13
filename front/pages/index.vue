<template>
  <div class="index">
    <v-container class="card__container">
      <div v-for="trip in trips" :key="trip.id">
        <v-card class="card__item ma-2" nuxt :to="'/itinerary/' + trip.id">
          <v-img
            :src="trip.bg_image"
            class="card__image white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2)"
            height="200px"
          >
            <v-card-title v-text="trip.city" class="headline mb-1"></v-card-title>
            <v-card-text
              >{{ trip.date_from }} <br />- {{ trip.date_to }}</v-card-text
            >
          </v-img>
        </v-card>
      </div>
    </v-container>
    <DialogForm></DialogForm>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DialogForm from '../components/DialogForm'

export default {
  head: {
    script: [
      {
        type: 'text/javascript',
        src: 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=29f1degawp'
      }
    ]
  },
  components: {
    DialogForm
  },
  computed: {
    ...mapState({
      me: state => state.users.me,
      trips: state => state.trips.trips
    })
  },
  middleware: 'authenticated',
}
</script>
<style scoped>
.card__container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

@media screen and (max-width: 768px) {
  .card__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .card__image {
    height: 150px !important;
  }

  .headline {
    font-size: 16px !important;
  }
}
</style>
