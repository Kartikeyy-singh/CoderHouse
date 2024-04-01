import React, { useState } from "react";
import StepOTP from "../Steps/StepOTP";
import StepPhoneEmail from "../Steps/StepPhoneEmail";

const steps = {
  1: StepPhoneEmail,
  2: StepOTP,
};

const Login = () => {
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

export default Login;
