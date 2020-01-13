<template>
    <div
        id="e3"
        class="grey lighten-3"
    >
        <form @submit.prevent="checkDigit">
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
                                {{ errorMessage }}
                            </v-alert>
                        </v-flex>
                        <v-card color="white">
                            <v-card-title primary-title>
                                <v-flex xs12>
                                    <v-text-field
                                    :rules="[(v) => v.length <= 255 || 'Max 255 characters']"
                                    :counter="255"
                                    name="digit"
                                    label="Input Digits"
                                    id="digit"
                                    type="number"
                                    v-model="digit"
                                    required />
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                    name="position"
                                    label="Input n-th (digits)"
                                    id="position"
                                    type="number"
                                    v-model="position"
                                    required />
                                </v-flex>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn color="primary" type="submit">Check</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <ResultComponent :checkResult="checkResult" v-if='isCheck' />
                </v-layout>
            </v-container>
        </v-card>
        </form>
    </div>
</template>
<script>
import { findNoInDigitPosition } from '@/utils/findpos'
import ResultComponent from '@/components/Result'
export default {
    name: "TextStats",
    components: {
        ResultComponent
    },
    data () {
        return {
            isCheck: false,
            digit: '',
            position: '',
            checkResult: '',
            errorMessage: '',
            error: false,
        }
    },
    methods: {
        checkDigit () {
            this.isCheck = false
            if (this.digit.length == 0 || this.position.length == 0) {
                this.error = true
                this.errorMessage = "Please ensure that both fields are filled up!"
            } else if (this.digit.length > 255) {
                this.error = true
                this.errorMessage = "Please enter no more than 255 characters!"
            } else if (!Number.isInteger(Number(this.digit)) || !Number.isInteger(Number(this.position))) {
                this.error = true
                this.errorMessage = "Please enter only numbers!"
            } else {
                this.error = false
                this.errorMessage = ""
            }
            if (!this.error) {
                let number = findNoInDigitPosition(this.position, this.digit)
                if (number) {
                    this.checkResult = "The number at position " + this.position + " is " + number
                } else {
                    this.checkResult = "You have entered a position that exceeded the total length of the digit input."
                }
                this.isCheck = true
            }
        }
    }
}
</script>