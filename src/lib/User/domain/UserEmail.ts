export class UserEmail {
    value: string;

    constructor(value: string) {
        this.value = value;
        this.ensureIsValid();
    }

    private ensureIsValid() {
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.value)) {
            throw new Error('Email is not valid');
        }
    }
}