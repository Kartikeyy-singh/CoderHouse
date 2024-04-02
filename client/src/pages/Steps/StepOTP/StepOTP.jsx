import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from "./StepOTP.module.css";
const StepOTP = ({ onNext }) => {
  const [otp, setotp] = useState("");

  function onNext() {}
  return (
    <div>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just texted you" icon="lock-emoji">
          <TextInput value={otp} onChange={(e) => setotp(e.target.value)} />
          <div className={styles.actionButtonWrap}>
            <Button onClick={onNext} title="Next" />
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </div>
  );
};

export default StepOTP;
