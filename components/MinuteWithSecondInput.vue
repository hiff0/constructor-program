<template>
    <input
        v-model="timeRef"
        type="time"
        @input="onInput"
    >
</template>

<script
    setup
    lang="ts"
>

interface Props {
    value?: string;
}

const props = defineProps<Props>()

const timeRef = ref<string>(props.value || '')

const emits = defineEmits(['input'])

const onInput = () => {
    emits('input', timeRef.value)
}

</script>
