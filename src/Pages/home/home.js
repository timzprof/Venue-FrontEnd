import React, { useState, useRef, useContext, useEffect, useCallback } from 'react'
import styles from './home.module.css'
import PageLayout from '../../components/pageLayout/pageLayout'
import Button from '../../components/UI/button/button'
import { ReactComponent as AddImage } from '../../assets/images/Union 17.svg'
import Card from '../../components/UI/card/card'
import Modal from '../../components/UI/modal/modal'
import { ReactComponent as Close } from '../../assets/images/close.svg'
import { AuthContext } from '../../contexts/AuthContext'
import { useSelector, useDispatch } from 'react-redux'
import * as venueActions from '../../actions/venueActions'
import Loader from '../../components/UI/loader/loader'
import { NotificationContext } from '../../contexts/notificationContext'
import Input from '../../components/input/input'
import { formValidator } from '../../helpers/formValidationHelper'
import { inputValidator } from '../../helpers/formValidationHelper'
import EmptyList from '../../components/UI/emptyList/emptyList'




const Home = () => {
    const venueState = useSelector(state => state.venues)
    const dispatch = useDispatch()
    const [notification, setNotification] = useContext(NotificationContext)
    const [modalOpen, setModalOpen] = useState()
    const [authState] = useContext(AuthContext)
    
   
    const [formValid, setFormValid]  = useState(false)
    
    const [formDetails, setFormDetails] = useState({
        title: { 
            value: '',
            rules:{
                required: true
            },
            errorMessages: [],
            valid:true
        },
        
        address: {value: '', rules:{
            required: true
        }, errorMessages: [], valid:true},
        
        capacity: {value: 0, rules:{
            required: true
        }, errorMessages: [], valid:true},
        
        resources: [{name: "computers", value: false}, {name: "internet", value: false}],
        
        images: {value: [], rules:{
            max: 3, min: 1, allowedTypes:['image/jpeg', 'image/png', 'image/svg'], maxSize: 5    
        }, errorMessages: [], valid:true},
        // featureImage: '',
        // image1: '',
        // image2: ''
    })    


    const submitFunc = (e) => {
        e.preventDefault();
        setFormValid(formValidator(formDetails, setFormDetails))
    }

    const finalSubmit = () => {
            const copyObj = {...formDetails}
            copyObj.resources = [...formDetails.resources]
            const tempTimeAllowed = JSON.stringify(["8am", "8pm"])

            const formBody = new FormData() 
                formBody.append("title", copyObj.title.value)
                formBody.append("address", copyObj.address.value)
                formBody.append("capacity", parseInt(copyObj.capacity.value))
                formBody.append("resources", JSON.stringify(copyObj.resources))
                formBody.append("featureImage", copyObj.images.value[0])
                formBody.append("timeAllowed", tempTimeAllowed)
            
            if (copyObj.images.value[1]){
                formBody.append("image1", copyObj.images.value[1])   
            }
            if (copyObj.images.value[2]){
                formBody.append("image2", copyObj.images.value[2])   
            }

            dispatch(venueActions.createVenue(formBody))
            reset()
    }

    if (formValid){
        finalSubmit()
    }


    const formUpdater = (e) => {
        let inputObject = {}
        if (e.target.type === "checkbox"){
            inputObject = {
                ...formDetails,
                resources: formDetails.resources.map(resource => {
                    if(resource.name === e.target.name){
                        console.log({
                            ...resource,
                            value: e.target.checked
                        })
                        return ({
                            ...resource,
                            value: e.target.checked
                        })
                    }

                    return resource
                })
            }
            setFormDetails(inputObject)
        }else if (e.target.type === "file"){
            inputObject = {
                ...formDetails,
                [e.target.name]: {
                    ...formDetails[e.target.name],
                    value: [...e.target.files]
                }
            }
            setFormDetails(inputObject)
        }else{
            inputObject = {
                ...formDetails,
                [e.target.name]: {
                    ...formDetails[e.target.name],
                    value: e.target.value
                }
            }
            setFormDetails(inputObject)
        }
        if(e.target.type !== 'checkbox'){
            let rules = formDetails[e.target.name].rules
            let type = e.target.type
            inputValidator(e, rules, inputObject, setFormDetails, type)
        }
    }


    
    useEffect(() => {
        dispatch(venueActions.getVenues())
    }, [])

    useEffect(() => {
        setNotification({
                    open: venueState.error.status,
                    success: venueState.error.status ? false : null ,
                    text: venueState.error.errorMessage
                })
    }, [venueState.error.status])
      
    const cardList = venueState.venues.map((venueObj) => <Card venueObj={venueObj}/>)
    function reset (){
        setModalOpen()
        setFormDetails({
            title: {value: '', rules:{
                required: true
            }, errorMessages: [], valid:true},
            
            address: {value: '', rules:{
                required: true
            }, errorMessages: [], valid:true},
            
            capacity: {value: 0, rules:{
                required: true
            }, errorMessages: [], valid:true},
            
            resources: [{name: "computers", value: false}, {name: "internet", value: false}],
            
            images: {value: [], rules:{
                max: 3, min: 1, allowedTypes:['image/jpeg', 'image/png', 'image/svg'], maxSize: 5    
            }, errorMessages: [], valid:true}  
        })
        setFormValid(false)
    }

    

    return (
        <React.Fragment>
            <Modal open={modalOpen} setOpen={setModalOpen}>
            <div className={styles.modalItemEdit}>
                <Close className="close" onClick={reset} />
                <h2 className={styles.formHeader}>
                    Create Venue
                </h2>
                <form >

                    <Input type="input" changeFunc={formUpdater} value={formDetails.title.value} inputObj={{
                        name: 'title',
                        type: 'text',
                        label: 'Name'
                    }} errorMessages={formDetails.title.errorMessages} />

                    <Input type="input"  changeFunc={formUpdater} value={formDetails.address.value} inputObj={{
                        name: 'address',
                        type: 'text',
                        label: 'Location'
                    }} errorMessages={formDetails.address.errorMessages} />
                    <Input type="input"  changeFunc={formUpdater} value={formDetails.capacity.value} inputObj={{
                        name: 'capacity',
                        type: 'number',
                        label: 'Capacity'
                    }} errorMessages={formDetails.capacity.errorMessages} />

                    <Input type="checkbox"  changeFunc={formUpdater}  checked={formDetails.resources[0].value} inputObj={{
                        type: 'checkbox',
                        id: 'checky1',
                        name: 'computers',
                        label: 'Computers'
                    }} />
                    <Input type="checkbox"  changeFunc={formUpdater}  checked={formDetails.resources[1].value} inputObj={{
                        type: 'checkbox',
                        id: 'checky2',
                        name: 'internet',
                        label: 'Internet'
                    }} />

                    <Input type="file" changeFunc={formUpdater} inputObj={{
                        type: 'file',
                        name: 'images',
                        label: 'Add Image',
                        multiple: true,
                        accept: 'image/*' 
                    }} errorMessages={formDetails.images.errorMessages}  />    

                    <div className={styles.btnHolderModal}>
                        <Button onClick={(e) => submitFunc(e)} type="submit" text="Done" style={{
                            backgroundColor: "#23B83C",
                            color: "#fff",
                            padding: "12px 45px",
                            margin: "0 auto",
                            display: "inline-block",
                            float: "center"
                        }
                        }/>
                    </div>
                </form>
            </div>
        </Modal>
        <PageLayout>
            <div className={styles.Home}>
                <div className={styles.subHeader}>
                    {authState ? <Button onClick={() => setModalOpen(true)} text="Add New Venue" image={AddImage} style={{
                        color: "#f5f5f5",
                        backgroundColor: "#23B83C",
                    }} /> : null}
                </div>
                <div className={styles.cardList}>
                    {venueState.loading ? <Loader color="#083A55"/>  : (cardList.length > 0) ? cardList : <EmptyList label="venues"/>  }
                </div>
            </div>
        </PageLayout>
        </React.Fragment> 
    )
}

export default Home
