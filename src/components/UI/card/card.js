import React from 'react'
import styles from './card.module.css'
import { ReactComponent as AvailableImage } from '../../../assets/images/Group 19.svg'
import { ReactComponent as UnavailableImage } from '../../../assets/images/Group 17.svg'
import Button from '../button/button'
import  { withRouter } from 'react-router-dom'

const Card = ({venueObj, history}) => {

    const viewVenue = (id) => {
        
        // dispatch an action that sets the venue to target venue in the redux store


        // redirect to the viewhall page
        history.push("/venue/id")
    }

    return (
        <div className={styles.Card}>
            <div className={styles.CardImage}>
                <img src={venueObj.img}/>
            </div>
            <h2 className={styles.CardName}>{venueObj.name}</h2>
            <div className={styles.infoGroup}>
                <span className={styles.detail}>{venueObj.location}</span>
                <span className={styles.detail}>
                    <span className={styles.dot}></span>
                    <span className={styles.detail}>{venueObj.noSeats} seats</span>
                </span>
            </div>
            <div className={styles.additionalInfo}>
                <div className={styles.infoGroup}>
                    <span className={styles.detail}>{venueObj.computerAvailabilty ? <AvailableImage/> : <UnavailableImage/>} Computers</span>
                </div>
                <div className={styles.infoGroup}>
                    <span className={styles.detail}>{venueObj.internetAvailabilty ? <AvailableImage/> : <UnavailableImage/>} Internet</span>
                </div>
            </div>
            <Button text="View" onClick={() => viewVenue(venueObj.id)} style={{
                width: "100%",
                marginTop: "20px",
                backgroundColor: "#083A55",
                color: "#fff"
            }}/>
        </div>
    )

}
export default withRouter(Card)
