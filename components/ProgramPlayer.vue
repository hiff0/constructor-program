<template>
    <div class="d-flex justify-center align-center mb-5">
        <PlayerElementView
            :element="prevElement"
        />

        <v-icon
            icon="mdi-play"
            title="Прерыдущий элемент"
            size="x-large"
            color="red"
            tag="button"
            class="ml-5"
            @click="onPrevElementClick"
        >
        </v-icon>

        <PlayerElementView
            :element="currentElement"
        />

        <v-icon
            icon="mdi-play"
            title="Следующий элемент"
            size="x-large"
            color="green"
            tag="button"
            style="transform: rotate(180deg)"
            class="mr-5"
            @click="onNextElementClick"
        >
        </v-icon>

        <PlayerElementView
            :element="nextElement"
        />
    </div>
</template>

<script
    setup
    lang="ts"
>
import type { CurrentThreeElements, ElementTableView, ElementView } from '@/interfaces'

interface Props {
    currentsThreeElements: CurrentThreeElements;
}

const props = defineProps<Props>()

const emptyElemment: ElementView = {
    difficultLvls: {},
    key: '',
    name: '',
    title: ''
}

const prevElement = computed<ElementTableView | ElementView>(() => props.currentsThreeElements.prevElement || emptyElemment)
const currentElement = computed<ElementTableView | ElementView>(() => props.currentsThreeElements.currentElement || emptyElemment)
const nextElement = computed<ElementTableView | ElementView>(() => props.currentsThreeElements.nextElement || emptyElemment)

const onNextElementClick = () => {
    console.log('nextElement: ', nextElement)
}

const onPrevElementClick = () => {
    console.log('prevElement: ', prevElement)
}
</script>
