import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import NavigationBar from './NavigationBar';
import PreviewEventDetails from './PreviewEventDetails';
import Event from './Event';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import Image from 'react-bootstrap/Image';

import { deleteUser, startEditUser } from '../actions/action';
import EditDJ from './EditDJ';

const image = "https://www.photohound.co/assets/img/placeholders/spot.png";

const Dashboard = () => {

    const [data, setData] = useState({
        event1: {
            name: "Bill and Grace",
            description: "A traditional, peaceful wedding.",
        },
        event2: {
            name: "Ellie and Mona",
            description: "A more modern, fun wedding.",
        },
        event3: {
            name: "Charles and Elizabeth",
            description: "A senior wedding."
        },
        event4: {
            name: "Chris and Kat",
            description: "Very atmospheric and sentimental wedding."
        },
        active: "",
    })


    const dispatch = useDispatch();

    const name = useSelector(state => state.userReducer.name);
    const username = useSelector(state => state.userReducer.username);
    const email = useSelector(state => state.userReducer.email);
    const phone = useSelector(state => state.userReducer.phone);
    const website = useSelector(state => state.userReducer.website);
    const bio = useSelector(state => state.userReducer.bio);
    const profile_pic_url = useSelector(state => state.userReducer.profile_pic_url);
    const id = useSelector(state => state.userReducer.id);
    const editUserStart = useSelector(state => state.userReducer.editUserStart);

    const handleDelete = () => {
        dispatch(deleteUser(id));
    }



    const startEdit = () => {
        console.log('time to edit dj user info');
        dispatch(startEditUser());
    }
        /*
            <h1> Dashboard</h1>
            <div className="welcome">
            </div>
            <div className="board">
                <div>
                    <h2>Profile:</h2>
              </div>

            <div>
                <Button className="btn-secondary" onClick={startEdit}>Edit DJ Info</Button>
                <Button className="btn-danger" onClick={handleDelete}>Delete DJ Account</Button>
            </div>

            {editUserStart &&
                <div>
                    <EditDJ />
                </div>
            }
            */

    let thing = data.active
    let currentlyActive = data[thing];
    console.log([data[thing]])
    return (
        <div className="dashboard">
        <NavigationBar />
        <PreviewEventDetails data={data} setData={setData} currentlyActive={currentlyActive} />
           <div className="upcoming-events">
            <h6> Upcoming Events</h6>
                <Carousel
                className="carousel"
                  slidesPerPage={4}
                  arrows
                  arrowLeft={
                     <FontAwesomeIcon
                        icon="caret-left"
                        size="2x"
                    />
                  }
                    arrowRight={
                        <FontAwesomeIcon
                            icon="caret-right"
                            size="2x"
                        />
                    }
                    addArrowClickHandler

                  infinite
                  >
                    <Event num={1} data={data} setData={setData} />
                    <Event num={2} data={data} setData={setData} />
                    <Event num={3} data={data} setData={setData} />
                    <Event num={4} data={data} setData={setData} />
                </Carousel>
        </div>
        <div className="past-events">
            <h6> Past Events</h6>
                <Carousel
                className="carousel"
                  slidesPerPage={4}
                  arrows
                  arrowLeft={
                     <FontAwesomeIcon
                        icon="caret-left"
                        size="2x"
                    />
                  }
                    arrowRight={
                        <FontAwesomeIcon
                            icon="caret-right"
                            size="2x"
                        />
                    }
                    addArrowClickHandler

                  infinite
                  >
                    <Event num={1} />
                    <Event num={2} />
                    <Event num={3} />
                    <Event num={4}/>
                </Carousel>

        </div>
        </div>
    )
}

export default Dashboard;
