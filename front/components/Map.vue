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
            <v-chip class="ma-1" small @click.prevent="day = item">
                day {{item}}
            </v-chip>
          </span>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

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
      daySchedule: state => state.trips.daySchedule,
      // changeInOrder: state => state.trips.changeInOrder
    }),
  },
  watch: {
    // 새로 장소 추가하면 그 변경 감지하기 위해
    daySchedule: {
      deep: true,
      handler() {
        this.fetchMap()
      }
    },
    // scheduleList에서 드래그앤 드롭 변경 감지하기 위해
    scheduleList: {
      deep: true,
      handler() {
        this.onDayChange(this.day)
      }      
    },
    // day bar의 변경 감지하기 위해
    day() {
      this.onClickChip(this.day)
    }
  },
  mounted() {
      this.onDayChange(1)
  },
  methods: {
    ...mapMutations({
      SET_DAYSCROLL: 'trips/SET_DAYSCROLL'
    }),
    ...mapActions({
      FETCH_DAYSCHEDULE: 'trips/FETCH_DAYSCHEDULE'
    }),
    onClickChip(item) {
      this.SET_DAYSCROLL(item)
      this.onDayChange(item)
    },
    onDayChange(item) {
        //데이터 받아오기
        this.FETCH_DAYSCHEDULE({trip: this.tripSelected, day: item})
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

        // daySchedule을 order 값 기준으로 sort 해야
        let dayScheduleInOrder = [...this.daySchedule]
        dayScheduleInOrder.sort((a,b) => {
          return a.order < b.order ? -1 : a.order > b.order ? 1 : 0
        })
        // 선택된 날의 좌표 뽑기
        dayScheduleInOrder.forEach(element => {
          middleLat = middleLat + element.place.lat
          middleLng = middleLng + element.place.lng
          let temp = new naver.maps.LatLng(element.place.lat, element.place.lng)
          latlng.push(temp)

          // 최대 최소 계산
          if (element.place.lat > maxLat) {
            maxLat = element.place.lat
          } 
          if (element.place.lat < minLat) {
            minLat = element.place.lat
          }

          if (element.place.lng > maxLng) {
            maxLng = element.place.lng
          } 
          if (element.place.lng < minLng) {
            minLng = element.place.lng
          }
        });

        // 중심 좌표 계산
        const tempLength = Object.keys(dayScheduleInOrder).length
        if (tempLength) {
          middleLat = middleLat / tempLength
          middleLng = middleLng / tempLength
        } else {
          middleLat = 37.56664532365792
          middleLng = 126.97793969616743
        }
        minLat = minLat - 0.1
        minLng = minLng - 0.1
        // 옵션 없이 지도 객체를 생성하면 서울 시청을 중심으로 하는 16 레벨의 지도가 생성
        // 모든 점들 다 들어오게 하려면 바운더리 설정 필요
        let maxBoundary = new naver.maps.LatLngBounds(
          new naver.maps.LatLng(minLat, minLng),
          new naver.maps.LatLng(maxLat, maxLng)
        )
        
        if (latlng.length > 1) {
          let map = new naver.maps.Map(mapDiv, {
              zoom: 12,
              maxBounds: maxBoundary,
          })

          // 마커찍기
          let markerList = []
          for (let i=0, ii=latlng.length; i<ii; i++) {
              let marker = new naver.maps.Marker({
                  position: latlng[i],
                  map: map,           
              });

              marker.set('seq', i)
              markerList.push(marker)
          }  

          // 폴리라인 찍기
          let polyline = new naver.maps.Polyline({
            map: map,
            path: latlng
          })

        } else {
          let map2 = new naver.maps.Map(mapDiv, {
              zoom: 13,
              // maxBounds: maxBoundary
              center: new naver.maps.LatLng(middleLat, middleLng)
          })

          // 마커찍기
          let markerList2 = []
          for (let i=0, ii=latlng.length; i<ii; i++) {
              let marker2 = new naver.maps.Marker({
                  position: latlng[i],
                  map: map2,           
              });

              // marker2.set('seq', i);
              // markerList2.push(marker2);
          }   
        }   
    },
  }
}
</script>

<style>
#map {
    position: relative;
    margin-left: 300px;
    height: calc(100vh - 49px);
}

.v-chip-group {
    z-index: 3;
}

.daysNav {
    position: absolute;
    bottom: 5px;
    left: 6px;
    z-index: 180;
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