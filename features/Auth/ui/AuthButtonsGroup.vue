<template>
    <template v-if="!isAuth">
        <LoginDialog />
        /
        <SignupDialog />
    </template>

    <UserAvatar v-else />
</template>

<script setup lang="ts">
import UserAvatar from '@entities/user/ui/UserAvatar.vue'
import LoginDialog from '@features/Auth/ui/LoginDialog.vue'
import SignupDialog from '@features/Auth/ui/SignupDialog.vue'

const isAuth = ref<boolean>(false)
</script>
