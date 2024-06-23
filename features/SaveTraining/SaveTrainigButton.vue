<template>
    <v-btn
        @click="onSaveBtnClick"
    >
        Сохранить
    </v-btn>
</template>

<script setup lang="ts">

const isNotAuthModalOpen = ref(false)
const isSuccessModalOpen = ref(false)

const onSaveBtnClick = () => {
    console.log('onSaveBtnClick')
    // TODO: Как-нибудь определять авторизован ли пользователь или нет при сохранении
    // const isAuth = useAuth()
    const isAuth = false
    if (!isAuth) {
        isNotAuthModalOpen.value = true
    } else {
        // После успешного сохранения открываем модалку с успехом
        // TODO: Может нужно перенаправлять пользователя на другую страницу (На списк со всеми программами или на тренировку этой же программы)
        // TODO: Добавить лоадер, пока сохраняется программа
        isSuccessModalOpen.value = true
    }
}
</script>
