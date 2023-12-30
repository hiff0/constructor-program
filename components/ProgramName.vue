<template>
    <div class="mb-5">
        <v-text-field
            id="programName"
            v-model="programName"
            label="Название программы"
            variant="outlined"
            class="w-50"
        >
        </v-text-field>
    </div>
</template>

<script
    setup
    lang="ts"
>
const programName = useProgramName()
</script>
