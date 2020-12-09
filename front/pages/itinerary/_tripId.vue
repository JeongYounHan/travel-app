<template>
  <v-container v-if="trip"> </v-container>
  <div v-else>해당 여행일정은 존재하지 않습니다.</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tripId: ''
    }
  },
  created() {
    this.tripId = this.$route.params.tripId
  },
  mounted() {},
  computed: {
    trip() {
      return this.$store.state.trips.trips.find(v => v.id == this.tripId)
    }
  }
}
</script>

<style></style>
