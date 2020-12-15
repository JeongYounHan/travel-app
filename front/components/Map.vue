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
  },
  watch: {
    daySchedule() {
      this.fetchMap()
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
        //데이터 받아오기
        const first = await this.FETCH_DAYSCHEDULE({trip: this.tripSelected, day: item})
        // 지도 불러오기
        const second = await this.fetchMap()
    },
    fetchMap() {
        //지도를 삽입할 HTML 요소 또는 HTML 요소의 id를 지정 후
        const mapDiv = document.getElementById('map') // 'map'으로 선언해도 동일

        let middleLat = 0
        let middleLng = 0
        let latlng = []
        let minLat = 100000
        let maxLat = 0
        let minLng = 100000
        let maxLng = 0

        // 선택된 날의 좌표 뽑기
        this.daySchedule.forEach(element => {
          middleLat = middleLat + element.place.lat
          middleLng = middleLng + element.place.lng
          let temp = new naver.maps.LatLng(element.place.lat, element.place.lng)
          latlng.push(temp)

          // 최대 최소 계산
          // if (element.place.lat > maxLat) {
          //   maxLat = element.place.lat
          // } else if (element.place.lat < minLat) {
          //   minLat = element.place.lat
          // }

          // if (element.place.lng > maxLng) {
          //   maxLng = element.place.lng
          // } else if (element.place.lng < minLng) {
          //   minLng = element.place.lng
          // }
        });

        // 중심 좌표 계산
        const tempLength = Object.keys(this.daySchedule).length
        if (tempLength) {
          middleLat = middleLat / tempLength
          middleLng = middleLng / tempLength
        } else {
          middleLat = 37.56664532365792
          middleLng = 126.97793969616743
        }
        console.log(minLat, minLng)
        console.log(maxLat, maxLng)
        // 옵션 없이 지도 객체를 생성하면 서울 시청을 중심으로 하는 16 레벨의 지도가 생성
        // 모든 점들 다 들어오게 하려면 바운더리 설정 필요
        // let maxBoundary = new naver.maps.LatLngBounds(
        //   new naver.maps.LatLng(minLat, minLng),
        //   new naver.maps.LatLng(maxLat, maxLng)
        // )
        // if (latlng.length > 1) {
        //   const map = new naver.maps.Map(mapDiv, {
        //       // minZoom: 10,
        //       // maxBounds: maxBoundary,
        //       center: new naver.maps.LatLng(middleLat, middleLng)
        //   })
        // } else {
        const map = new naver.maps.Map(mapDiv, {
            zoom: 14,
            center: new naver.maps.LatLng(middleLat, middleLng)
        })
        // }
        
        // 마커찍기
        const markerList = []
        for (let i=0, ii=latlng.length; i<ii; i++) {
            let marker = new naver.maps.Marker({
                position: latlng[i],
                map: map,           
            });

            marker.set('seq', i);
            markerList.push(marker);
        }      
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