<template>
    <div
        class="elements_list d-flex flex-column flex-wrap"
    >
        <ElementView
            v-for="(element, index) in props.elements"
            :key="element.key"
            :name="element.name"
            :title="element.title"
            :type="props.type"
            :is-active="isActiveElement(index)"
            @element-click="onElementClick(index)"
        />
    </div>
</template>

<script
    lang="ts"
    setup
>
import ElementView from '@/entities/element/ui/ElementView'
import type { Jump, Track, Spin } from '@/interfaces'

interface Props {
    elements: Array<Jump | Track | Spin>;
    type: 'jump' | 'track' | 'spin';
}

const props = defineProps<Props>()

const emits = defineEmits(['elementClick'])

const activeIndex = ref(0)

const isActiveElement = (index: number) => activeIndex.value === index

const onElementClick = (index: number) => {
    activeIndex.value = index
    emits('elementClick', index)
}

</script>

<style scoped>
.elements_list {
    max-height: 250px;
    gap: 5px;
}
</style>
