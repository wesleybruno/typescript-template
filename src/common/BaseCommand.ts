class BaseCommand {

    errors: string[];
    constructor() {
        this.errors = [];
    }

    isValid(): boolean {
        return this.errors.length === 0;
    }
    addError(message: string): null {
        this.errors.push(message);
        return null;
    }

    addArrayError(arr: any): null {
        if (arr instanceof Array) {
            this.errors.push(...arr)
        } else {
            this.errors.push(arr);
        }

        return null
    }

    addErrors(errors: Array<string>, prefix: string = ''): null {
        errors.forEach((message: string) => {
            this.addError(`${prefix ? prefix + '.' : ''}${message}`);
        });

        return null;
    }
    clear(): Array<string> {
        this.errors = [];
        return this.errors;
    }


    handleException(ex: Error) {
        console.error(ex.stack)
        this.addError(ex.message);

        return false
    }
}

export default BaseCommand