import React, { useState } from "react";
import "./MyProfile.css";
import Input from "../../utils/input/Input";
import { Link } from "react-router-dom";
function MyProfile() {

    return (
        <div className="profile">
            <div className="profile-header">
               <p> Manage profile information</p>
            </div>
            <div className="inf-password">
                <div className="profile-information">
                    <Input
                        label="email"
                        type="text"
                        value={"comtrang7@gmail.com"}
                        disabled={true}
                    />
                    <Input
                        label="fullname"
                        type="text"
                        value={"oanh oanh"}

                    />
                    <Input
                        label="phone number"
                        type="text"
                        value={"08779999856"}
                    />
                    <Input
                        label="Address"
                        type="text"
                        value={"ha noi me tri"}
                    />
                    <div className="forget-password">
                        Change Password
                    </div>
                </div>

            </div>

            <div className="style-btsave">
            <button className='btnSave'>
                SAVE
            </button>
            </div>
        </div>
    );
}

export default MyProfile;