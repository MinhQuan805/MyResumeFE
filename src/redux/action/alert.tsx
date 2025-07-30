export const displayAlert = (message: string, type: string) => {
    return {
        type: type,
        message: message,
    }
}