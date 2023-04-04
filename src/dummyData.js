function generateDummyData(n) {
    const dummyData = []

    for (let i = 0; i < n; i++) {
        const data = {
            "id": i + 1,
            "title": "Book Review : The Design of Everyday Things by Don Norman",
            "body": "The Design of Everyday Things is required reading for anyone who is interested in the user experience. I personally like to reread it every year or two. Norman is aware of the durability of his work and the applicability of his principles to multiple disciplines. If you know the basics of design better than anyone else, you can apply them flawlessly anywhere."
        }
        dummyData.push(data)
    }

    return dummyData
}

export default generateDummyData(10)