<template>
    <div class="d-flex justify-center align-center mb-5">
        <label for="constructorAudio" class="mr-3">
            {{ audioMetaData.audioName }}
        </label>
        <audio
            id="constructorAudio"
            ref="audioRef"
            :src="props.source"
            controls
        >
            К сожалению, ваш браузер не поддерживает встроенное аудио
        </audio>
    </div>
</template>

<script
    lang="ts"
    setup
>

interface Props {
    source: string;
}

const props = defineProps<Props>()

const audioMetaData = useAudioMetaData()
const audioRef = ref<HTMLMediaElement | null>(null)

onMounted(() => {
    audioMetaData.value.currentPlayerTime = audioRef.value.currentTime
    audioMetaData.value.audioDom = audioRef.value

    audioRef.value.ontimeupdate = (event) => {
        audioMetaData.value.currentPlayerTime = event.target.currentTime
    }
})
</script>
