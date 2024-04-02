import React from "react";

const StepAvatar = ({ onNext }) => {
  return (
    <div>
      <div>Avatar</div>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default StepAvatar;
