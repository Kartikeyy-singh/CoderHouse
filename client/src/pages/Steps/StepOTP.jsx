import React from 'react'

const StepOTP = ({ onNext }) => {
  return (
    <div>
      <div>Enter OTP</div>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default StepOTP