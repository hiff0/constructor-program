<template>
    <v-btn
        @click="onAddElementClick"
    >
        <v-icon
            icon="mdi-plus"
            size="x-large"
            start
        ></v-icon>
        Добавить элемент
    </v-btn>
</template>

<script
    lang="ts"
    setup
>

const emits = defineEmits(['onAddElementClick'])

const onAddElementClick = () => {
    emits('onAddElementClick')
}
</script>
