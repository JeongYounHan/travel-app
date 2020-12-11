<template>
  <div v-if="trip">
    <Drawer></Drawer>
    <Map></Map>
  </div>
  <div v-else>해당 여행일정은 존재하지 않습니다.</div>
</template>

<script>
import { mapMutations } from 'vuex'
import Drawer from '../../components/Drawer.vue'
import Map from '../../components/Map.vue'

export default {
  components: {
    Drawer,
    Map
  },
  data() {
    return {
      tripId: ''
    }
  },
  created() {
    this.tripId = this.$route.params.tripId
    this.SELECT_TRIP(this.trip)
  },
  computed: {
    trip() {
      return this.$store.state.trips.trips.find(v => v.id == this.tripId)
    }
  },
  methods: {
    ...mapMutations({
      SELECT_TRIP: 'trips/SELECT_TRIP'
    })
  },
  middleware: 'authenticated',
}
</script>

<style>

</style>
