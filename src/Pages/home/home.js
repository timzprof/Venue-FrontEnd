import React from 'react'
import styles from './home.module.css'
import PageLayout from '../../components/pageLayout/pageLayout'
import Button from '../../components/UI/button/button'
import { ReactComponent as AddImage } from '../../assets/images/Union 17.svg'
import Card from '../../components/UI/card/card'


const Home = () => {

    const CardArr = [
        {   
            id: 1,
            name: "Conference Hall",
            location: "CITS",
            noSeats: "200",
            computerAvailabilty: true,
            internetAvailabilty: false,
            img: "https://images.unsplash.com/photo-1480455454781-1af590be2a58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            
        },
        {
            id: 2,
            name: "Julius Berger Hall",
            location: "Engineering",
            noSeats: "500",
            computerAvailabilty: false,
            internetAvailabilty: false,
            img: "https://images.unsplash.com/photo-1529636695044-9e93499f4de3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            
        },
        {
            id: 3,
            name: "Multi Purpose Hall",
            location: "Unilag",
            noSeats: "700",
            computerAvailabilty: false,
            internetAvailabilty: false,
            img: "https://images.unsplash.com/photo-1494436567119-7f392017bb34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            
        },
        {
            id: 4,
            name: "Conference Hall",
            location: "CITS",
            noSeats: "200",
            computerAvailabilty: true,
            internetAvailabilty: false,
            img: "https://images.unsplash.com/photo-1464672737497-fb5327f77347?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            
        },
        {
            id: 5,
            name: "Julius Berger Hall",
            location: "Engineering",
            noSeats: "500",
            computerAvailabilty: false,
            internetAvailabilty: false,
            img: "https://images.unsplash.com/photo-1464672737497-fb5327f77347?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            
        },
        {
            id: 6,
            name: "Multi Purpose Hall",
            location: "Unilag",
            noSeats: "700",
            computerAvailabilty: false,
            internetAvailabilty: false,
            img: "https://images.unsplash.com/photo-1464672737497-fb5327f77347?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            
        },

    ]

    const cardList = CardArr.map((venueObj) => <Card venueObj={venueObj}/>)

    return (
        <PageLayout>
            <div className={styles.Home}>
                <div className={styles.subHeader}>
                    <Button text="Add New Venue" image={AddImage} style={{
                        color: "#f5f5f5",
                        backgroundColor: "#23B83C",
                    }} />
                </div>
                <div className={styles.cardList}>
                    {cardList}
                </div>
            </div>
        </PageLayout>
        
    )
}

export default Home
