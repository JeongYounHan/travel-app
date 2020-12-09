<template>
  <div class="login">
    <h2>Login</h2>
    <v-form v-model="valid" @submit.prevent="onSubmit">
      <v-text-field
        class="form"
        label="이메일"
        type="email"
        v-model="email"
        autofocus
        placeholder="example@example.com"
        required
        :rules="emailRules"
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
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      emailRules: [
        v => !!v || '이메일은 필수입니다.',
        v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.'
      ],
      passwordRules: [v => !!v || '비밀번호는 필수입니다.']
    }
  },

  computed: {},
  created() {},
  mounted() {},
  methods: {
    ...mapMutations({
      SET_ME: 'users/SET_ME'
    }),
    onSubmit() {
      // 임시 로그인
      if (this.email === 'test@test.com' && this.password === '123') {
        this.SET_ME({ email: this.email })
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>
.login {
  width: 60%;
  margin: 0 auto;
}
</style>
