import React from 'react'
import styles from './viewVenue.module.css'
import PageLayout from '../../components/pageLayout/pageLayout'
import { NavLink } from 'react-router-dom'
import Button from '../../components/UI/button/button'
import {ReactComponent as AvailableImage} from '../../assets/images/Group 19.svg'
import {ReactComponent as UnavailableImage} from '../../assets/images/Group 18.svg'


const ViewVenue = () => {
    const targetVenue = {}
    return (
        <PageLayout>
            <div className={styles.ViewVenue}>
                    <div className={styles.subHeader}>
                        <NavLink to="/" className={styles.backLink}>Back</NavLink>
                            <div className={styles.btnGroup}>
                                <Button text="Edit Venue" style={{
                                    color: "#f5f5f5",
                                    backgroundColor: "#23B83C",
                                    marginRight: "20px",
                                    padding: "12px 30px"
                                }} />
                                <Button text="Delete Venue" style={{
                                    color: "#DF7676",
                                    backgroundColor: "transparent",
                                    border: "1px solid #DF7676",
                                    padding: "12px 30px"
                                }} />
                            </div>
                    </div>    
                    <h2 className={styles.venueHeader}>
                        {/* {targetVenue.name} */}
                        Conference Hall

                    </h2>
                    <div className={styles.mainContent}>
                        <div className={styles.mainImage}>
                            <img src={targetVenue.mainImage}/>
                        </div>
                        <div className={styles.rightSection}>
                            <div className={styles.subImage}>
                                <img src={targetVenue.subImage}/>
                            </div>
                            <div className={styles.tag}><span className={styles.bolden}>CITS</span></div>
                            <div className={styles.tag}><span className={styles.bolden}>200</span> seats </div>
                            <div className={styles.tag}> <AvailableImage/>  <span className={styles.bolden}>Internet</span></div>
                            <div className={styles.tag}> <UnavailableImage/> <span className={styles.bolden}>Computers</span></div>
                        </div>
                    </div>
                    <div className={styles.btnHolder}>
                        <Button text="Manage Bookings" style={{
                            color: "#fff",
                            backgroundColor: "#083a55",
                            margin: "0 auto",
                            marginTop: "15px"
                        }}/>
                    </div>
                </div>
        </PageLayout>
    )
}

export default ViewVenue
