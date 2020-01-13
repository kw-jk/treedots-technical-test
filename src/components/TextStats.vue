<template>
    <div
        id="e3"
        class="grey lighten-3"
    >
        <form @submit.prevent="analyseText">
        <v-card>
            <v-container
            fluid
            style="min-height: 0;"
            grid-list-lg
            >
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-flex xs12 sm12 v-if="error">
                            <v-alert type="error" dismissible v-model="error">
                                Please enter 1 or more characters but no more than 255 characters!
                            </v-alert>
                        </v-flex>
                        <v-card color="white">
                            <v-card-title primary-title>
                                <v-flex xs12>
                                    <v-text-field
                                    :rules="[(v) => v.length <= 255 || 'Max 255 characters']"
                                    :counter="255"
                                    name="sentence"
                                    label="Input sentence"
                                    id="sentence"
                                    type="text"
                                    v-model="sentence"
                                    required />
                                </v-flex>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn color="primary" type="submit">Analyze</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <ResultComponent :analysisResult="analysisResult" v-if='isAnalyse' />
                </v-layout>
            </v-container>
        </v-card>
        </form>
    </div>
</template>
<script>
import { analyseText } from '@/utils/TextStats'
import ResultComponent from '@/components/Result'
export default {
    name: "TextStats",
    components: {
        ResultComponent
    },
    data () {
        return {
            isAnalyse: false,
            sentence: '',
            analysisResult: '',
            error: false
        }
    },
    methods: {
        analyseText () {
            this.isAnalyse = false
            if (this.sentence.length > 255 || this.sentence.length == 0) {
                this.error = true
            } else {
                this.error = false
            }
            if (!this.error) {
                this.analysisResult = analyseText(this.sentence)
                this.isAnalyse = true
            }
        }
    }
}
</script>