<template>
    <v-app>
        <v-container fluid>
            <!-- <v-app-bar :elevation="15">
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-toolbar-title>КОНСТРУКТОР ПРОГРАММ</v-toolbar-title>
            </v-app-bar> -->

            <NavDrawer />

            <v-main
                class="mt-5 mx-3"
            >
                <slot />
            </v-main>
        </v-container>
    </v-app>
</template>
