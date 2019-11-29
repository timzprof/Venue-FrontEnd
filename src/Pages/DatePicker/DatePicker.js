import React, { useState, useContext, useEffect, Fragment } from 'react'
import styles from './DatePicker.module.css'
import CalendarComponent from '../../components/calendar/calendar'
import PageLayout from '../../components/pageLayout/pageLayout'
import { NavLink, withRouter } from 'react-router-dom'
import Button from '../../components/UI/button/button'
import EventShelf from '../../components/eventShelf/eventShelf'
import Modal from '../../components/UI/modal/modal'
import DropDown from '../../components/UI/dropDown/dropDown'
import { AuthContext } from '../../contexts/AuthContext'
import {monthHelper, daysOfMonthHelper} from '../../helpers/daysOfMonthHelper'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../actions/bookingActions'
import * as venueActions from '../../actions/venueActions'
import Input from '../../components/input/input'
import { inputValidator, formValidator } from '../../helpers/formValidationHelper' 
import WholeLoader from '../../components/UI/wholeLoader/wholeLoader'
import {timesArray, filterBooking} from '../../helpers/filterBookings'
import Loader from '../../components/UI/loader/loader'
import { NotificationContext } from '../../contexts/notificationContext'


const DatePicker = ({match, history }) => {
    const {params: {id}} = match 
    const [modalOpen, setModalOpen] = useState()
    const [authState] = useContext(AuthContext)
    const [notification, setNotification] = useContext(NotificationContext)
    const venueState =  useSelector(state => state.venues)
    const bookingState = useSelector(state => state.bookings)
    const dispatch = useDispatch()
    const [targetDate, setTargetDate] = useState(new Date().toLocaleDateString("en", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }))



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
        if(bookingState.success.status === true){
            setNotification({
                open: true,
                success: true,
                text: bookingState.success.successMessage
            })
        }
    }, [bookingState.success.status])


    const targetVenue = venueState.targetVenue
    const goBack = () => {
        history.goBack()
    }

    useEffect(() => {
        dispatch(actions.clearBookingNotification())
        if (targetVenue === null){
            dispatch(venueActions.getVenue(id))
        }
    }, [])
    
    useEffect(() => {
        dispatch(actions.getRequiredBookings(targetDate))
    }, [targetDate, bookingState.bookings])

    useEffect(() => {
        if(targetVenue){
            dispatch(actions.getBookings(targetVenue.id))
        }
    }, [targetVenue])
 

    const [formValid, setFormValid]  = useState(false)

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
        start: {
            value: 0,
            rules: {
                required: true,
            }, 
            errorMessages: [],
            valid: true
        },
        end: {
            value: 0,
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

    const dateUpdater = (obj) => {
        setTargetDate(new Date(obj).toLocaleDateString("en", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }))
        setBookingInfo({
            ...bookingInfo,
            ['date']: {
                ...bookingInfo['date'],
                value: new Date(obj).toLocaleDateString("en", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })
            }
        })
    }


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
            let tempVal = e.target.value.split('-').reduce((acc, current, i, array) => {
                if(i === (array.length - 1) && current.length > 4){
                    acc.push(current.slice(0, 4))
                    acc.push(current[4])
                    return acc
                }
                acc.push(current)
                return acc
            }, [])

            finalObj.contactNumber.value = tempVal.join('')
            e.target.value = tempVal.join('-')
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
                finalObj[name].value = value
            }
        }
        setBookingInfo(finalObj)
        let rules = finalObj[name].rules
        let type = e ? e.target.type : 'input'
        const event = e ? e : {
            target: {
                value: value,
                name: name
            }
        }
        inputValidator(event, rules, finalObj, setBookingInfo, type)
    }
    

    
    const submitFunc = (e) => {
        e.preventDefault();
        setFormValid(formValidator(formDetails, setFormDetails))
        setFormValid(formValidator(bookingInfo, setBookingInfo))
    }

    const finalSubmit = () => {
        const formBody = {
            eventTitle: formDetails.eventTitle.value,
            eventDescription: formDetails.eventDescription.value,
            contactName: formDetails.contactName.value,
            contactEmail: formDetails.contactEmail.value,
            contactPhone: parseInt(bookingInfo.contactNumber.value),
            date: bookingInfo.date.value,
            timeframe: [bookingInfo.start.value, bookingInfo.end.value],
            venueId: targetVenue.id
        }
        setFormValid(false)
        dispatch(actions.createBooking(formBody))
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
                            <Input type="input" changeFunc={formUpdater} value={formDetails.eventTitle.value} inputObj={{
                                name: 'eventTitle',
                                type: 'text',
                                label: 'Event title'
                            }} errorMessages={formDetails.eventTitle.errorMessages}/>
                            <Input type="input"  changeFunc={formUpdater} value={formDetails.eventDescription.value} inputObj={{
                                name: 'eventDescription',
                                type: 'text',
                                label: 'Description'
                            }} errorMessages={formDetails.eventDescription.errorMessages} />
                            
                            <h2 className={styles.formHeader}>
                                Contact Information
                            </h2>
                            <Input type="input"  changeFunc={formUpdater} value={formDetails.contactName.value} inputObj={{
                                name: 'contactName',
                                type: 'text',
                                label: 'Name'
                            }} errorMessages={formDetails.contactName.errorMessages}/>
                            <Input type="input"  changeFunc={formUpdater} value={formDetails.contactEmail.value} inputObj={{
                                name: 'contactEmail',
                                type: 'text',
                                label: 'Email'
                            }} errorMessages={formDetails.contactEmail.errorMessages}/>
                            <Input type="input"  changeFunc={(e) => bookingUpdater('contactNumber', bookingInfo.contactNumber.value, e)} inputObj={{
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
                            <DropDown name="date" valueDate={new Date(bookingInfo.date.value).getDate()} onChange={bookingUpdater} label={monthHelper(new Date(targetDate).getMonth())} options={daysOfMonthHelper(targetDate)} errorMessages={bookingInfo.date.errorMessages}/>
                            <div className={styles.flexContainer}>
                                <DropDown name="start" onChange={bookingUpdater} label="from" options={["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"]} errorMessages={bookingInfo.start.errorMessages}/>
                                <DropDown name="end" onChange={bookingUpdater} label="to" options={["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"]} errorMessages={bookingInfo.end.errorMessages}/>
                            </div>
                            <div className={styles.timeHolder}>
                                {(bookingInfo.start.value && bookingInfo.end.value) ? <div className={styles.timeLabel}>
                            <span>{bookingInfo.date.value}, {bookingInfo.start.value} - {bookingInfo.end.value}</span>
                                </div>: null}
                            </div>
                            { bookingInfo.start.errorMessages.length > 0 || bookingInfo.end.errorMessages.length > 0 ? <p className={styles.warning}>you must insert both start and end times</p> : null}
                            <div className={styles.btnHolder}>
                            <Button onClick={submitFunc}
                                 text="Submit" style={{
                                    color: '#fff',
                                    backgroundColor: '#23B83C',
                                    marginTop: "20px"
                             }} />
                        </div>
                        </div>
                        </div>
                    </form>
                </div>
            </Modal>
            <PageLayout>
                { venueState.loading === true && venueState.targetVenue === null ? <Loader color='#083a55'/> : <Fragment>
                {bookingState.loading ? <WholeLoader/> : null}
                    <div className={styles.subHeader}>
                        <NavLink onClick={goBack} className={styles.backLink}>Back</NavLink>
                    </div>    
                    <h2 className={styles.venueHeader}>
                        {targetVenue.title}
                        <span className={styles.Date}>
                            {new Date(targetDate).toLocaleDateString("en", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            })}
                        </span>
                    </h2>
                    <div className={styles.mainContent}>
                        <CalendarComponent value={targetDate} onChange={dateUpdater}/>
                        <EventShelf filtered={filterBooking(bookingState.selectedBookings)}/>
                        {/* Bookings */}  
                    </div>
                    {authState ? <Button onClick={() => {
                        history.push(`/bookings/${targetVenue.id}/${targetDate}`)
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
                </Fragment> }
            </PageLayout>
        </React.Fragment>
    )
}

export default withRouter(DatePicker) 
