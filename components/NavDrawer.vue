<template>
    <v-navigation-drawer class="nav_drawer">
        <v-list>
            <v-list-item>
                <NuxtLink to="/">
                    <ConstructorLogo />
                </NuxtLink>
            </v-list-item>

            <v-divider></v-divider>

            <NuxtLink to="/">
                <v-list-item class="nav_drawer_item mb-1">
                    Главная
                </v-list-item>
            </NuxtLink>

            <NuxtLink to="/constructor">
                <v-list-item class="nav_drawer_item mb-1">
                    Конструктор
                </v-list-item>
            </NuxtLink>

            <NuxtLink to="/trainig">
                <v-list-item class="nav_drawer_item mb-1">
                    Тренировка
                </v-list-item>
            </NuxtLink>

            <NuxtLink to="/contrprokat">
                <v-list-item class="nav_drawer_item">
                    Контрольный прокат
                </v-list-item>
            </NuxtLink>
        </v-list>
    </v-navigation-drawer>
</template>

<!-- FIXME: Вынести цвета в переменные -->
<style scoped>
.nav_drawer {
    background-color: #8C8F92;
}

.nav_drawer_item {
    background-color: #D0D1D2;
    text-decoration: none;
}
</style>
