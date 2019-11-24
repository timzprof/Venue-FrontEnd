const BaseURL = 'https://venue-app.herokuapp.com'

const FetchHelper = (route, method="GET", body, authRequired) => {
    
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
    }else{
        if(authRequired){
            return fetch(`${BaseURL}${route}`, {
                method,
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${Token}`
                }
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