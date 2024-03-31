<template>
    <NuxtImg
        src="/img/logo.png"
        alt="Лого"
        sizes="xs:20vw sm:15vw lg:10vw xl:7vw"
        :class="{ 'logo_spaser': props.rightMargin }"
    />
</template>

<script
    lang="ts"
    setup
>
interface Props {
    rightMargin: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    rightMargin: false
})
</script>

<style scoped>
.logo_spaser {
    margin-right: auto;
}
</style>
