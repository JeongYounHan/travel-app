<template>
  <div>
    <v-card flat>
      <v-card-title>day {{ day }}</v-card-title>
      <v-timeline dense>
        <div ref="from">
          <Schedule
            v-for="schedule in daySchedule"
            :key="schedule.id"
            :schedule="schedule"
          />
        </div>

      </v-timeline>
      <div class="btnList">
        <v-btn small class="scheduleList__btn" flat>장소 추가</v-btn>
        <v-btn small class="scheduleList__btn" flat>할일 추가</v-btn>
      </div>
      <div ref="to"></div>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Schedule from '../components/Schedule'
import dragula from 'dragula'
import 'dragula/dist/dragula.css'

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
  },
  mounted() {
    const { from, to } = this.$refs;
    dragula([from], {
      revertOnSpill: true,
      moves: function (el, container, handle) {
        return handle.classList.contains('handle');
      }
    }).on('drop', (el, target) => {
      // 옮긴 객체 id
      const cur = parseInt(el.getElementsByClassName('schedule__div')[0].dataset['scheduleId'])
      
      // 전, 후 찾기
      let prev = null
      let next = null
      const candidates = Array.from(target.querySelectorAll('.schedule__div'))

      for (let i = 0; i < candidates.length; i++) {
        const id = parseInt(candidates[i].dataset['scheduleId'])
        if (id === cur) {
          if (i > 0) {
            prev = candidates[i-1]
          }
          if (i < candidates.length - 1) {
            next = candidates[i+1]
          }
          break;
        }
      }
      console.log(prev, next)
      // 전, 후 일정 order 값 기준으로 타겟 일정 order값 계산
      const targetSchedule = {
        id: cur,
        order: 0
      }

      if (!prev && next) {
        targetSchedule.order = parseFloat(next.dataset['scheduleOrder']) / 2
      }
      else if (!next && prev) {
        targetSchedule.order = parseFloat(prev.dataset['scheduleOrder']) * 2
      } 
      else if (prev && next) {
        targetSchedule.order = (parseFloat(prev.dataset['scheduleOrder']) + parseFloat(next.dataset['scheduleOrder'])) / 2 
      } 

      // 수정해주어야
    });
  },
  updated() {
 
  },
  methods: {
  }
}
</script>

<style>
.scheduleList__btn {
  border: 1px solid grey;
  padding: 0 32px;
}
</style>
