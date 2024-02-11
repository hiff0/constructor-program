<template>
    <template v-if="!isFileLoad">
        <input
            ref="audio"
            type="file"
            accept="audio/*"
            class="w-50 mb-5"
            @change="onFilePicked($event)"
        >
    </template>
    <div
        v-else
        class="d-flex justify-center align-center mb-5"
    >
        <v-btn
            @click="playAudio"
        >
            Play
        </v-btn>
        <v-btn
            @click="stopAudio"
        >
            Stop
        </v-btn>
        <label for="constructorAudio" class="mr-3">
            {{ audioMetaData.audioName }}
        </label>
        <audio
            id="constructorAudio"
            ref="audioRef"
            controls
            :src="audioMetaData.audioUrl"
            @timeupdate="onTimeUpdate"
        >
            К сожалению, ваш браузер не поддерживает встроенное аудио
        </audio>
        <!-- <canvas
            ref="canvasRef"
            class="visual-canvas"
            width="250"
            height="80"
        ></canvas> -->
    </div>
</template>

<script
    lang="ts"
    setup
>

const audioMetaData = useAudioMetaData()
const audioRef = ref<HTMLMediaElement | null>(null)
// const canvasRef = ref<HTMLCanvasElement | null>(null)

const isFileLoad = ref<boolean>(false)
const analyser = ref<AnalyserNode | null>(null)

// const draw = () => {
//     requestAnimationFrame(draw)

//     if (analyser.value && canvasRef.value) {
//         const bufferLength = analyser.value.frequencyBinCount
//         const dataArr = new Uint8Array(bufferLength)
//         analyser.value.getByteFrequencyData(dataArr)
//         const canvas = canvasRef.value
//         const ctx = canvas.getContext('2d')
//         if (ctx) {
//             ctx.clearRect(0, 0, canvas.width, canvas.height)

//             const barWidth = (canvas.width / bufferLength) * 2.5
//             let barHeight
//             let x = 0

//             for (let i = 0; i < bufferLength; i++) {
//                 barHeight = dataArr[i]

//                 // Use 2D rendering context to draw a rectangle of height proportional to barHeight
//                 ctx.fillStyle = 'rgb(' + Math.floor(barHeight + 100) + ',50,50)'
//                 ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2)
//                 x += barWidth + 1
//             }
//         }
//     }
// }

const onFilePicked = (e: ChangeEvent) => {
    const files = e.target.files
    if (files[0] !== undefined) {
        const file = files[0]
        audioMetaData.value.audioUrl = URL.createObjectURL(file)
        audioMetaData.value.audioName = file.name.split('.')[0]
        const reader = new FileReader()

        reader.onload = (event) => {
            const audioContext = new AudioContext()
            const source = audioContext.createMediaElementSource(audioRef.value as HTMLMediaElement)
            analyser.value = audioContext.createAnalyser()
            analyser.value.fftSize = 2048
            analyser.value.connect(audioContext.destination)
            source.connect(analyser.value)

            const audioFile = event.target?.result as ArrayBuffer

            audioContext.decodeAudioData(audioFile, (buffer) => {
                audioMetaData.value.duration = buffer.duration
            })

            if (audioRef.value) {
                audioMetaData.value.currentPlayerTime = audioRef.value.currentTime
                audioMetaData.value.audioDom = audioRef.value
            }

            // draw()
        }

        reader.readAsArrayBuffer(file)

        reader.onerror = (event) => {
            console.log('An error ocurred reading the file: ', event)
        }

        isFileLoad.value = true
    } else {
        console.log('Has not file')
    }
}

const playAudio = () => {
    audioRef.value?.play()
}

const stopAudio = () => {
    audioRef.value?.pause()
}

const onTimeUpdate = (event: Event) => {
    audioMetaData.value.currentPlayerTime = event.target.currentTime
    // draw()
}

</script>
