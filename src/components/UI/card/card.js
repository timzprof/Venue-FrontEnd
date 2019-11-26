import React from 'react'
import styles from './card.module.css'
import { ReactComponent as AvailableImage } from '../../../assets/images/Group 19.svg'
import { ReactComponent as UnavailableImage } from '../../../assets/images/Group 17.svg'
import Button from '../button/button'
import  { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as actions from '../../../actions/venueActions'

const Card = ({venueObj, history}) => {
    console.log(venueObj)
    const dispatch = useDispatch()

    const viewVenue = (id) => {
        
        // dispatch an action that sets the venue to target venue in the redux store
        dispatch(actions.setTargetVenue(venueObj))
        // redirect to the viewhall page
        history.push(`/venue/${id}`)
    }

    return (
        <div className={styles.Card}>
            <div className={styles.CardImage}>
                <img src={venueObj.featureImage}/>
            </div>
            <h2 className={styles.CardName}>{venueObj.title}</h2>
            <div className={styles.infoGroup}>
                <span className={styles.detailImp}>{venueObj.address}</span>
                <span className={styles.detailImp}>
                    <span className={styles.dot}></span>
                    <span className={styles.detail}>{venueObj.capacity} seats</span>
                </span>
            </div>
            <div className={styles.additionalInfo}>
                <div className={styles.infoGroup}>
                    {/* <span className={styles.detail}>{venueObj.resources[0].value ? <AvailableImage/> : <UnavailableImage/>} Computers</span> */}
                </div>
                <div className={styles.infoGroup}>
                    {/* <span className={styles.detail}>{venueObj.resources[1].value ? <AvailableImage/> : <UnavailableImage/>} Internet</span> */}
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
