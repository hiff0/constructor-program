<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <v-form fast-fail @submit.prevent="register">
                <h2>Вход</h2>
                <v-text-field v-model="login" label="Логин"></v-text-field>

                <v-text-field v-model="password" label="Пароль" type="password"></v-text-field>
                <a href="#" class="text-body-2 font-weight-regular">Забыли пароль?</a>

                <v-btn type="submit" color="primary" block class="mt-2">
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
        </v-sheet>
    </div>
</template>

<script
    setup
    lang="ts"
>
const login = ref<string>('')
const password = ref<string>('')

const register = () => {
    console.log('login: ', login)
    console.log('password: ', password)
}
</script>
