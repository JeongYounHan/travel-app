<template>
    <div class="dialog__container">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="dialog__btn"
                color="teal"
                dark
                fab
                small
                v-bind="attrs"
                v-on="on"
            >
                +
            </v-btn>
            </template>
            <v-card>
            <v-card-title>
                <span class="headline">여행을 떠나볼까요?</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field
                        label="여행의 이름을 정해주세요."
                    ></v-text-field>
                    <v-select
                        :items="['0-17', '18-29', '30-54', '54+']"
                        label="여행하는 도시는 어디인가요?*"
                        required
                    ></v-select>
                    <br />
                    <h2>날짜 정하기</h2>
                    <div class="date__container">
                        <v-date-picker
                            v-model="date1"
                            show-current="2020-12-14"
                            width="250"
                        ></v-date-picker>
                        <v-date-picker
                            v-model="date2"
                            show-current="2020-12-14"
                            width="250"
                        ></v-date-picker>
                    </div>
                    {{date1}}, {{date2}}
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
                >
                Close
                </v-btn>
                <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
                >
                Save
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'


  export default {
    data: () => ({
      dialog: false,
      date1: '',
      date2: '',
    }),
  }
</script>
<style>
.dialog__container {
    position: fixed;
    bottom: 15px;
    right: 15px;
}

.date__container {
    display: flex;
    justify-content: space-between;
}
</style>