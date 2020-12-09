<template>
  <v-app>
    <!-- 툴바 -->
    <nav>
      <v-toolbar color="grey lighten-4" dense flat>
        <v-toolbar-title>
          <nuxt-link to="/">Travel</nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-text-field label="검색" />
          <v-btn depressed color="grey lighten-4" text nuxt to="/signup">
            <h4>Signup</h4>
          </v-btn>
          <v-btn depressed color="grey lighten-4" text nuxt to="/login">
            <h4>Login</h4>
          </v-btn>
          <v-btn depressed color="grey lighten-4" text nuxt to="">
            <h4>Logout</h4>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>

    <!-- 내용 -->
    <v-container>
      <nuxt />
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
<style>
/* 기본 */
* {
  box-sizing: border-box;
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
</style>
