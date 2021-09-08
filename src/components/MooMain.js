import React from "react";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import { collection, addDoc, getFirestore } from "firebase/firestore";

const MooMain = ({ userObj }) => {
  const db = getFirestore();
  const fileInput = useRef();
  const storage = getStorage();
  const [imgFile, setImgFile] = useState("");
  const [moo, setMoo] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    let imgURL = "";
    if (imgFile !== "") {
      const imagesRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      await uploadString(imagesRef, imgFile, "data_url");
      imgURL = await getDownloadURL(ref(storage, imagesRef));
      
    }

    if (moo !== "") {
      await addDoc(collection(db, "moos"), {
        text: moo,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        imgURL: imgURL,
      });
    }
    console.log(imgFile);
    setMoo("");
    setImgFile("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setMoo(value);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      setImgFile(finishedEvent.currentTarget.result);
    };
    reader.readAsDataURL(file);
  };

  const onClickCancel = () => {
    setImgFile("");
    fileInput.current.value = "";
  };
  return (
    <form onSubmit={onSubmit} className="mainForm">
      <div className="mainInput__container">
        <input
          className="mainInput__input"
          type="text"
          value={moo}
          onChange={onChange}
          placeholder="Say something!"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="mainInput__arrow" />
      </div>
      <label for="attach-file" className="mainInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInput}
        style={{
          opacity: 0,
        }}
      />

      {imgFile && (
        <div className="mainForm__attachment">
          <img
            src={imgFile}
            style={{
              backgroundImage: imgFile,
            }}
            width="50px"
            height="50px"
            alt=""
          />
          <div className="mainForm__clear" onClick={onClickCancel}>
            <span>Cancel</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default MooMain;
