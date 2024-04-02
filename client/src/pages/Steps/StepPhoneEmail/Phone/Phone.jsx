import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";
const Phone = ({onNext}) => {
  const [phoneNumber, setphoneNumber] = useState("");
  return (
    <Card title="Enter Your Phone Number" icon="phone">
      <div>
        <TextInput
          value={phoneNumber}
          onChange={(e) => setphoneNumber(e.target.value)}
        />
        <div className={styles.actionButtonWrap}>
          <Button title="Next" onClick={onNext}></Button>
          <p className={styles.bottomParagraph}>
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Phone;
