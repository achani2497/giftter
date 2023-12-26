export class EmailAlreadyUsed extends Error {
    constructor(message: string) {
        super(message)
    }
}