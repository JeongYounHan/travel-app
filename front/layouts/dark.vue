<template>
  <v-app dark>
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
            <div>Signup</div>
          </v-btn>
          <v-btn depressed color="grey lighten-4" text nuxt to="/profile">
            <div>Login</div>
          </v-btn>
          <v-btn depressed color="grey lighten-4" text nuxt to="/signup">
            <div>Logout</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>

    <!-- 내용 -->
    <nuxt />
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
<style></style>
