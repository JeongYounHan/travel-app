<template>
  <div>
    <v-card flat>
      <v-card-title>day {{ day }}</v-card-title>
      <v-timeline dense>
        <Schedule
          v-for="schedule in daySchedule"
          :key="schedule.id"
          :schedule="schedule"
        />
      </v-timeline>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Schedule from '../components/Schedule'

export default {
  components: {
    Schedule
  },
  props: ['day'],
  data() {
    return {}
  },
  computed: {
    daySchedule() {
      return this.$store.state.trips.scheduleList.filter(v => v.day == this.day)
    }
  }
}
</script>

<style></style>
