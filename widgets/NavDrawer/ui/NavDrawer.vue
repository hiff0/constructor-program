<template>
    <v-navigation-drawer
        class="nav_drawer"
        app
        left
        absolute
        temporary
    >
        <v-list>
            <NuxtLink
                to="/"
                class="nav_drawer_item"
            >
                <v-list-item :class="`d-flex justify-center mb-1 bg-link${route.path === '/' ? '-active' : ''}`">
                    Главная
                </v-list-item>
            </NuxtLink>

            <NuxtLink
                to="/constructor"
                class="nav_drawer_item"
            >
                <v-list-item :class="`d-flex justify-center mb-1 bg-link${route.path === '/constructor' ? '-active' : ''}`">
                    Конструктор
                </v-list-item>
            </NuxtLink>

            <NuxtLink
                to="/trainig"
                class="nav_drawer_item"
            >
                <v-list-item :class="`d-flex justify-center mb-1 bg-link${route.path === '/trainig' ? '-active' : ''}`">
                    Тренировка
                </v-list-item>
            </NuxtLink>

            <NuxtLink
                to="/contrprokat"
                class="nav_drawer_item"
            >
                <v-list-item :class="`d-flex justify-center bg-link${route.path === '/contrprokat' ? '-active' : ''}`">
                    Контрольный прокат
                </v-list-item>
            </NuxtLink>
        </v-list>
    </v-navigation-drawer>
</template>

<script
    lang="ts"
    setup
>

const route = useRoute()
</script>

<style scoped>
.nav_drawer {
    background-color: #8C8F92;
}

.nav_drawer_item {
    text-decoration: none;
    color: white;
}
</style>
