<template>
    <div
        class="draggable_grid"
    >
        <div
            v-if="elements.length"
            class="d-flex flew-wrap draggable_grid_element"
        >
            <DraggableElementView
                v-for="(element, index) in elements"
                :key="element.key"
                :element-index="index"
                :element="element"
            />
        </div>

        <div
            v-else
            class="h-100 d-flex justify-center align-center"
        >
            Добавьте элементы справа
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
>
import { useTableElements } from '~/composables'

const elements = useTableElements()
</script>

<style scoped>
.draggable_grid {
    min-width: 250px;
    min-height: 237px;
    max-width: 300px;
    border: 1px solid;
    border-radius: 15px;

    padding: 10px;
}

.draggable_grid_element {
    gap: 10px;
}
</style>
