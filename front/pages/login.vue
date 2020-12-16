<template>
  <div class="login">
    <h2>Login</h2>
    <v-form v-model="valid" @submit.prevent="onSubmit">
      <v-text-field
        class="form"
        label="아이디"
        type="username"
        v-model="username"
        autofocus
        placeholder="example"
        required
        :rules="usernameRules"
      />
      <v-text-field
        class="form"
        label="비밀번호"
        type="password"
        v-model="password"
        placeholder="12345678"
        required
        :rules="passwordRules"
      />
      <v-btn class="btn" type="submit" :disabled="!valid">
        로그인
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      usernameRules: [
        v => !!v || '아이디는 필수입니다.',
      ],
      passwordRules: [v => !!v || '비밀번호는 필수입니다.']
    }
  },

  computed: {},
  created() {
    // this.getToken()
  },
  mounted() {},
  updated() {

  },
  methods: {
    ...mapMutations({
      LOGINM: 'users/LOGIN'
    }),
    ...mapActions({
      LOGIN: 'users/LOGIN'
    }),
    onSubmit() {
      this.LOGIN({username: this.username, password: this.password})
    },
    // getToken(token){
    //   if(process.browser){
    //     const token = localStorage.getItem("token")
    //     console.log(token)
    //     this.LOGINM(token)
    //   }
    // }
  },
  middleware: 'anonymous',
}
</script>

<style>
.login {
  width: 60%;
  margin: 0 auto;
}
</style>
