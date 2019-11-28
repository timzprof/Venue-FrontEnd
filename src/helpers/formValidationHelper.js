export const formValidator = (recievedFromDetails, setFormDetails, setFormValid) => {
    let formValid = true
    let formDetails = {...recievedFromDetails}
    Object.keys(formDetails).forEach(detail => {
        if (detail === 'resources'){
            formDetails[detail] = [...recievedFromDetails[detail]]    
        }else{
            formDetails[detail] = {...recievedFromDetails[detail]}
            formDetails[detail].errorMessages = [...recievedFromDetails[detail].errorMessages]
        }        
    }) 

    Object.keys(formDetails).forEach(key => {
        if (formDetails[key].rules){
            Object.keys(formDetails[key].rules).forEach(rule => {
                if (rule === "max"){
                    if (formDetails[key].value.length > formDetails[key].rules[rule]){
                        formDetails = {
                            ...formDetails,
                            [key]: {
                                ...formDetails[key],
                                errorMessages: 
                                formDetails[key].errorMessages.concat(`Maximimum number of ${(key === "images") ? 'files' : 'characters'} allowed is ${formDetails[key].rules[rule]}`)
                            }
                        }
                        formValid = false
                    }
                }
                else if (rule === "min"){
                    if (formDetails[key].value.length < formDetails[key].rules[rule]){
                        formDetails = {
                            ...formDetails,
                            [key]: {
                                ...formDetails[key],
                                errorMessages: formDetails[key].errorMessages.concat(`Minimun number of ${(key === "images") ? 'files' : 'characters'} allowed is ${formDetails[key].rules[rule]}`)
                            }
                        }
                        formValid = false

                    }
                }
                else if (rule === "required"){
                    console.log(key )
                    if (formDetails[key].value.length <= 0 || formDetails[key].value <= 0 ){
                        formDetails = {
                            ...formDetails,
                            [key]: {
                                ...formDetails[key],
                                errorMessages: 
                                formDetails[key].errorMessages.concat('This field is required')
                            }
                        }
                        formValid = false
                    }
                }else if (rule === "maxSize"){
                    let filesValid = true
                    if (formDetails[key].value.length > 0){
                        formDetails[key].value.forEach(file => {
                            if(file.size > (formDetails[key].rules[rule] * 1024 * 1024)){
                                filesValid = false
                            }
                        })
                        if(filesValid === false){
                            formDetails = {
                                ...formDetails,
                                [key]: {
                                    ...formDetails[key],
                                    errorMessages: 
                                    formDetails[key].errorMessages.concat(`The file size must not exceed ${formDetails[key].rules[rule]} mb`)
                                }
                            }
                            formValid = false
                        }
                    }
                }else if (rule === "allowedTypes"){
                    let filesValid = true
                    if (formDetails[key].value.length > 0){
                        formDetails[key].value.forEach(file => {
                            let seenFileType = false
                            formDetails[key].rules[rule].forEach(filetype => {
                                if ((file.type) === filetype){
                                    seenFileType = true
                                }
                            })
                            if (seenFileType === false){
                                filesValid = false
                            }
                        })
                        if (filesValid === false){
                            formDetails = {
                                ...formDetails,
                                [key]: {
                                    ...formDetails[key],
                                    errorMessages: 
                                    formDetails[key].errorMessages.concat(`The files must be ${key}`)
                                }
                            }
                            formValid = false
                        }
                    }
                }
            })
        }
    })
    setFormDetails(formDetails)
    return formValid
}





