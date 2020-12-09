<template>
  <div v-if="trip">
    <drawer :data="trip"></drawer>
  </div>
  <div v-else>해당 여행일정은 존재하지 않습니다.</div>
</template>

<script>
import { mapMutations } from 'vuex'
import Drawer from '../../components/Drawer.vue'

export default {
  components: {
    Drawer
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
  }
}
</script>

<style></style>
