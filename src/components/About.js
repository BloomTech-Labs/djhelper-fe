import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import NavigationBar from './NavigationBar';


const About = () => {
    return (
        <div className='about-page'>
            <NavigationBar />
            <div className='hero'>
                <div className='hero-text'>
                    <h2>Know what your audience wants.</h2>
                </div>
            </div>
            <h1>DJ Helper</h1>
            <div className='steps'>
                <div className='step'>
                    <h2>Step 1:</h2>
                        <div className='sub-step'>
                            <FontAwesomeIcon icon={faMusic} />
                            <p>Create a DJ account and make pages for your events.</p>
                        </div>

                        <div className='sub-step'>
                            <FontAwesomeIcon icon={faMusic} />    
                            <p>Share the event pages with your clients.</p>
                        </div>
                </div>

                <div className='step'>
                    <h2>Step 2:</h2>
                        <div className='sub-step'>
                            <FontAwesomeIcon icon={faMusic} />
                            <p>Clients create song requests on the events pages.</p>
                        </div>
                        <div className='sub-step'>
                            <FontAwesomeIcon icon={faMusic} />
                            <p>Clients also upvote the requests they want to hear.</p>
                        </div>
                </div>

                <div className='step'>
                <h2>Step 3:</h2>
                    <div className='sub-step'>
                        <FontAwesomeIcon icon={faMusic} />
                        <p>See which songs receive the most votes and get additional recommendations, based on those song requests.</p>
                    </div>
                    <div className='sub-step'>
                        <FontAwesomeIcon icon={faMusic} />
                        <p>Create awesome playlists.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;