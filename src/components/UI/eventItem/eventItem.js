import React from 'react'
import styles from './eventItem.module.css'
import {translate} from '../../../helpers/filterBookings'

const EventItem = ({ timeBlock, blocked, name }) => {

    let start = timeBlock.start
    let end = timeBlock.end
    let blockHeight = (end - start + 1) * 35
    let offSet = (start - 8)


    let style = {
        color:'',
        backgroundColor:'',
        height: `${blockHeight - 50}px`,
        top: 0
    }
   
    // setting the offset
    
    if(offSet == 0){
        style.top = 0
        style.height = `${blockHeight - 20}px`

    }else if (end == 20){
        style.height = `${blockHeight - 10}px`
        style.top = (((offSet + 1) * 35) - 5) + "px"
    }else{
        style.top = (((offSet + 1) * 35) - 5) + "px"
    }

    // setting the styles
    
    if (blocked){
        style.color = "#707070"
        style.backgroundColor = "#D4D4D4"
    }else{
        style.color = "#fff"
        style.backgroundColor = "#083A55"
    }
 
    return (
        <div className={styles.EventItem} style={style}>
            <div className={styles.bigScreenDetails}>
                <span>{name}</span>
            </div>
             <div className={styles.smallScreenDetails}>
                 <div className={styles.detailGroup}>
                     <span className={styles.lead}>Time-Block : </span>
                     <span className={styles.result}> {translate(timeBlock.start)} - {translate(timeBlock.end)} </span>
                 </div>
                 <div className={styles.detailGroup}>
                     <span className={styles.lead}>Event : </span>
                     <span className={styles.result}> {name} </span>
                 </div>
             </div>
        </div>
    )
}

export default EventItem
