<template>
    <v-btn
        icon
        v-bind="props"
        @click="onAvatarClick"
    >
        <v-avatar
            v-if="props.image"
            color="surface-variant"
            :image="props.image"
        >
        </v-avatar>

        <v-avatar
            v-else
            color="info"
        >
            <v-icon icon="mdi-account-circle"></v-icon>
        </v-avatar>
    </v-btn>
</template>

<script
    lang="ts"
    setup
>

interface Props {
    image?: string;
}

const props = defineProps<Props>()

const emits = defineEmits(['onAvatarClick'])

const onAvatarClick = () => {
    emits('onAvatarClick')
}
</script>
