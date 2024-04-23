<template>
    <v-btn
        @click="onSaveBtnClick"
    >
        Сохранить
    </v-btn>
</template>

<script setup lang="ts">
const onSaveBtnClick = () => {
    console.log('onSaveBtnClick')
}
</script>
