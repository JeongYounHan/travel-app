<template>
  <div id="map">
    <v-card
      elevation="1"
      width="400"
      class="daysNav"
    >
      <v-navigation-drawer class="daysNav__container" floating permanent>
        <v-list dense rounded>
          <span
            v-for="item in daysTotal"
            :key="item"
            link
          >
            <v-chip class="ma-1" small @click="onClickDay(item)">
                day {{item}}
            </v-chip>
          </span>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
        mapOptions: {},
        map: '',
        day: 1,
    }
  },
  computed: {
    ...mapState({
      scheduleList: state => state.trips.scheduleList,
      daysTotal: state => state.trips.daysTotal,
      tripSelected: state => state.trips.tripSelected.id,
      daySchedule: state => state.trips.daySchedule
    }),
    dailySchedule() {
      return this.scheduleList.filter(v => v.day == this.day)
    }
  },
  mounted() {
      this.onClickDay(1)
  },
  methods: {
    ...mapActions({
      FETCH_DAYSCHEDULE: 'trips/FETCH_DAYSCHEDULE'
    }),
    async onClickDay(item) {
        this.day = item
        console.log(this.dailySchedule)
        
        //데이터 받아오기
        // const temp = await this.fetchDaySchedule(item)
        //지도를 삽입할 HTML 요소 또는 HTML 요소의 id를 지정합니다.
        const mapDiv = document.getElementById('map'); // 'map'으로 선언해도 동일
        
        let middleLat = 0
        let middleLng = 0
        let latlng = []
        // 해당 장소들 좌표 뽑기
        this.dailySchedule.forEach(element => {
          middleLat = middleLat + element.place.lat
          middleLng = middleLng + element.place.lng
          let temp = new naver.maps.LatLng(element.place.lat, element.place.lng)
          latlng.push(temp)
        });
        const tempLength = Object.keys(this.dailySchedule).length
        if (tempLength) {
          middleLat = middleLat / tempLength
          middleLng = middleLng / tempLength
        } else {
          middleLat = 37.3614483
          middleLng = 129.1114883
        }
        //옵션 없이 지도 객체를 생성하면 서울 시청을 중심으로 하는 16 레벨의 지도가 생성됩니다.
        const map = new naver.maps.Map(mapDiv, {
            zoom: 15,
            center: new naver.maps.LatLng(middleLat, middleLng)
        });

        const markerList = []
        for (let i=0, ii=latlng.length; i<ii; i++) {

            let marker = new naver.maps.Marker({
                position: latlng[i],
                map: map,           
            });

            marker.set('seq', i);
            markerList.push(marker);
            // console.log(marker)
        }
    },
    fetchDaySchedule(item) {
      this.FETCH_DAYSCHEDULE({day: item, trip: this.tripSelected})
    }
  }
}
</script>

<style>
#map {
    position: relative;
    width: 100%;
    height: calc(100vh - 49px);
}

.v-chip-group {
    z-index: 3;
}

.daysNav {
    position: absolute;
    bottom: 10px;
    left: 310px;
    z-index: 2;
    border-radius: 5px;
}

.daysNav__container {
    text-align: center;
    width: 400px !important; 
    padding: 10px 0;
}

.v-list {
    width: 400px; 
}

</style>