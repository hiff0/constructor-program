<template>
  <v-btn
    disabled
    @click="onLoginClick"
  >
    Вход
  </v-btn>

  <v-dialog
    v-model="isOpen"
    width="500px"
  >
    <v-card class="mx-auto">
      <v-form fast-fail>
        <h2>Вход</h2>
        <v-text-field v-model="email" label="Почта"></v-text-field>

        <v-text-field v-model="password" label="Пароль" type="password"></v-text-field>
        <a href="#" class="text-body-2 font-weight-regular">Забыли пароль?</a>

        <v-btn type="button" color="primary" block class="mt-2" @click="logIn">
          Войти
        </v-btn>
      </v-form>
      <div class="mt-2">
        <p class="text-body-2">
          Нет аккаунта?
          <router-link to="/signIn">
            Зарегистрироваться
          </router-link>
        </p>
      </div>
    </v-card>
  </v-dialog>
</template>

<script
    setup
    lang="ts"
>
import { useUserApi } from '@entities/user/api'

const email = ref<string>('')
const password = ref<string>('')
const isOpen = ref<boolean>(false)
const userApi = useUserApi()
// const { signIn } = useAuth()

const onLoginClick = () => {
  isOpen.value = true
}

const logIn = async () => {
  const user = await userApi.signIn({
    email: email.value,
    password: password.value
  })
  isOpen.value = false
  console.log('user: ', user)
}
</script>
