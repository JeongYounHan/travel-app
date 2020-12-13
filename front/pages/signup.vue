<template>
  <div class="signup">
    <h2>Signup</h2>
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
        v-model="email"
        label="이메일"
        type="email"
        placeholder="example@example.com"
        :rules="emailRules"
        required
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
      <v-text-field
        class="form"
        label="비밀번호 확인"
        type="password"
        v-model="password2"
        placeholder="12345678"
        required
        :rules="password2Rules"
      />
      <v-btn class="btn" type="submit" :disabled="!valid">
        회원가입
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
      email: '',
      password: '',
      password2: '',
      usernameRules: [
        v => !!v || '아이디는 필수입니다.',
      ],
      emailRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.'
      ],
      passwordRules: [v => !!v || '비밀번호는 필수입니다.'],
      password2Rules: [
        v => !!v || '비밀번호 확인은 필수입니다.',
        v => v == this.password || '비밀번호가 같지 않습니다.' 
      ]
    }
  },

  computed: {},
  created() {
    // this.checkToken()
  },
  mounted() {},
  updated() {
    // this.checkToken()
  },
  methods: {
    ...mapMutations({
      // SET_ME: 'users/SET_ME'
    }),
    ...mapActions({
      SIGNUP: 'users/SIGNUP'
    }),
    onSubmit() {
      this.SIGNUP({username: this.username, email: this.email, password1: this.password, password2: this.password2})
    },
  },
  middleware: 'anonymous',
}
</script>

<style>
.signup {
  width: 60%;
  margin: 0 auto;
}
</style>
