<template>
    <v-app>
        <v-app-bar :elevation="15">
            <v-list class="d-flex">
                <v-list-item>
                    <NuxtLink to="/">
                        Главная
                    </NuxtLink>
                </v-list-item>
                <v-list-item>
                    <NuxtLink to="/constructor">
                        Конструктор
                    </NuxtLink>
                </v-list-item>
                <v-list-item>
                    <NuxtLink to="/trainig">
                        Тренировка
                    </NuxtLink>
                </v-list-item>
                <v-list-item>
                    <NuxtLink to="/contrprokat">
                        Контрольный прокат
                    </NuxtLink>
                </v-list-item>
            </v-list>
        </v-app-bar>

        <v-main
            class="mt-5 mx-3"
        >
            <slot />
        </v-main>

    <!-- <v-footer
            class="bg-grey-lighten-1 h-10"
        >
            <v-row justify="center" no-gutters>
                <v-btn
                color="white"
                variant="text"
                class="mx-2"
                rounded="xl"
                >
                    О нас
                </v-btn>
            </v-row>
        </v-footer> -->
    </v-app>
</template>
