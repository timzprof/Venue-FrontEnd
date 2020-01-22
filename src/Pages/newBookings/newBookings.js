import React, {useState, Fragment, useEffect, useContext} from 'react'
import styles from './newBookings.module.css'
import PageLayout from '../../components/pageLayout/pageLayout'
import { NavLink, withRouter } from 'react-router-dom'
import Button from '../../components/UI/button/button'
import Booking from '../../components/UI/booking/booking'
import Loader from '../../components/UI/loader/loader'
import Modal from '../../components/UI/modal/modal'
import DropDown from '../../components/UI/dropDown/dropDown'
import { ReactComponent as Close } from '../../assets/images/close.svg'
import { useSelector, useDispatch} from 'react-redux'
import * as venueActions from '../../actions/venueActions'
import * as bookingActions from '../../actions/bookingActions'
import WholeLoader from '../../components/UI/wholeLoader/wholeLoader'
import { NotificationContext } from '../../contexts/notificationContext'
import EmptyList from '../../components/UI/emptyList/emptyList'
import { sortByDate } from '../../helpers/sortByDate'
const NewBookings = ({ history }) => {

    const dispatch = useDispatch()
    const [ notification, setNotification ] = useContext(NotificationContext)
    useEffect(() => {
        dispatch(venueActions.getVenues())
        dispatch(bookingActions.getAllBookings())
    }, [])

    const bookingState = useSelector(state => state.bookings)
    const venueState = useSelector(state => state.venues)



    

    useEffect(() => {
        if(venueState.error.status === true){
            setNotification({
                open: true,
                success: false,
                text: venueState.error.errorMessage
            })
        }else if (bookingState.error.status === true){
            setNotification({
                open: true,
                success: false,
                text: bookingState.error.errorMessage
            })
        }
    }, [venueState.error.status, bookingState.error.status])


    const bookingsPendingObj = bookingState.allBookings.reduce((acc, current, index, array) => {
        if (current.venueId in acc){
            if (current.status === "pending"){
                acc[current.venueId] = {
                    ...acc[current.venueId],
                    list: acc[current.venueId].list.concat(current)
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
    let bookingsPendingObjClone = {}
    Object.keys(bookingsPendingObj).forEach(id => {
        bookingsPendingObjClone[id] = {
            list: [...bookingsPendingObj[id].list].reduce((acc, current) => {
                if(current.date in acc){
                    acc[current.date] = [
                        ...acc[current.date],
                        current
                    ]
                    return acc
                }else{
                    acc[current.date] = [current]
                    return acc
                }
             }, {}),
            venueDetails: {...bookingsPendingObj[id].venueDetails}
        }
    })
    const pendingList = Object.keys(bookingsPendingObjClone).map(id => {        
        if (bookingsPendingObj[id].venueDetails !== null){  
            const bookingArr =  sortByDate(Object.keys(bookingsPendingObjClone[id].list)).map(date => {
                return(
                    <Fragment>
                        <span className={styles.dateLead}>
                            {date}
                        </span>
                        {
                            bookingsPendingObjClone[id].list[date].map(booking => (<Booking bookingObj={booking}/>))
                        }
                    </Fragment>
                )
            })
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
            <PageLayout>
            { bookingState.loading === true && venueState.loading !== true ? <WholeLoader/> : null }    
            <div className={styles.subHeader}>
                        <NavLink onClick={history.goBack} className={styles.backLink}>Back</NavLink>
                    </div>
                    {venueState.loading === true ? <Loader color="#083a55"/> : bookingState.allBookings.length > 0 ? pendingList : <EmptyList label="bookings"/> }
            </PageLayout>
        </React.Fragment>
    )
}

export default  withRouter(NewBookings)
