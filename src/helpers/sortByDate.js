export const sortByDate = (arr) => {
    return arr.sort((a, b) => {
        if(new Date(a) > new Date(b)){
            return -1
        }
        return 1
    })
    
}