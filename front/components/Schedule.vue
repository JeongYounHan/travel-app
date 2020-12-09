<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <div
          class="schedule__btn"
          v-if="schedule.div === 'flight'"
          v-bind="attrs"
          v-on="on"
        >
          <v-timeline-item color="blue darken-2" small>
            <strong>{{ schedule.location }}</strong>
            <br />
            <strong>{{ schedule.time }}</strong>
            <p class="caption">
              {{ schedule.date }}
            </p>
            <p class="caption">
              {{ schedule.memo }}
            </p>
          </v-timeline-item>
        </div>
        <div
          class="schedule__btn"
          v-else-if="schedule.div === 'accommodation'"
          v-bind="attrs"
          v-on="on"
        >
          <v-timeline-item color="pink" small>
            <strong>{{ schedule.location }}</strong>
            <br />
            <strong>{{ schedule.time }}</strong>
            <p class="caption">
              {{ schedule.date }}
            </p>
            <p class="caption">
              {{ schedule.memo }}
            </p>
          </v-timeline-item>
        </div>
        <div class="schedule__btn" v-else v-bind="attrs" v-on="on">
          <v-timeline-item color="teal" small>
            <strong>{{ schedule.location }}</strong>
            <br />
            <strong>{{ schedule.time }}</strong>
            <p class="caption">
              {{ schedule.date }}
            </p>
            <p class="caption">
              {{ schedule.memo }}
            </p>
          </v-timeline-item>
        </div>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">일정 수정</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field label="메모" required></v-text-field>
            <v-text-field
              label="시간"
              hint="example of helper text only on focus"
            ></v-text-field>
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

    <!-- 추가 버튼 -->
  </div>
</template>

<script>
export default {
  props: ['schedule'],
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped>
.schedule__btn {
  text-align: left;
  width: 90%;
  height: 100%;
  cursor: pointer;
}

.caption {
  margin: 0px;
  padding: 0px;
}
</style>
