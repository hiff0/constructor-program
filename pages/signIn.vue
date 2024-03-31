<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <v-form fast-fail>
                <h2>Регистрация</h2>
                <v-text-field v-model="login" label="Логин"></v-text-field>

                <v-text-field v-model="password" label="Пароль" type="password"></v-text-field>

                <v-btn type="submit" color="primary" block class="mt-2" @click="signIn">
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
</template>

<script
    setup
    lang="ts"
>
const login = ref<string>('')
const password = ref<string>('')
const isLoading = ref<boolean>(false)

const signIn = async () => {
    try {
        isLoading.value = true
        await useFetch('/api/auth/signIn', {
            method: 'POST',
            body: { login, password }
        })
    } catch (e) {
        console.log('Create user error: ', e)
    } finally {
        isLoading.value = false
    }
}
</script>
