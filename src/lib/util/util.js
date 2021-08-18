
const convertCookie = str => {
    let cookieData = { }
    let kvPairs = str.split(/[,;]/)
    for (let i = 0; i < kvPairs.length; i++) {
        let kv = kvPairs[i].trim()
        if (kv === '') { continue }
        const kvSplit = kv.split('=')
        cookieData[kvSplit[0]] = kvSplit[1]
    };
    return cookieData
}



const findCommon = (tagSet, postArray) => {

}



export { convertCookie, findCommon }