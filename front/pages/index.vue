<template>
  <div class="index">
    <div class="main">
      <v-img
        max-height="510"
        src="https://cdn.pixabay.com/photo/2016/01/09/18/27/journey-1130732_1280.jpg"
      >
      <div class="search">
        <h1>Enjoy Your Dream Vacation</h1>
        <h4>일상 속 작은 행복, 국내 여행을 떠나보아요</h4>
        <div class="search__container">
          <input
            class="search__form"
            placeholder="검색"
          />
          <button>SEARCH</button>
        </div>
      </div>
      </v-img>
    </div>
    <h1 class="recentTrip">Recent Trip</h1>
    <v-container class="card__container" v-if="trips">
      <div v-for="trip in trips" :key="trip.id">
        <v-card class="card__item ma-2" nuxt :to="'/itinerary/' + trip.id">
          <v-img
            :src="trip.city.image"
            class="card__image white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2)"
            height="200px"
          >
            <v-card-title v-text="trip.city.name" class="headline mb-1"></v-card-title>
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
import { mapState, mapMutations, mapActions } from 'vuex'
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
      trips: state => state.trips.trips,
    })
  },
  created() {
    this.FETCH_TRIPLIST()
    this.FETCH_CITYLIST()
    this.FETCH_PLACELIST()
  },
  methods: {
      ...mapActions({
        FETCH_TRIPLIST: 'trips/FETCH_TRIPLIST',
        FETCH_CITYLIST: 'trips/FETCH_CITYLIST',
        FETCH_PLACELIST: 'trips/FETCH_PLACELIST'
      }),
  },
  middleware: 'authenticated',
}
</script>
<style scoped>
.index h1 {
  text-align: center;
  margin-top: 45px;
}

.search h1{
  color: white;
  margin-top: 100px !important;
  padding: 0px;
  text-align: center;
  margin-top: 50px;
}

.search h4{
  color: white;
  margin-top: 0px !important;
  padding: 0px;
  text-align: center;
  margin-top: 40px;
}

.card__container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.search__container{
  text-align: center;
  margin-top: 180px;
}

.search__form {
  width: 70%;
  background-color: #ffffff;
  border-radius: 15px;
  display: inline;
  margin-bottom: 12px;
  padding: 6px 8px;
  transition: all 0.3s;
}

button {
  background-color: rgb(13, 160, 160);
  border-radius: 15px;
  color: white;
  padding: 6px 5px;
  display: inline;
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