export const inputValidator = (e, rules, formDetails, setFormDetails,type) => {
    let finalObj = {...formDetails}
    finalObj[e.target.name].errorMessages = []
    console.log(finalObj)
    let valid = true
    const key = e.target.name
    Object.keys(rules).forEach(rule => {
        if(rule == 'max' ){
            if (type == 'file'){
                if (e.target.files.length > rules['max']){
                    valid = false
                    finalObj = {
                        ...finalObj,
                        [key]: {
                            ...finalObj[key],
                            errorMessages:finalObj[key].errorMessages.concat(`Maximimum number of ${(key === "images") ? 'files' : 'characters'} allowed is ${finalObj[key].rules[rule]}`)
                        }
                    }
                }
            }else{
                if (e.target.value.length > rules['max']){
                    valid = false
                    finalObj = {
                        ...finalObj,
                        [key]: {
                            ...finalObj[key],
                            errorMessages:finalObj[key].errorMessages.concat(`Maximimum number of ${(key === "images") ? 'files' : 'characters'} allowed is ${finalObj[key].rules[rule]}`)
                        }
                    }
                }
            }
        }else if (rule == "min"){
            if (type == 'file'){
                if (e.target.files.length < rules['min']){
                    valid = false
                    finalObj = {
                        ...finalObj,
                        [key]: {
                            ...finalObj[key],
                            errorMessages: 
                            finalObj[key].errorMessages.concat(`Minimum number of ${(key === "images") ? 'files' : 'characters'} allowed is ${finalObj[key].rules[rule]}`)
                        }
                    }
                }
            }else{
                if (finalObj[key].value.length < rules['min']){
                    valid = false
                    finalObj = {
                        ...finalObj,
                        [key]: {
                            ...finalObj[key],
                            errorMessages: 
                            finalObj[key].errorMessages.concat(`Minimum number of ${(key === "images") ? 'files' : 'characters'} allowed is ${finalObj[key].rules[rule]}`)
                        }
                    }
                }
            }
        }else if (rule == 'required'){
            console.log("yes you were required")
            if (type == 'file'){
                if (e.target.files.length <= 0){
                    valid = false
                    finalObj = {
                        ...finalObj,
                        [key]: {
                            ...finalObj[key],
                            errorMessages: 
                            finalObj[key].errorMessages.concat('This field is required')
                        }
                    }
                }
            }else{
                console.log("e", e)
                if (e.target.value === '' || e.target.value <= 0){
                    console.log(key)
                    valid = false
                    finalObj = {
                        ...finalObj,
                        [key]: {
                            ...finalObj[key],
                            errorMessages: 
                            finalObj[key].errorMessages.concat('This field is required')
                        }
                    }
                }
            }
        }else if (rule == 'maxSize'){
            let filesValid = true
            if (e.target.files.length > 0){
                [...e.target.files].forEach(file => {
                    if(file.size > (rules[rule] * 1024 * 1024)){
                        filesValid = false
                    }
                })
                if(filesValid === false){
                    finalObj = {
                        ...finalObj,
                        [key]: {
                            ...finalObj[key],
                            errorMessages: 
                            finalObj[key].errorMessages.concat(`The file size must not exceed ${finalObj[key].rules[rule]} mb`)
                        }
                    }
                    valid = false  
                }
            }
        }else if (rule == 'allowedTypes'){
            let fileArray = Array(...e.target.files)
            let filesValid = true
                if (e.target.files.length > 0){
                    fileArray.forEach(file => {
                        let seenFileType = false
                        rules[rule].forEach(filetype => {
                            if ((file.type) === filetype){
                                seenFileType = true
                            }
                        })
                        if (seenFileType === false){
                            filesValid = false
                        }
                    })
                    if (filesValid === false){
                        finalObj = {
                            ...finalObj,
                            [key]: {
                                ...finalObj[key],
                                errorMessages: 
                                finalObj[key].errorMessages.concat(`The files must be ${key}`)
                            }
                        }
                        valid = false
                    }
                }
        } 
        // image type, image size, 
        
        
        if (valid){
            setFormDetails({
                ...formDetails,
                [key]: {
                    ...formDetails[key],
                    errorMessages: []
                }
            })
        }else{
            setFormDetails({
                ...finalObj,
                [key]: {
                    ...finalObj[key],
                    valid: valid
                }
            })    
        }
    })
}
