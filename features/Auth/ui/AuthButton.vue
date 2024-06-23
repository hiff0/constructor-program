<template>
    <v-btn
        @click="onAuthClick"
    >
        <slot></slot>
    </v-btn>
</template>

<script setup lang="ts">
const emits = defineEmits(['authClick'])
// TODO: МБ выпилить
const onAuthClick = () => {
    emits('authClick')
}
</script>
