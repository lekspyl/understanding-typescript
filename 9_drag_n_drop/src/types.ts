interface Validatable {
    value: string
    required: boolean
    minValue?: number
    maxValue?: number
    minLength?: number
    maxLength?: number
}
