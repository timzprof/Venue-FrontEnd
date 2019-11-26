import React, { useState, useContext } from 'react'
import styles from './DatePicker.module.css'
import CalendarComponent from '../../components/calendar/calendar'
import PageLayout from '../../components/pageLayout/pageLayout'
import { NavLink } from 'react-router-dom'
import Button from '../../components/UI/button/button'
import EventShelf from '../../components/eventShelf/eventShelf'
import { withRouter } from 'react-router-dom'
import Modal from '../../components/UI/modal/modal'
import DropDown from '../../components/UI/dropDown/dropDown'
import { AuthContext } from '../../contexts/AuthContext'
import {daysOfMonthHelper} from '../../helpers/daysOfMonthHelper'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../actions/bookingActions'
import Input from '../../components/input/input'
import { inputValidator, formValidator } from '../../helpers/formValidationHelper' 




// for the datepicker in the drop down component (add a value and a onchange prop and then deal with those appropriately),
    // make it such that once the dropdown is clicked then you close the drop down
    // hide the scrollbar,
    // give the range prop some real values that will be gotten from the month of the date string passed
// there will be state for selected date
// there will be a redux state for this also.
// the selected date will determine the redux state
// the event shelf will have a prop so we'll take care of the prop of active and unacctive times here
// the callender will be given a prop(onchange) that will set the date




// for booking 
// will set the proper inputs and stuff
// create an update function - borrow the other one and trim it
// add an external validator function that will validate that a time is added , also a warning text will be put under it
// there must be both start and end times
// there will be a seperate state for the times and the date section of the booking
// for the phone number i'll do the normal editing and send the edited stuff
// an addtime function will be given to the add time button that will set the event time  and t


