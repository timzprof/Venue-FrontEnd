import React, {useState, useEffect, useContext, Fragment} from 'react'
import styles from './viewBookings.module.css'
import PageLayout from '../../components/pageLayout/pageLayout'
import {NavLink, withRouter} from 'react-router-dom'
import Booking from '../../components/UI/booking/booking'
import Modal from '../../components/UI/modal/modal'
import DropDown from '../../components/UI/dropDown/dropDown'
import Button from '../../components/UI/button/button'
import { ReactComponent as Close } from '../../assets/images/close.svg'
import { useSelector, useDispatch } from 'react-redux'
import  WholeLoader from '../../components/UI/wholeLoader/wholeLoader'
import { translate2 } from '../../helpers/filterBookings'
import FetchHelper from '../../helpers/fetchHelper'
import * as bookingActions from '../../actions/bookingActions'
import * as venueActions from '../../actions/venueActions'
import { NotificationContext } from '../../contexts/notificationContext'
import Input from '../../components/input/input'
import Loader from '../../components/UI/loader/loader'


// import {  }

const ViewBookings = ({match}) => {
    const { params: {venueid, date} } = match
    const [ notification, setNotification] = useContext(NotificationContext)
    const [modalOpen, setModalOpen] = useState()
    const dispatch = useDispatch()
    const venueState = useSelector(state => state.venues)
    const bookingState = useSelector(state => state.bookings)
    const bookingList = bookingState.selectedBookings.map(booking => <Booking bookingObj={booking} /> )
    const [loading, setLoading] = useState(false)
    let errorMessage = ""

    useEffect(() => {
        dispatch(venueActions.getVenue(venueid))
    }, [])

    const [times, setTimes] = useState({
        start: '',
        end: ''
    })  

    const [disableAll, setDisableAll] = useState(false)
    const reset = () => {
        setTimes({
            start: '',
            end: ''
        })

        setDisableAll(false)
        if(modalOpen){
            setModalOpen(false)
        }
    }

    useEffect(() => {
        reset()
    }, [bookingState.bookings])

    const changer = (name, textValue) => {
        if(name === "start"){
            setTimes({
                ...times,
                [name]: textValue         
            })
        }else{
            const endValue = translate2(textValue)
            const startValue = translate2(times.start)
            if (endValue < startValue){
                setTimes({
                    end: times.start,
                    start: textValue 
                })
            }else{
                setTimes({
                    ...times,
                    end: textValue 
                })
            } 
        }
    }


    const submitForm = () => {
        if (disableAll) {
            setLoading(true)
            const body = {
                date: date,
                venueId: venueid
            }
            FetchHelper('/api/v1/booking/disable', "POST", body, true)
            .then((res) => res.json())
            .then(data => {
                setLoading(false)
                dispatch(bookingActions.createBookingSuccess(data.data))
                setNotification({
                    open: true,
                    success: true,
                    text: 'Bookings have been disabled'
                })
            })
            .catch((error) => {
            })
        }else { 
            if (times.start && times.end){
                const formBody = {
                    eventTitle: 'Blocked',
                    eventDescription: 'Admin',
                    contactName: 'Admin',
                    contactEmail: 'Admin@gmail.com',
                    contactPhone: 'Admin',

                    date: date,
                    timeframe: [times.start, times.end],
                    venueId: venueid
                }
                dispatch(bookingActions.createBooking(formBody))
            }else{
                errorMessage = "Enter both times"
            }
        }
    }


    return (
        <React.Fragment>
            <Modal open={modalOpen} setOpen={setModalOpen}>
                <div className={styles.modalItemDelete}>
                    <Close className="close" onClick={() => setModalOpen(false)} />
                    <h2>Are you sure you want to deactivate bookings for this date ?</h2>
                    <span className={styles.warning}>This action cannot be reversed</span>
                    <div className={styles.options}>
                        <div className={styles.flexContainer}>
                                <DropDown valueDate={times.start} label="from" name="start" onChange={changer} options={["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"]}/>
                                <DropDown valueDate={times.end} label="to" name="end" onChange={changer} options={["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"]}/>
                        </div>
                        <p className={styles.warning}> {errorMessage} </p>
                        <div className={styles.specialLine}>
                            <hr/>
                            <span>OR</span>
                        </div>
                        <div className={styles.checkContainer}>
                            <Input type="checkbox" inputObj={{
                                id: "checky1",
                                type: "checkbox",
                                label: "All day"
                            }} checked={disableAll} changeFunc={() => setDisableAll(!disableAll)}/>
                        </div>
                        {/* <div className={styles.formGroupCheck}>
                            <input checked={disableAll} type="checkbox" id="checky1" changeFunc={() => setDisableAll(!disableAll)} />
                            <label htmlFor="checky1"><div className={styles.fakeCheckBox}></div><span>All day</span></label>
                        </div> */}
                    </div>
                    <div className={styles.btnGroup}>
                                <Button action={() => setModalOpen(false)} text="Cancel" style={{
                                    color: "#f5f5f5",
                                    backgroundColor: "#083a55",
                                    marginRight: "20px",
                                    padding: "12px 30px"
                                }}  />
                                <Button action={submitForm} loading={bookingState.loading || loading}
                                    loaderColor = "#DF7676"
                                    text="Deactivate" style={{
                                    color: "#DF7676",
                                    backgroundColor: "transparent",
                                    padding: "12px 30px"
                                }} />
                    </div>
                </div>
            </Modal>
            <PageLayout>
                { venueState.loading ? <Loader color="#083a55"/> : <Fragment>
                        { bookingState.loading ? <WholeLoader/> : null }
                    <div className={styles.subHeader}>
                        <NavLink to="/" className={styles.backLink}>Back</NavLink>
                        <Button onClick={() => setModalOpen(true)}
                                    text="Disable bookings for this date" style={{
                                    color: "#DF7676",
                                    backgroundColor: "transparent",
                                    border: "1px solid #DF7676",
                                    padding: "12px 30px"
                                }} />
                    </div>
                    <h2 className={styles.venueHeader}>
                        {venueState.targetVenue.title}
                        <span className={styles.Date}>
                        {new Date(date).toLocaleDateString("en", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            })}
                        </span>
                    </h2>
                    <div className={styles.BookingList}>
                        {bookingList}
                    </div>
                    </Fragment> }
            </PageLayout>
        </React.Fragment>
    )
}

export default withRouter(ViewBookings)
