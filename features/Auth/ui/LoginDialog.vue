<template>
    <v-btn
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
                <v-text-field v-model="login" label="Логин"></v-text-field>

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
const login = ref<string>('')
const password = ref<string>('')
const isOpen = ref<boolean>(false)

// const { signIn } = useAuth()

const onLoginClick = () => {
    isOpen.value = true
}

const logIn = async () => {
    console.log('login')
    // try {
    //     const res = await signIn('credentials', {
    //         login: login.value,
    //         password: password.value
    //     })
    //     console.log('respons: ', res)
    // } catch (e) {
    //     console.log('error: ', e)
    // }
}
</script>
