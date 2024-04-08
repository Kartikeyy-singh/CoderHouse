import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepAvatar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../Store/activateSlice";
import { activate } from "../../../http/index";

const StepAvatar = ({ onNext }) => {

  const dispatch = useDispatch();
  const { name, avatar } = useSelector((state) => state.activate);
  const [image, setImage] = useState("/images/monkey-avatar.png");


  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }

  async function submit() {
    try {
      const { data } = await activate({ name, avatar });
      if (data.auth) {
        dispatch(setAuth(data));
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title={`Okay, ${name}`} icon="monkey-emoji">
        <p className={styles.subHeading}>How’s this photo?</p>
        <div style={{marginLeft:"12rem"}}>
          <div className={styles.avatarWrapper}>
            <img className={styles.avatarImage} src={image} alt="avatar" />
          </div>
        </div>
        <div>
          <input
            onChange={captureImage}
            id="avatarInput"
            type="file"
            className={styles.avatarInput}
          />
          <label className={styles.avatarLabel} htmlFor="avatarInput">
            Choose a different photo
          </label>
        </div>
        <div>
          <Button onClick={submit} title="Next" />
        </div>
      </Card>
    </div>
  );
};

export default StepAvatar;