const DatePicker = ({ history }) => {
    const [modalOpen, setModalOpen] = useState()
    const [authState] = useContext(AuthContext)
    const venueState =  useSelector(state => state.venue)
    const bookingState = useSelector(state => state.booking)
    const dispatch = useDispatch()
    const [targetDate, setTargetDate] = (bookingState)

    const targetVenue = venueState.targetVenue


    const dateUpdater = (obj) => {
        console.log(obj)
        // set the reducers date
        // set internal date state
    }

    const [formValid, setFormValid]  = useState(null)

    const [formDetails, setFormDetails] = useState({
        eventTitle: { 
            value: '',
            rules:{
                required: true
            },
            errorMessages: [],
            valid:true
        },
        
        eventDescription: {value: '', rules:{
            required: true
        }, errorMessages: [], valid:true},

        contactName: {value: '', rules:{
            required: true
        }, errorMessages: [], valid:true},
        
        contactEmail: {value: '', rules:{
            required: true
        }, errorMessages: [], valid:true}
    })

    // i will use the same update function, but a different  onnchange function

    const [bookingInfo, setBookingInfo] = useState({
        date: {
            // default value should be the date date state
            value: targetDate,
            rules: {
                required: true,
            }, errorMessages: [], valid:true
        },
        timeframe: {
            value: [],
            rules: {
                required: true,
                min: 2
            }, 
            errorMessages: [],
            valid: true
        },
        contactNumber: {value: '', rules:{
            required: true,
            min: 11
        }, errorMessages: [],  valid:true}

    })

    const reset = () => {
        setModalOpen(null)
        setFormDetails({eventTitle: { 
            value: '',
            rules:{
                required: true
            },
            errorMessages: [],
            valid:true
        },
        
        eventDescription: {value: '', rules:{
            required: true
        }, errorMessages: [], valid:true},

        contactName: {value: '', rules:{
            required: true
        }, errorMessages: [], valid:true},
        
        contactEmail: {value: '', rules:{
            required: true
        }, errorMessages: [], valid:true}})
        setBookingInfo({
            date: {
                // default value should be the date date state
                value: targetDate,
                rules: {
                    required: true,
                }, errorMessages: [], valid:true
            },
            start: {
                value: '',
                rules: {
                    required: true,
                }, 
                errorMessages: [],
                valid: true
            },
            end: {
                value: '',
                rules: {
                    required: true,
                }, 
                errorMessages: [],
                valid: true
            },
            contactNumber: {value: '', rules:{
                required: true,
                min: 11
            }, errorMessages: [],  valid:true}
                
        })
    }

    const bookingUpdater = (name, value, e) => {
        let finalObj = {...bookingInfo}
        if(e){
            let tempVal = e.target.textContent.split('-').reduce((acc, current, i, array) => {
                if(i === (array.length - 1) && current.length > 4){
                    array.push(current[4])
                    acc.push(current.slice(0, 4))
                    return acc
                }
                acc.push(current)
                return acc
            }, [])

            finalObj.contactNumber.value = tempVal.join('')
            e.target.textContent = tempVal.join('-')
        }else{
            if(name === "date"){
                let dateVar = new Date(finalObj.date.value)
                dateVar.setDate(value)
                finalObj.date.value = new Date(dateVar).toLocaleDateString("en", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }) 
            }else{
                finalObj.name = value
            }
        }
        setBookingInfo(finalObj)
        let rules = finalObj.name.rules
        let type = e ? e.target.type : 'input'
        inputValidator(e, rules, finalObj, setBookingInfo, type)
    }
    

    
    const submitFunc = (e) => {
        e.preventDefault();
        formValidator(formDetails, setFormDetails, setFormValid)
        formValidator(bookingInfo, setBookingInfo, setFormValid)
        if(formValid){
            const formBody = {
                eventTitle: formDetails.title.value,
                eventDescription: formDetails.eventDescription.value,
                contactEmail: formDetails.contactEmail.value,
                contactName: formDetails.contactName.value,
                contactNumber: bookingInfo.contactNumber.value,
                date: bookingInfo.date.value,
                timeframe: [bookingInfo.start.value, bookingInfo.end.value]
            }
            dispatch(actions.createBooking(formBody))
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


    return (
        <React.Fragment>
            <Modal open={modalOpen} setOpen={setModalOpen}>
                <div className={styles.bookVenue}>
                    <form action="">
                        <div className={styles.bookVenueContainer}>
                        <div className={styles.otherdetails}>
                            <h2 className={styles.formHeader}>
                                Booking Details
                            </h2>
                            <Input type="input" changeFunc={formUpdater} value={formDetails.title.value} inputObj={{
                                name: 'eventTitle',
                                type: 'text',
                                label: 'Event title'
                            }} errorMessages={formDetails.eventTitle.errorMessages}/>
                            <Input type="input"  changeFunc={formUpdater} value={formDetails.address.value} inputObj={{
                                name: 'eventDescription',
                                type: 'text',
                                label: 'Description'
                            }} errorMessages={formDetails.eventDescription.errorMessages} />
                            
                            <h2 className={styles.formHeader}>
                                Contact Information
                            </h2>
                            <Input type="input"  changeFunc={formUpdater} value={formDetails.capacity.value} inputObj={{
                                name: 'contactName',
                                type: 'text',
                                label: 'Name'
                            }} errorMessages={formDetails.contactName.errorMessages}/>
                            <Input type="input"  changeFunc={formUpdater} value={formDetails.capacity.value} inputObj={{
                                name: 'contactEmail',
                                type: 'text',
                                label: 'Email'
                            }} errorMessages={formDetails.contactEmail.errorMessages}/>
                            <Input type="input"  changeFunc={formUpdater} value={formDetails.capacity.value} inputObj={{
                                name: 'contactNumber',
                                type: 'text',
                                label: 'Number'
                            }} errorMessages={bookingInfo.contactNumber.errorMessages}/>
                        </div>

                        <div className={styles.bookingDetails}>
                            <h2 className={styles.formHeader}>
                                Booking Period
                            </h2>
                            {/* find a way to get value off drop downs andset them in  */}
                            <DropDown name="date" onChange={bookingUpdater} label="July" options={daysOfMonthHelper(targetDate)} errorMessages={bookingInfo.date.errorMessages}/>
                            <div className={styles.flexContainer}>
                                <DropDown name="start" onChange={bookingUpdater} label="from" options={["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm"]} errorMessages={bookingInfo.start.errorMessages}/>
                                <DropDown name="end" onChange={bookingUpdater} label="to" options={["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm"]} errorMessages={bookingInfo.end.errorMessages}/>
                                {/* <Button 
                                 text="Select Time" style={{
                                    color: '#fff',
                                    backgroundColor: '#23B83C',
                                    marginTop: "20px"
                                }} /> */}

                            </div>
                            <div className={styles.timeHolder}>
                                {(bookingInfo.start.value && bookingInfo.end.value) ? <div className={styles.timeLabel}>
                            <span>{bookingInfo.date.value}, {bookingInfo.start.value} - {bookingInfo.end.value}</span>
                                </div>: null}
                                {/* <div className={styles.timeLabel}>
                                    <span>July 10, 1pm - 3pm</span>
                                </div><div className={styles.timeLabel}>
                                    <span>July 10, 1pm - 3pm</span>
                                </div> */}
                            </div>
                        </div>
                        </div>
                        <div className={styles.btnHolder}>
                            <Button 
                                 text="Submit" style={{
                                    color: '#fff',
                                    backgroundColor: '#23B83C',
                                    marginTop: "20px"
                             }} />
                        </div>
                    </form>
                </div>
            </Modal>
            <PageLayout>
                    <div className={styles.subHeader}>
                        <NavLink to="back" className={styles.backLink}>Back</NavLink>
                    </div>    
                    <h2 className={styles.venueHeader}>
                        {/* {targetVenue.name} */}
                        Conference Hall
                        <span className={styles.Date}>
                            {new Date().toLocaleDateString()}
                        </span>
                    </h2>
                    <div className={styles.mainContent}>
                        <CalendarComponent/>
                        <EventShelf/>
                        {/* Bookings */}  
                    </div>
                    {authState ? <Button onClick={() => {
                        history.push("/bookings")
                    }} text="Manage Bookings" style={{
                        color: '#fff',
                        backgroundColor: '#083a55',
                        marginTop: '20px'
                    }} /> : <Button onClick={() => {
                        setModalOpen(true)
                    }} text="Book" style={{
                        color: '#fff',
                        backgroundColor: '#083a55',
                        marginTop: '20px'
                    }} />}
            </PageLayout>
        </React.Fragment>
    )
}

export default withRouter(DatePicker) 
