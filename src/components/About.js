import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faUserCircle, faFile, faEdit, faCheckCircle, faTrophy, faListOl } from '@fortawesome/free-solid-svg-icons';
import NavigationBar from './NavigationBar';


const About = () => {
    return (
        <div className='about-page'>
            <NavigationBar />
            <h1>DJ Helper</h1>
            <div className='hero'>
                <div className='hero-text'>
                    <h2>Know what your audience wants.</h2>
                </div>
            </div>
            <h1>3 Easy Steps</h1>
            <div className='steps'>
                <div className='step'>
                    <h2>Step 1:</h2>
                    <hr />
                        <div className='sub-step'>
                            <span className='fa-icon'><FontAwesomeIcon icon={faUserCircle} /></span>
                            <p>Create a DJ account and make pages for your events.</p>
                        </div>

                        <div className='sub-step'>
                            <span className='fa-icon'><FontAwesomeIcon icon={faFile} /></span>    
                            <p>Share the event pages with your clients.</p>
                        </div>
                </div>

                <div className='step'>
                    <h2>Step 2:</h2>
                    <hr />
                        <div className='sub-step'>
                        <span className='fa-icon'><FontAwesomeIcon icon={faEdit} /></span>
                            <p>Clients create song requests on the events pages.</p>
                        </div>
                        <div className='sub-step'>
                        <span className='fa-icon'><FontAwesomeIcon icon={faCheckCircle} /></span>
                            <p>Clients also upvote the requests they want to hear.</p>
                        </div>
                </div>

                <div className='step'>
                <h2>Step 3:</h2>
                <hr />
                    <div className='sub-step'>
                    <span className='fa-icon'><FontAwesomeIcon icon={faTrophy} /></span>
                        <p>See which songs receive the most votes.</p>
                    </div>
                    <div className='sub-step'>
                    <span className='fa-icon'><FontAwesomeIcon icon={faMusic} /></span>
                        <p>Get additional recommendations from the app, based on those song requests.</p>
                    </div>
                    <div className='sub-step'>
                    <span className='fa-icon'><FontAwesomeIcon icon={faListOl} /></span>
                        <p>Create awesome playlists!</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default About;