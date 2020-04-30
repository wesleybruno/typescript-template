class BaseModel {

    private error: string[]
    constructor() {
        this.error = []
    }

    isValid(): boolean {
        return this.error.length == 0 ? true : false
    }

    addError(error: string): void {
        this.error.push(error)
    }

    clear() {
        this.error = []
    }

    get errors(): string[] {
        return this.error
    }

    get toObj(): string {
        return JSON.stringify(this)
    }

}

export default BaseModel