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
        <DialogFormSchedule :dayEach="day" :daySchedule="daySchedule"></DialogFormSchedule>
        <DialogFormTodo :dayEach="day"></DialogFormTodo>
      </div>
      <div ref="to"></div>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Schedule from '../components/Schedule'
import DialogFormSchedule from '../components/DialogFormSchedule'
import DialogFormTodo from '../components/DialogFormTodo'
import dragula from 'dragula'
import 'dragula/dist/dragula.css'

export default {
  components: {
    Schedule,
    DialogFormSchedule,
    DialogFormTodo
  },
  props: ['day'],
  data() {
    return {}
  },
  computed: {
    daySchedule() {
      let temp = this.$store.state.trips.scheduleList.filter(v => v.day == this.day)
      // order 순서별로 정렬
      return temp.sort((a, b) => {
        if (a.order > b.order) {
          return 1
        }
        if (a.order < b.order) {
          return -1
        } 
        return 0       
      })
    }
  },
  created() {
  },
  mounted() {
    // 드래그 앤 드롭
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
      // 전, 후 일정 order 값 기준으로 타겟 일정 order값 계산
      const targetSchedule = {
        id: cur,
        order: 0,
        day: el.getElementsByClassName('schedule__div')[0].dataset['scheduleDay']
      }

      if (!prev && next) {
        targetSchedule.order = parseFloat(next.dataset['scheduleOrder']) - 1
      }
      else if (!next && prev) {
        targetSchedule.order = parseFloat(prev.dataset['scheduleOrder']) + 1
      } 
      else if (prev && next) {
        targetSchedule.order = (parseFloat(prev.dataset['scheduleOrder']) + parseFloat(next.dataset['scheduleOrder'])) / 2 
      } 

      // 수정해주어야
      this.UPDATE_SCHEDULE(targetSchedule)
    });
  },
  updated() {
 
  },
  methods: {
    ...mapMutations({
      SET_DAY: 'trips/SET_DAY'
    }),
    ...mapActions({
      UPDATE_SCHEDULE: 'trips/UPDATE_SCHEDULE'
    })
  }
}
</script>

<style>
.btnList {
  display: flex;
  justify-content: space-around;
}
</style>
