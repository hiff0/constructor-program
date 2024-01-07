<template>
    <div>
        <v-row>
            <v-col>
                <ProgramName />
                <RinkCanvas />
                <ProgramPlayer
                    v-if="isFileLoad"
                />
                <AVWaveForm
                    v-if="isFileLoad"
                />
                <SelectFile
                    v-else
                    @load-audio="onLoadAudio"
                />

                <ElemetsTable />
            </v-col>
            <v-col cols="4">
                <ElementsGridsTabs />
            </v-col>
        </v-row>
    </div>
</template>

// TODO: перейти на FSD

<script
    setup
    lang="ts"
>
definePageMeta({
    layout: 'default'
})

const isFileLoad = ref<boolean>(false)

const onLoadAudio = () => {
    isFileLoad.value = true
}
</script>
