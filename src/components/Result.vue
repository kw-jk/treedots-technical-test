<template>
    <v-flex xs12 class="result">
        <v-card color="grey lighten-5">
            <v-card-title>
                <v-flex xs12>
                    <span class="text title">Result:</span>
                    <v-divider></v-divider>
                </v-flex>
            </v-card-title>
            <template v-if="analysisResult">
                <v-card-text>
                    <v-flex xs12>
                        <v-simple-table
                        class="elevation-1"
                        >
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">Symbol</th>
                                        <th class="text-left">Character Count</th>
                                        <th class="text-left">Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="letter in analysisResult" :key="letter.char">
                                        <td>{{ letter.char }}</td>
                                        <td>{{ letter.count }}</td>
                                        <td>before: {{ letter.charAfter }} after: {{ letter.charBefore }}<template v-if="letter.maxDistance">: max-distances : {{ letter.maxDistance }}</template></td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-flex>
                </v-card-text>
            </template>
            <template v-if="checkResult">
                <v-card-text>
                    <v-flex xs12>
                        <span class="text checkresult">{{ checkResult }}</span>
                    </v-flex>
                </v-card-text>
            </template>
        </v-card>
    </v-flex>
</template>
<script>
export default {
    name: 'Result',
    props: ['analysisResult', 'checkResult'],
}
</script>