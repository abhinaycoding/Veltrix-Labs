import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ title, content, number }) => {
  return (
    <div className="parent mx-auto">
      <div className="card">
        <div className="content-box">
          <span className="card-title">{title}</span>
          <p className="card-content">
            {content}
          </p>
          <span className="see-more">See More</span>
        </div>
        <div className="date-box">
          <span className="month">NO.</span>
          <span className="date">{number}</span>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
