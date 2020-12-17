<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <div
          class="schedule__div"
          v-if="schedule.place.div === 'transportation'"
          v-bind="attrs"
          v-on="on"
          :data-schedule-id="schedule.id" 
          :data-schedule-order="schedule.order"
          :data-schedule-day="schedule.day"
        >
          <v-timeline-item color="blue darken-2" small v-if="schedule">
            <div class="schedule__delete">
              <strong>{{ schedule.place.name }}</strong>
              <a href="" class="schedule__delete__btn" @click.prevent.stop="onDelete({id: schedule.id, trip: schedule.trip.id, day: schedule.day})">&times;</a>
            </div>
            <small>{{ schedule.place.time }}</small>
            <p class="caption">
              {{ schedule.memo }}
            </p>
            <i class="handle fas fa-bars"></i>
          </v-timeline-item>
        </div>
        <div
          class="schedule__div"
          v-else-if="schedule.place.div === 'accommodation'"
          v-bind="attrs"
          v-on="on"
          :data-schedule-id="schedule.id" 
          :data-schedule-order="schedule.order"
          :data-schedule-day="schedule.day"
        >
          <v-timeline-item color="pink" small v-if="schedule">
            <div class="schedule__delete">
              <strong>{{ schedule.place.name }}</strong>
              <a href="" class="schedule__delete__btn" @click.prevent.stop="onDelete({id: schedule.id, trip: schedule.trip.id, day: schedule.day})">&times;</a>
            </div>
            <small>숙소</small>
            <p class="caption">
              {{ schedule.memo }}
            </p>
            <i class="handle fas fa-bars"></i>
          </v-timeline-item>
        </div>
        <div class="schedule__div" v-else v-bind="attrs" v-on="on"
          :data-schedule-id="schedule.id" 
          :data-schedule-order="schedule.order"
          :data-schedule-day="schedule.day"
        >
          <v-timeline-item color="teal" small v-if="schedule">
            <div class="schedule__delete">
              <strong>{{ schedule.place.name}}</strong>
              <a href="" class="schedule__delete__btn" @click.prevent.stop="onDelete({id: schedule.id, trip: schedule.trip.id, day: schedule.day})">&times;</a>
            </div>
            <small>관광명소</small>
            <p class="caption">
              {{ schedule.place.time.slice(0, 23)+'...' }}
            </p>
            <p class="caption">
              {{ schedule.memo }}
            </p>
            <i class="handle fas fa-bars"></i>
          </v-timeline-item>
        </div>
      </template>
      <!-- 다이얼로그 부분 -->
      <v-card>
        <v-card-title>
          <span class="headline">일정 상세 & 수정</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div v-if="schedule.place">
              <p class="caption mt-2">
                설명: {{ schedule.place.description }}
              </p>
              <p class="caption mt-2">
                가격: {{ schedule.place.price }}
              </p>
              <p class="caption mt-2">
                시간: {{ schedule.place.time }}
              </p>
            </div>
            <v-text-field class="mt-3" label="메모" required></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="white" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props: ['schedule'],
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    ...mapActions({
      DELETE_SCHEDULE: 'trips/DELETE_SCHEDULE'
    }),
    onDelete(payload) {
      if (window.confirm(`${this.schedule.place.name} 일정을 삭제하시겠습니까?`)) {
        this.DELETE_SCHEDULE({trip: payload.trip, day: payload.day, id: payload.id})
      }
    }
  }
}
</script>

<style>
.schedule__div {
  position: relative;
  text-align: left;
  width: 90%;
  height: 100%;
  cursor: pointer;
}

.caption {
  margin: 0px;
  padding: 0px;

}

.schedule__delete {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.schedule__delete__btn {
  font-size: 20px;
  color: grey;
}

.handle {
  color: grey;
  position: absolute;
  top: 60%;
  left: 182px;
  font-size: 15px;
}

/* 드래그 시, 정렬된 상태로 드래그 하려고 */

.v-timeline--dense .v-timeline-item:nth-child(odd):not(.v-timeline-item--right), .v-timeline--dense .v-timeline-item--left {
  flex-direction: row;
}

.v-timeline-item__dot{
  position: static;
  margin: 0 25px 0 7px;
}

.v-timeline-item__body {
  max-width: 100% !important;
}

/* 드래그 시, 위에 떠있는 부분 */
.gu-mirror {
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  opacity: 0.8 !important;
}


</style>
