export interface FormField {
    label: string
    type: 'number' | 'text'
    id: string
    min: number
    max: number
    value: number | string
    step?: number
    disabled?: boolean
    placeholder?: string
}

export interface Form {
    fields: FormField[]
    submitBtn: {
        text: string
    }
    onSubmit: (data: Record<string, any>) => void,
    id: string
}
