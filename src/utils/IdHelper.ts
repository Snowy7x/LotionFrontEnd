function GenerateUniqueID() {
    return (new Date()).getTime()
}

function GenerateRandomID() {
    return Math.random().toString(36).substring(7);
}

export { GenerateUniqueID, GenerateRandomID }