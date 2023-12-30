<template>
    <v-btn
        type="button"
        class="player_element"
        @click="onElementClick"
    >
        {{ props.element.fullname }}
    </v-btn>
</template>

<script setup lang="ts">
import type { ElementTableView } from '@/interfaces'

interface Props {
    element: ElementTableView
}

const props = defineProps<Props>()

const emits = defineEmits(['elementClick'])

const onElementClick = () => {
    emits('elementClick', props.element)
}
</script>

<style scoped>
.player_element {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: none;
}
</style>
