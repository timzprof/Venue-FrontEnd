const helperObj = {
    1: 31,
    2: [28, 29],
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31, 
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
}

const months = ['Jan', 'Feb', 'March', 'April', 'May', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec']

export const monthHelper  = (number) => {
    return months[number - 1]
}

export const daysOfMonthHelper = (date) => {
    
    const dateVar = new Date(date)
    const month =  dateVar.getMonth() + 1
    const year = dateVar.getFullYear()
    const leap = false
    if ((year % 4 === 0)){
        leap = true
        if(year % 100 === 0){
            if((year % 400 === 0)){
                leap = true
            }else{
                leap = false
            }
        }
    }

    let max = (month === 2) ? (leap === true) ? helperObj[2][1] : helperObj[2][0] : helperObj[month]
    const arr = []
    for (let i = 1; i < max + 1; i++){
        arr.push(i)
    }

    return arr
}




