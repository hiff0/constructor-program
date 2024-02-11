<template>
    <div>
        <v-btn-toggle
            v-model="selectedElementIndex"
            @update:model-value="onElementSelected"
        >
            <ElementView
                v-for="(element, index) in props.elements"
                :key="element.key"
                :name="element.name"
                :index="index"
                :title="element.title"
            />

            <template #next>
                next Slot
            </template>
        </v-btn-toggle>
    </div>
</template>

<script
    lang="ts"
    setup
>
import { ref } from 'vue'
import ElementView from '@/entities/element/ui/ElementView'
import type { Jump, Track, Spin } from '@/interfaces'

interface Props {
    elements: Array<Jump | Track | Spin>;
}

const props = defineProps<Props>()

const emits = defineEmits(['elementSelected'])

const selectedElementIndex = ref(0)

const onElementSelected = () => {
    emits('elementSelected', selectedElementIndex.value)
}
</script>
