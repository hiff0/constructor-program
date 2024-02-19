<template>
    <button
        type="button"
        :class="`element rounded-circle ${backgroundClass}`"
        @click="onElementClick"
    >
        {{ props.name }}
        <v-tooltip
            activator="parent"
            location="end"
        >
            {{ title }}
        </v-tooltip>
    </button>
</template>

<script
    lang="ts"
    setup
>
import { computed } from 'vue'

interface Props {
    name: string;
    title: string;
    type: 'jump' | 'track' | 'spin';
    isActive: boolean;
}

const props = withDefaults((defineProps<Props>()), {
    isActive: false
})
const emits = defineEmits(['elementClick'])

const backgroundClass = computed(() => props.isActive ? `bg-${props.type}-element` : 'bg-element')

const onElementClick = () => {
    emits('elementClick')
}
</script>

<style scoped>
.element {
    width: 40px;
    height: 40px;
}
</style>
