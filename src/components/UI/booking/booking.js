import React from 'react'
import styles from './booking.module.css'
import Button from '../button/button'
import Label from '../label/label'


const Booking = ({ approved }) => {
    return (
        <div className={styles.Booking}>
           <div className={styles.timeBlock}>
               <span>12pm to 5pm</span>
           </div> 
            <div className={styles.bookingInfo}>
                <div className={styles.main}>
                    <h2>HUAWEI Certification Program</h2>
                    <Label status="pending"/>
                </div>
                <div className={styles.subInfo}>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus vel explicabo architecto enim ipsam nihil, modi tenetur non ducimus obcaecati quo voluptas quidem officia cumque nesciunt cum omnis veniam ipsum!Eius harum molestiae blanditiis repellat quaerat corporis illo quod perspiciatis. Fugit, eaque facilis, aliquid aspernatur nesciunt cumque voluptas tempora placeat voluptate maiores reprehenderit amet soluta sequi delectus consequuntur nostrum quibusdam?</p>
                    <span className={styles.detail}> <span className={styles.bold}>Email</span> test@gmail.com</span>
                    <span className={styles.detail}> <span className={styles.bold}>Phone</span> +2349093831421</span>
                    <div className={styles.btnGroup}>
                        { approved ? (<Button 
                                    text="Reject" style={{
                                    color: "#DF7676",
                                    backgroundColor: "transparent",
                                    border: "1px solid #DF7676",
                                    padding: "12px 30px"
                                }} />) :  
                                [<Button 
                                    text="Approve" style={{
                                    color: "#f5f5f5",
                                    backgroundColor: "#23B83C",
                                    marginRight: "20px",
                                    padding: "12px 30px"
                                }} />,
                                <Button 
                                    text="Reject" style={{
                                    color: "#DF7676",
                                    backgroundColor: "transparent",
                                    border: "1px solid #DF7676",
                                    padding: "12px 30px"
                                }} />]}
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Booking
