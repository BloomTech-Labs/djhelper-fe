import React from "react";


const djProfile = () => {
    return (
        <div className="profile-page">
            <div className="profileTopImage"></div>
            <section className="profile">
                <h3 className="firstProfileHeader">Your Profile</h3>
                <h1 ClassName="secondProfileHeader"> Chef Jonesie</h1>
                <section className ="profileBox">
                    <div className="profileBoxleft">
                        <div className="profileBio">
                            <h6>Bio</h6>
                            <p>
                                Fired up ready for action musician
                                and music pro with more than ten years 
                                experience, ready to work with you to make
                                your best event ever a reality.
                            </p>
                        </div>
                        <div className="profileContact">
                            <h6>Contact Info</h6>
                            <p>
                                oui_chef1781@gmail.com
                            </p>
                        </div><div className="profileEvents">
                            <h6>Available for</h6>
                            <p>
                                Weddings, school events, large halls, small parties,
                                keyboard lessons
                            </p>
                        </div>
                    </div>
                    <div className="profileBoxRight">
                        <h6>Upcoming events</h6>
                    </div>
                </section>
            </section>
        </div>
 
    )}
    export default djProfile;