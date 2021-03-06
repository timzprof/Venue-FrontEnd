import React, {useContext, useEffect} from 'react'
import styles from './notification.module.css'
import { NotificationContext } from '../../../contexts/notificationContext'
import { useSelector, useDispatch } from 'react-redux'
import * as venueActions from '../../../actions/venueActions'
import * as bookingActions from '../../../actions/bookingActions'

const Notification = () => {
    const [notification , setNotification] = useContext(NotificationContext)
    let notificationClasses = [styles.Notification]
    let dispatch = useDispatch()

    if(notification.open){
        notificationClasses = [styles.Notification, styles.NotificationOpen]
    }else{
        notificationClasses = [styles.Notification]
    }

  
    useEffect(() => {
        const timey = setTimeout(() => {
            notificationClasses = [styles.Notification]
            setNotification({
                open: false,
                success: false,
                text: ''
            })
            dispatch(venueActions.clearVenueNotification())
            dispatch(bookingActions.clearBookingNotification())     
        }, 5000)
        return () => {
            clearTimeout(timey)
        }
    }, [(notification.open != true)])

    const style = {
        color: '',
        backgroundColor: '',
        borderColor: ''
    }
    
    if (notification.success){
        style.color = '#5F8465'
        style.backgroundColor = '#B9FFC5'
        style.borderColor = '#5F8465' 
    } else if(notification.success === false) {
        style.color = '#DF7676'
        style.backgroundColor = '#FFE2E2'
        style.borderColor = '#DF7676'
    }
    
    return (

        <div className={notificationClasses.join(' ')} style={style}>
            <span> {notification.text} </span>
        </div>

    )
}

export default Notification
