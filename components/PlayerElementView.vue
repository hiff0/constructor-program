<template>
    <div
        class="player_element"
    >
        {{ props.element.fullname }}
    </div>
</template>

<script setup lang="ts">
import type { ElementTableView } from '@/interfaces'

interface Props {
    element: ElementTableView
}

const props = defineProps<Props>()
</script>

<style scoped>
.player_element {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: none;

    border-radius: 10px;
    background-color: #aaaaaa;
}
</style>
