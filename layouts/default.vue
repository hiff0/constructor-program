<template>
    <v-app>
        <v-container fluid>
            <v-app-bar :elevation="15" class="bg-link-active">
                <v-app-bar-nav-icon class="mr-2" @click="drawer = !drawer"></v-app-bar-nav-icon>
                <ConstructorLogo :right-margin="true" />
                <UserAvatar />
            </v-app-bar>

            <NavDrawer
                v-model="drawer"
            />

            <v-main
                class="mt-5 mx-3"
            >
                <slot />
            </v-main>
        </v-container>
    </v-app>
</template>

<script
    lang="ts"
    setup
>
import NavDrawer from '@/widgets/NavDrawer/ui/NavDrawer.vue'
import UserAvatar from '@/entities/user/ui/UserAvatar.vue'

const drawer = ref(false)
</script>
