<template>
    <input
        ref="audio"
        type="file"
        accept="audio/*"
        class="w-50 mb-5"
        @change="onFilePicked($event)"
    >
</template>

<script lang="ts" setup>

const emits = defineEmits(['loadAudio'])

const audioMetaData = useAudioMetaData()

const onFilePicked = (e: ChangeEvent) => {
    const files = e.target.files
    if (files[0] !== undefined) {
        const file = files[0]
        audioMetaData.value.audioUrl = URL.createObjectURL(file)
        audioMetaData.value.audioName = file.name.split('.')[0]
        const reader = new FileReader()

        reader.onload = (event) => {
            const audioContext = new AudioContext()
            const audioFile = event.target?.result as ArrayBuffer

            audioContext.decodeAudioData(audioFile, (buffer) => {
                audioMetaData.value.duration = buffer.duration
            })
        }

        reader.readAsArrayBuffer(file)

        reader.onerror = (event) => {
            console.log('An error ocurred reading the file: ', event)
        }

        emits('loadAudio')
    } else {
        console.log('Has not file')
    }
}
</script>
