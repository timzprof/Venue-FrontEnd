import React, {Fragment,useState, useRef, useContext} from 'react'
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
import Loader from '../../components/UI/loader/loader'
import { Redirect } from 'react-router-dom'
import Input from '../../components/input/input'
import { formValidator } from '../../helpers/formValidationHelper'
import { inputValidator } from '../../helpers/formValidationHelper'

const ViewVenue = ({history}) => {
    
    const venueState = useSelector(state => state.venues)
    const dispatch = useDispatch()


    const [modal, setModal] = useState(null)
    const [modalMode, setModalMode] = useState(null)
    const [redirect , setRedirect] = useState(false)
    const [authState] = useContext(AuthContext)
    const [notification, setNotification] = useContext()
    let showLoader = false


    const targetVenue = venueState.targetVenue
    
    const datePicker = () => {
        history.push("/date-picker")
    }



    const [formValid, setFormValid]  = useState(null)

    const [formDetails, setFormDetails] = useState({
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
        
        resources: [{name: "computers", value: targetVenue.resources[0].value}, {name: "internet", value: targetVenue.resources[1].value}],
        
        images: {value: [targetVenue.featureImage, targetVenue.image1, targetVenue.image2], rules:{
            max: 3, min: 1, allowedTypes:['image/jpeg', 'image/png', 'image/svg'], maxSize: 5    
        }, errorMessages: [], valid:true},
        // featureImage: '',
        // image1: '',
        // image2: ''
    })    
    
    const submitFunc = (e) => {
        e.preventDefault();
        setFormValid(formValidator(formDetails, setFormDetails, setFormValid))
        if(formValid){
            const formBody = {
                title: formDetails.title.value,
                address: formDetails.address.value,
                capacity: formDetails.address.capacity,
                featureImage: formDetails.images.value[0],
                image1: formDetails.images.value[1],
                image2: formDetails.images.value[2]
            }
            dispatch(venueActions.createVenue(formBody))
            reset()
        } 
    }

    const formUpdater = (e) => {
        let inputObject = {}
        if (e.target.type === "checkbox"){
            console.log("Checkbox", formDetails)
            inputObject = {
                ...formDetails,
                resources: formDetails.resources.map(resource => {
                    console.log(resource.name)
                    console.log(e.target.name)
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


    let modalItem = ""

    const venueDelete = () =>{
        dispatch(actions.deleteVenue(targetVenue.id))
        while (venueState.loading){
            showLoader = true
        }
        showLoader = false
        if(venueState.error.status == true && venueState.error.type == "deleteVenue"){
            setNotification({
                open: true,
                success: false,
                message: venueState.error.message
            })
        }else{
            setNotification({
                open: true,
                success: true,
                message: 'Venue was successfully deleted'
            })
            setRedirect(true)
        }        
    }

    const reset = () => {
        setModal(false)
        setModalMode(null)
    }
    if(modalMode == "delete"){
        modalItem = (
            <div className={styles.modalItemDelete}>{ showLoader ? <Loader color="#083a55" /> : (
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
                                <Button onClick={venueDelete}
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
                    }} />

                    <Input type="input"  changeFunc={formUpdater} value={formDetails.address.value} inputObj={{
                        name: 'address',
                        type: 'text',
                        label: 'Location'
                    }} />
                    <Input type="input"  changeFunc={formUpdater} value={formDetails.capacity.value} inputObj={{
                        name: 'capacity',
                        type: 'number',
                        label: 'Capacity'
                    }} />

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
                    }} />    

                    <div className={styles.btnHolderModal}>
                        <Button onClick={submitFunc} type="submit" text="Done" style={{
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
    return (
        <Fragment>
            <Modal open={modal} setOpen={setModal}>
                {modalItem}
            </Modal>
            <PageLayout>
            <div className={styles.ViewVenue}>
                    <div className={styles.subHeader}>
                        <NavLink to="/" className={styles.backLink}>Back</NavLink>
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
                        {/* {targetVenue.name} */}
                        Conference Hall

                    </h2>
                    <div className={styles.mainContent}>
                        <div className={styles.mainImage}>
                            <img src={targetVenue.featureImage}/>
                            <div className={styles.smallScreenImages}>
                                <img src={targetVenue.featureImage} />
                                {targetVenue.image1 ? <img src={targetVenue.image1} /> : null}
                                {targetVenue.image2 ? <img src={targetVenue.image2} /> : null}
                            </div>
                        </div>
                        <div className={styles.rightSection}>
                            <div className={styles.subImage}>
                                <img src={targetVenue.image1}/>
                            </div>
                            <div className={styles.tag}><span className={styles.bolden}> {targetVenue.address} </span></div>
                            <div className={styles.tag}><span className={styles.bolden}> {targetVenue.capacity} </span> seats </div>
                            <div className={styles.tag}> { targetVenue.resources[0].value ? <AvailableImage/> : <UnavailableImage/> } <span className={styles.bolden}>Computers</span></div>
                            <div className={styles.tag}> { targetVenue.resources[1].value ? <AvailableImage/> : <UnavailableImage/> } <span className={styles.bolden}>Internet</span></div>
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
        </PageLayout>
        </Fragment>
    )
}

export default withRouter(ViewVenue)
