function generateDummyData(n) {
    const dummyData = []

    for (let i = 0; i < n; i++) {
        const data = {
            "id": i + 1,
            "title": `Title ${i + 1}`,
            "body": `Body ${i + 1}`
        }
        dummyData.push(data)
    }

    return dummyData
}

export default generateDummyData(60)