import React, {useState, Fragment} from 'react'
import styles from './newBookings.module.css'
import PageLayout from '../../components/pageLayout/pageLayout'
import { NavLink } from 'react-router-dom'
import Button from '../../components/UI/button/button'
import Booking from '../../components/UI/booking/booking'
import Loader from '../../components/UI/loader/loader'
import Modal from '../../components/UI/modal/modal'
import DropDown from '../../components/UI/dropDown/dropDown'
import { ReactComponent as Close } from '../../assets/images/close.svg'
import { useSelector } from 'react-redux'

const NewBookings = () => {
    const [modalOpen, setModalOpen] = useState()
    const bookingState = useSelector(state => state.bookings)
    const venueState = useSelector(state => state.venues)

    const bookingsPendingObj = bookingState.bookings.reduce((acc, current, index, array) => {
        if (current.venueId in acc){
            if (current.status === "pending"){
                acc[current.venueId] = {
                    ...acc[current.venueId],
                    list: arr[current.venueId].list.concat(current)
                }
            }
        }else{
            if (current.status === "pending"){
                let venueDetails = null
                venueState.venues.forEach(venue => {
                    if (venue.id === current.venueId){
                        venueDetails = {
                            name: venue.title,
                            address: venue.address
                        }
                    }
                })
                acc[current.venueId] = {
                    list: [current],
                    venueDetails: venueDetails 
                }
            }
            
        }
        return acc
    }, {})

    const pendingList = Object.keys(bookingsPendingObj).map(id => {
        if (bookingsPendingObj[id].venueDetails !== null){
            const bookingArr = booking.bookingsPendingObj[id].list.map(booking => (<Booking bookingObj={booking}/>))
            return (
                <Fragment>
                <h2 className={styles.venueHeader}>
                    { bookingsPendingObj[id].venueDetails.name}
                <span className={styles.Date}>
                    { bookingsPendingObj[id].venueDetails.address}
                </span>
                </h2>
                <div className={styles.BookingList}>
                    { bookingArr }
                </div>
        </Fragment>
            )
        }
    }
    )

    return (
        <React.Fragment>
            <Modal open={modalOpen} setOpen={setModalOpen}>
                <div className={styles.modalItemDelete}>
                    <Close className="close" onClick={() => setModalOpen(false)} />
                    <h2>Are you sure you want to deactivate bookings for this date ?</h2>
                    <span className={styles.warning}>This action cannot be reversed</span>
                    <div className={styles.options}>
                        <div className={styles.flexContainer}>
                                <DropDown label="from" options={["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm"]}/>
                                <DropDown label="to" options={["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm"]}/>
                        </div>
                        <div className={styles.specialLine}>
                            <hr/>
                            <span>OR</span>
                        </div>
                        <div className={styles.formGroupCheck}>
                        <input type="checkbox" id="checky1"/>
                        <label htmlFor="checky1"><div className={styles.fakeCheckBox}></div><span>All day</span></label>
                    </div>
                    </div>
                    <div className={styles.btnGroup}>
                                <Button onClick={() => setModalOpen(false)} text="Cancel" style={{
                                    color: "#f5f5f5",
                                    backgroundColor: "#083a55",
                                    marginRight: "20px",
                                    padding: "12px 30px"
                                }}  />
                                <Button 
                                    text="Delete" style={{
                                    color: "#DF7676",
                                    backgroundColor: "transparent",
                                    // border: "1px solid #DF7676",
                                    padding: "12px 30px"
                                }} />
                    </div>
                </div>
            </Modal>
            <PageLayout>
            <div className={styles.subHeader}>
                        <NavLink to="/" className={styles.backLink}>Back</NavLink>
                            <div className={styles.btnGroup}>
                                <Button onClick={() => setModalOpen(true)} text="Disable Booking For This Date" style={{
                                    color: "#DF7676",
                                    backgroundColor: "transparent",
                                    border: "1px solid #DF7676",
                                    padding: "12px 30px"
                                }} />
                            </div>
                    </div>
                     {pendingList}
            </PageLayout>
        </React.Fragment>
    )
}

export default NewBookings
