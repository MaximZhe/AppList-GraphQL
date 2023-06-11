export function getPageCount(totalCount:number,limit:number){
    return Math.ceil(totalCount / limit)
}

export function getPagesArray (totalCountPages:number) {
    const result = []
    for(let i = 0; i< totalCountPages; i++){
        result.push(i+1)
    }
    return result;
}