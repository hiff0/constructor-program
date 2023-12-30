<template>
    <div class="grid grid-cols-4 gap-3">
        <ElementView
            v-for="element in props.elements"
            :key="element.key"
            :element="element"
        />
    </div>
</template>

<script
    setup
    lang="ts"
>
import type { Jump, Track, Spin } from '~/interfaces'

interface Props {
    elements: Array<Jump | Track | Spin>;
}

const props = defineProps<Props>()

</script>
