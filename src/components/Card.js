import React from "react";


const Card = ({item, onClick, className, children }) => {
  console.log(item);
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
