<template>
  <v-app>
    <!-- 툴바 -->
    <nav>
      <v-toolbar class="toolbar" dense flat>
        <v-toolbar-title>
          <nuxt-link to="/">Traverse</nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <!-- <v-text-field label="검색" /> -->
          <v-btn v-if="!me" depressed color="transparent" text nuxt to="/signup">
            <h4>Signup</h4>
          </v-btn>
          <v-btn v-if="!me" depressed color="transparent" text nuxt to="/login">
            <h4>Login</h4>
          </v-btn>
          <v-btn v-if="me" depressed color="transparent" text @click.prevent="logout">
            <h4>Logout</h4>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>

    <!-- 내용 -->
    <nuxt />

  </v-app>
</template>

<script>
import {mapState, mapActions} from 'vuex'


export default {
  components:{

  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      me: state => state.users.me
    })
  },
  methods: {
    ...mapActions({
      LOGOUT: 'users/LOGOUT'
    }),
    logout() {
      this.LOGOUT()
    }
  }
}
</script>
<style>
/* 기본 */
* {
  box-sizing: border-box;
}

.theme--light.application {
  background-color: transparent;
}

h1,
h2,
h3,
h4,
p {
  margin: 16px 0;
  color: #4d4d4d;
}

.form {
  width: 100%;
  background-color: #e2e4e6;
  border: 1px solid #cdd2d4;
  border-radius: 3px;
  display: block;
  margin-bottom: 12px;
  padding: 6px 8px;
  transition: all 0.3s;
}

.btn {
  border-radius: 3px;
  padding: 6px 8px;
  background-color: #e2e4e6;
  border: none;
  display: inline-block;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  cursor: pointer;
}

.v-toolbar {
  border-bottom: 1px solid rgb(209, 209, 209);
  background-color: transparent !important;
}

a {
  text-decoration: none;
}

</style>
