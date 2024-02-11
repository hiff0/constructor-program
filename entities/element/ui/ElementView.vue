<template>
    <v-btn
        class="element rounded-circle"
        :value="props.index"
    >
        {{ props.name }}
        <v-tooltip
            activator="parent"
            location="end"
        >
            {{ title }}
        </v-tooltip>
    </v-btn>
</template>

<script
    lang="ts"
    setup
>
interface Props {
    name: string;
    title: string;
    index: number;
}

const props = defineProps<Props>()
</script>

<style scoped>
.element {
    width: 40px;
    height: 40px;
}
</style>
