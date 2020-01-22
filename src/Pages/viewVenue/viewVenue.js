import React, {Fragment,useState, useEffect, useContext} from 'react'
import styles from './viewVenue.module.css'
import PageLayout from '../../components/pageLayout/pageLayout'
import { NavLink } from 'react-router-dom'
import Button from '../../components/UI/button/button'
import {ReactComponent as AvailableImage} from '../../assets/images/Group 19.svg'
import {ReactComponent as UnavailableImage} from '../../assets/images/Group 18.svg'
import { withRouter } from 'react-router-dom'
import Modal from '../../components/UI/modal/modal'
import { ReactComponent as Close } from '../../assets/images/close.svg'
import { AuthContext } from '../../contexts/AuthContext'
import { NotificationContext } from '../../contexts/notificationContext'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../actions/venueActions'
import * as bookingActions from '../../actions/bookingActions'
import { Redirect } from 'react-router-dom'
import Input from '../../components/input/input'
import { formValidator } from '../../helpers/formValidationHelper'
import { inputValidator } from '../../helpers/formValidationHelper'
import WholeLoader from '../../components/UI/wholeLoader/wholeLoader'
import Loader from '../../components/UI/loader/loader'
import Tag from '../../components/UI/tag/tag'

const ViewVenue = ({match ,history}) => {
    const venueState = useSelector(state => state.venues)
    const dispatch = useDispatch()
    const {params: {id}} = match

    const [modal, setModal] = useState(null)
    const [modalMode, setModalMode] = useState(null)
    const [redirect , setRedirect] = useState(false)
    const [authState] = useContext(AuthContext)
    const [notification, setNotification] = useContext(NotificationContext)

    const targetVenueState = venueState.targetVenue
    useEffect(() => {
        dispatch(bookingActions.clearBookingNotification())
        if (targetVenueState === null){
            dispatch(actions.getVenue(id))
        }
    }, [])
    const loading = venueState.loading
    const message = venueState.message
    
    const datePicker = () => {
        history.push(`/venue/${targetVenueState.id}/date-picker`)
    }

    const goBack = () => {
        history.goBack()
    }

    useEffect(() => {
        if(venueState.error.status === true){
            setNotification({
                open: true,
                success: false,
                text: venueState.error.errorMessage
            })
        }
    }, [venueState.error.status])

    useEffect(() => {
        if (venueState.success.status === true && venueState.success.successMessage === "venue was successfuly deleted"){
            setRedirect(true)
        }else if(venueState.success.status === true){
            setNotification({
                open: true,
                success: true,
                text: venueState.success.successMessage
            })
        }
    }, [venueState.success.status])



    const [formValid, setFormValid]  = useState(false)

    let targetVenue = targetVenueState ? {...targetVenueState} : {
        title: '',
        address: '',
        capacity: '',
        resources: [{name: 'computer', value: false}, {name: 'internet', value: false}],
    }
 
    const [formDetails, setFormDetails] = useState()

    useEffect(() => {
        if (targetVenueState){
            setFormDetails({
                title: { 
                    value: targetVenue.title,
                    rules:{
                        required: true
                    },
                    errorMessages: [],
                    valid:true
                },
                
                address: {value: targetVenue.address, rules:{
                    required: true
                }, errorMessages: [], valid:true},
                
                capacity: {value: targetVenue.capacity, rules:{
                    required: true
                }, errorMessages: [], valid:true},
                
                resources: [{name: "computers", value: targetVenue.resources[0].value === "true" ? true : false}], //{name: "internet", value:  targetVenue.resources[1].value === "true" ? true : false}],
                
                images: {value: [], rules:{
                    max: 3, allowedTypes:['image/jpeg', 'image/png', 'image/svg'], maxSize: 5    
                }, errorMessages: [], valid:true},
            })
            dispatch(bookingActions.getBookings(targetVenueState.id))
        }
    }, [targetVenueState])
    
    const submitFunc = (e) => {
        e.preventDefault();
        setFormValid(formValidator(formDetails, setFormDetails))
    }

    const finalSubmit = () => {
            const copyObj = {...formDetails}
            copyObj.resources = [...formDetails.resources]
            const tempTimeAllowed = ["8am", "8pm"]

            const formBody = new FormData() 
                formBody.append("title", copyObj.title.value)
                formBody.append("address", copyObj.address.value)
                formBody.append("capacity", parseInt(copyObj.capacity.value))
                formBody.append("resources", JSON.stringify(copyObj.resources))
                formBody.append("timeAllowed", JSON.stringify(tempTimeAllowed))
                
                // if only the images.length > 0
                if (copyObj.images.value.length > 0){
                    formBody.append("featureImage", copyObj.images.value[0])
                }

            if (copyObj.images.value[1]){
                formBody.append("image1", copyObj.images.value[1]) 
            }
            if (copyObj.images.value[2]){
                formBody.append("image2", copyObj.images.value[2]) 
            }

            dispatch(actions.editVenue(targetVenue.id, formBody))
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
                        return ({
                            ...resource,
                            value: (e.target.checked === "true" || e.target.checked === true)  ? true : false
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


    let modalItem = ""

    const venueDelete = () =>{
        dispatch(actions.deleteVenue(targetVenue.id))
        reset()        
    }


    function reset(){
        setModal(false)
        setModalMode(null)
        setFormDetails({
            title: { 
                value: targetVenue.title,
                rules:{
                    required: true
                },
                errorMessages: [],
                valid:true
            },
            
            address: {value: targetVenue.address, rules:{
                required: true
            }, errorMessages: [], valid:true},
            
            capacity: {value: targetVenue.capacity, rules:{
                required: true
            }, errorMessages: [], valid:true},
            
            resources: [{name: "computers", value: targetVenue.resources[0].value  === "true" ? true : false}, {name: "internet", value:  targetVenue.resources[1].value  === "true" ? true : false}],
            
            images: {value: [], rules:{
                max: 3, allowedTypes:['image/jpeg', 'image/png', 'image/svg'], maxSize: 5    
            }, errorMessages: [], valid:true}, 
        })
        setFormValid(false)
    }

    if(modalMode == "delete"){
        modalItem = (
            <div className={styles.modalItemDelete}>{(
                <React.Fragment>
                    <Close className="close" onClick={reset} />
                    <h2>Are you sure you want to delete this venue?</h2>
                    <span className={styles.warning}>This action cannot be reversed</span>
                    <div className={styles.btnGroup}>
                                <Button onClick={reset} text="Cancel" style={{
                                    color: "#f5f5f5",
                                    backgroundColor: "#083a55",
                                    marginRight: "20px",
                                    padding: "12px 30px"
                                }}  />
                                <Button type="submit" loading={loading} loaderColor="#DF7676" action={venueDelete}
                                    text="Delete" style={{
                                    color: "#DF7676",
                                    backgroundColor: "transparent",
                                    // border: "1px solid #DF7676",
                                    padding: "12px 30px"
                                }} />
                    </div>
                </React.Fragment>
            )}
            </div>
        )
    }else if(modalMode == "edit"){
        modalItem = (
            <div className={styles.modalItemEdit}>
                <Close className="close" onClick={reset} />
                <h2 className={styles.formHeader}>
                    Edit Venue
                </h2>
                <form action="">
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
                        <Button type="submit" loading={loading} action={submitFunc} text="Done" style={{
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
        )
    }

    if (redirect){
        return <Redirect to="/"/>
    }

    // if (message){
    //     if(message === "venue delete"){
    //         dispatch(actions.venueActionSuccess("Venue successfully deleted"))
    //         setRedirect(true)
    //     }else{
    //         dispatch(actions.venueActionSuccess("Venue successfully edited"))
    //     }
    // }


    return (
        <Fragment>
            <Modal open={modal} setOpen={setModal}>
                {modalItem}
            </Modal>
            <PageLayout>{

            loading && targetVenueState === null ? <Loader/> :
            <div className={styles.ViewVenue}>
            { loading ? <WholeLoader/> : null }
                    <div className={styles.subHeader}>
                        <NavLink onClick={goBack} className={styles.backLink}>Back</NavLink>
                            {authState ? <div className={styles.btnGroup}>
                                <Button 
                                    onClick={() => {
                                        setModal(true)
                                        setModalMode("edit")
                                    }}
                                    text="Edit Venue" style={{
                                    color: "#f5f5f5",
                                    backgroundColor: "#23B83C",
                                    marginRight: "20px",
                                    padding: "12px 30px"
                                }} />
                                <Button onClick={() => {
                                            setModal(true)
                                            setModalMode("delete")}} 
                                    text="Delete Venue" style={{
                                    color: "#DF7676",
                                    backgroundColor: "transparent", 
                                    border: "1px solid #DF7676",
                                    padding: "12px 30px"
                                }} />
                            </div> : null}
                    </div>    
                    <h2 className={styles.venueHeader}>
                        {targetVenue.title}
                    </h2>
                    <div className={styles.mainContent}>
                        <div className={styles.mainImage}>
                            <img src={targetVenue.featureImage}/>
                            <div className={styles.smallScreenImages }>
                                <img src={targetVenue.featureImage} />
                                {targetVenue.otherImages[0] ? <img src={targetVenue.otherImages[0]} /> : null}
                                {/* {targetVenue.otherImages[1] ? <img src={targetVenue.otherImages[1]} /> : null} */}
                            </div>
                        </div>
                        <div className={styles.rightSection}>
                            {targetVenue.otherImages[0] ? <div className={styles.subImage}>
                                <img src={targetVenue.otherImages[0]}/>
                            </div> : null}
                            <div className={styles.tag}><span className={styles.bolden}> {targetVenue.address} </span></div>
                            <div className={styles.tag}><span className={styles.bolden}> {targetVenue.capacity} </span> seats </div>
                            <span className={styles.tagsGroupHeader}>
                                Tags
                            </span>
                            <div className={styles.tagsGroup}>
                                {
                                    targetVenue.resources.map(resource => {
                                        if(resource.value === "true"){
                                            return (<Tag message={resource.name}></Tag>)
                                        }
                                        return null
                                    })
                                }
                            </div>
                            {/* <div className={styles.tag}> { targetVenue.resources[0].value === "true" ? <AvailableImage/> : <UnavailableImage/> } <span className={styles.bolden}>Computers</span></div> */}
                            {/* <div className={styles.tag}> { targetVenue.resources[1].value === "true" ? <AvailableImage/> : <UnavailableImage/> } <span className={styles.bolden}>Internet</span></div> */}
                        </div>
                    </div>
                    <div className={styles.btnHolder}>
                        <Button text={authState ? "Manage Bookings" : "Book"} style={{
                            color: "#fff",
                            backgroundColor: "#083a55",
                            margin: "0 auto",
                            marginTop: "15px"
                        }} onClick={datePicker}/>
                    </div>
                </div>
            }
            
            
        </PageLayout>
        </Fragment>
    )
}

export default withRouter(ViewVenue)
