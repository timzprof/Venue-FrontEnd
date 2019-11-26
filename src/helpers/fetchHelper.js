const BaseURL = 'https://venue-app.herokuapp.com'

const FetchHelper = (route, method="GET", body, authRequired, filesIncluded) => {
    
    let Token = ''
    if (authRequired){
        Token = JSON.parse(localStorage.getItem("Token"))
    }
    if(method === "GET"){
        return fetch(`${BaseURL}${route}`, {
            headers: {
                'Content-type': 'application/json'
            }
        })
    }else if (method === "DELETE"){
        return fetch(`${BaseURL}${route}`, {
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${Token}`
            }
        })
    }else{
        const headersObj = {
                   'Content-type': 'application/json',
                   'Authorization': `Bearer ${Token}`
        }
        const bodyObj = JSON.stringify(body)

        if (filesIncluded){
            delete headersObj['Content-type']
        }
        
        if(authRequired){
            return fetch(`${BaseURL}${route}`, {
                method,
                body: filesIncluded ? body : bodyObj,
                headers: headersObj
            })
        }else{
            return fetch(`${BaseURL}${route}`, {
                method,
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json'
                }
            })
        }
        
    }
}

export default FetchHelper