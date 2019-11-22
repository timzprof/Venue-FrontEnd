import React, { useState, useRef, useContext } from 'react'
import styles from './home.module.css'
import PageLayout from '../../components/pageLayout/pageLayout'
import Button from '../../components/UI/button/button'
import { ReactComponent as AddImage } from '../../assets/images/Union 17.svg'
import Card from '../../components/UI/card/card'
import Modal from '../../components/UI/modal/modal'
import { ReactComponent as Close } from '../../assets/images/close.svg'
import { AuthContext } from '../../contexts/AuthContext'



const Home = () => {
    const [modalOpen, setModalOpen] = useState()
    const [authState] = useContext(AuthContext)

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
    const reset = () => {
        setModalOpen(false)
    }

    const fileInputRef = useRef()

    const getFiles = (e) => {
        e.preventDefault();
        fileInputRef.current.click()
    }


    return (
        <React.Fragment>
            <Modal open={modalOpen} setOpen={setModalOpen}>
            <div className={styles.modalItemEdit}>
                <Close className="close" onClick={reset} />
                <h2 className={styles.formHeader}>
                    Create Venue
                </h2>
                <form action="">
                    <div className={styles.formGroup}>
                        <label htmlFor="">Name</label>
                        <input type="text"/>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="">Location</label>
                        <input type="text"/>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="">Capacity</label>
                        <input type="number" min="50"/>
                    </div>
                    <div className={styles.formGroupCheck}>
                        <input type="checkbox" id="checky1"/>
                        <label htmlFor="checky1"><div className={styles.fakeCheckBox}></div><span>Internet</span></label>
                    </div>
                    <div className={styles.formGroupCheck}>
                        <input type="checkbox" id="checky2"/>
                        <label htmlFor="checky2"><div className={styles.fakeCheckBox}></div><span>Computers</span></label>
                    </div>
                    <Button onClick={(e) => getFiles(e)} text="Add images" style={{
                            backgroundColor: "#083a55",
                            color: "#fff",
                            padding: "12px 45px",
                            margin: "20px 0 20px 0",
                            display: "inline-block",
                            float: "center"
                        }
                        }/>
                    <input className={styles.fileInput} ref={fileInputRef} multiple min="1" max='3' placeholder='Add images' type="file"/>
                    <div className={styles.btnHolderModal}>
                        <Button type="submit" text="Done" style={{
                            backgroundColor: "#23B83C",
                            color: "#fff",
                            padding: "12px 45px",
                            margin: "0 auto",
                            display: "inline-block",
                            float: "center"
                        }
                        }/>
                    </div>
                </form>
            </div>
        </Modal>
        <PageLayout>
            <div className={styles.Home}>
                <div className={styles.subHeader}>
                    {authState ? <Button onClick={() => setModalOpen(true)} text="Add New Venue" image={AddImage} style={{
                        color: "#f5f5f5",
                        backgroundColor: "#23B83C",
                    }} /> : null}
                </div>
                <div className={styles.cardList}>
                    {cardList}
                </div>
            </div>
        </PageLayout>
        </React.Fragment> 
    )
}

export default Home
