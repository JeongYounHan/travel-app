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
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-chip class="ma-1" small>
                day{{item}}
            </v-chip>
          </span>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
        mapOptions: {},
        map: '',
        items: [
            1, 2, 3, 4, 5, 6
        ],
    }
  },
  computed: {
    ...mapState({
      scheduleList: state => state.trips.scheduleList
    })
  },
  mounted() {
      this.setMap()
  },
  methods: {
    setMap() {
        //지도를 삽입할 HTML 요소 또는 HTML 요소의 id를 지정합니다.
        const mapDiv = document.getElementById('map'); // 'map'으로 선언해도 동일

        //옵션 없이 지도 객체를 생성하면 서울 시청을 중심으로 하는 16 레벨의 지도가 생성됩니다.
        const map = new naver.maps.Map(mapDiv, {
            zoom: 16,
            center: new naver.maps.LatLng(37.3614483, 129.1114883)
        });

        // 마커찍기
        var latlngs = [
            new naver.maps.LatLng(37.3633324, 129.1054988),
            new naver.maps.LatLng(37.3632916, 129.1085015),
            new naver.maps.LatLng(37.3632507, 129.1115043),
            new naver.maps.LatLng(37.3632097, 129.114507),
            new naver.maps.LatLng(37.3631687, 129.1175097),
            new naver.maps.LatLng(37.3597282, 129.105422),
            new naver.maps.LatLng(37.3596874, 129.1084246),
            new naver.maps.LatLng(37.3596465, 129.1114272),
            new naver.maps.LatLng(37.3596056, 129.1144298),
            new naver.maps.LatLng(37.3595646, 129.1174323)
        ]

        const markerList = []
        for (let i=0, ii=latlngs.length; i<ii; i++) {

            let marker = new naver.maps.Marker({
                position: latlngs[i],
                map: map,
                // icon: {
                //     content: [
                //         '<div class="cs_mapbridge">',
                //             '<div class="map_group _map_group crs">',
                //                 '<div class="map_marker _marker num1 num1_big"> ',
                //                     '<span class="ico _icon"></span>',
                //                     '<span class="shd"></span>',
                //                 '</div>',
                //             '</div>',
                //         '</div>'
                //     ].join(''),
                //     size: new naver.maps.Size(38, 58),
                //     anchor: new naver.maps.Point(19, 58),
                // },            
            });

            marker.set('seq', i);
            markerList.push(marker);
            // console.log(marker)

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