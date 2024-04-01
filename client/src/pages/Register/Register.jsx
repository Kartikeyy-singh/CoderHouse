import React, { useState } from "react";
import StepAvatar from "../Steps/StepAvatar";
import StepName from "../Steps/StepName";
import StepOTP from "../Steps/StepOTP";
import StepPhoneEmail from "../Steps/StepPhoneEmail";
import StepUsername from "../Steps/StepUsername";

const steps = {
  1: StepPhoneEmail,
  2: StepOTP,
  3: StepName,
  4: StepAvatar,
  5: StepUsername,
};

const Register = () => {
  const [step, setstep] = useState(1);
  const Currentstep = steps[step];

  function onNext() {
    setstep(step + 1);
  }
  return (
    <div>
      <Currentstep onNext={onNext} />
    </div>
  );
};

export default Register;
