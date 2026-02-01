const response = await fetch('/sentences.json');
const dummyData = await response.json();

const getTypeData = () => {
    try {
        const randInt: number = Math.floor(Math.random() * 10);
        const paragraph: string = dummyData[randInt]
        return paragraph.split(" ");
    } catch (error) {
        console.log("error in fetching data", error)
    }
}

export {
    getTypeData
}