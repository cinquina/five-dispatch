import React, { useState } from "react";
import "./App.css";
import { BiSolidMegaphone } from "react-icons/bi";
import { FaGlobeAmericas, FaHashtag } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

interface AlertProps {
    label: string;
    code: string;
    id: string;
    road: string;
    priority: string;
}

const Alert: React.FC<AlertProps> = ({ label, code, id, road, priority }) => (
    <div className="alert">
        <div className="alert-header">
            <BiSolidMegaphone className="icon" style={{ marginLeft: "10px", fontSize: "20px", color: "#fb5764" }} />
            <p style={{ fontSize: "15px" }}>{label}</p>
            <div className="header-container">
                <p className="header-info">{code}</p>
                <p className="header-info">{id}</p>
            </div>
        </div>
        <div className="alert-container">
            <div className="information" style={{ marginTop: "5px" }}>
                <FaGlobeAmericas className="icon" />
                <p className="text">{road}</p>
            </div>
            <div className="information" style={{ marginLeft: "auto" }}>
                <FaHashtag className="icon" />
                <p className="text">Priority {priority}</p>
            </div>
            <div className="information" style={{ marginRight: "auto" }} >
                <FaClock className="icon" />
                <p className="text">in a few seconds</p>
            </div>
        </div>

    </div>
);

export default Alert;
