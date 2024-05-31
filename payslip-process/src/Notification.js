// Notification.js
import React from "react";
import "./Notification.css"; // Import the CSS file for notification styling

const Notification = ({ message, type }) => {
  if (!message) return null;

  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
