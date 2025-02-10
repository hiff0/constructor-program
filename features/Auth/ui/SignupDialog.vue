<template>
  <v-btn
    disabled
    @click="onSignupClick"
  >
    Регистрация
  </v-btn>

  <v-dialog
    v-model="isOpen"
  >
    <div class="d-flex align-center justify-center" style="height: 100vh">
      <v-sheet width="400" class="mx-auto">
        <v-form fast-fail>
          <h2>Регистрация</h2>
          <v-text-field v-model="email" label="Почта"></v-text-field>

          <v-text-field v-model="password" label="Пароль" type="password"></v-text-field>

          <v-btn type="button" color="primary" block class="mt-2" @click="signIn">
            Зарегистрироваться
          </v-btn>
        </v-form>
        <div class="mt-2">
          <p class="text-body-2">
            Есть аккаунт?
            <router-link to="/login">
              Войти
            </router-link>
          </p>
        </div>
      </v-sheet>
    </div>
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
// const isLoading = ref<boolean>(false)

const onSignupClick = () => {
  isOpen.value = true
}

const signIn = async () => {
  const user = await userApi.signUp({
    email: email.value,
    password: password.value
  })
  isOpen.value = false
  console.log('user: ', user)
  // TODO: Добавить лоадер и окно с успешной регистрацией
  // TODO: Может нужно будет куда-то редиректить
}
</script>
