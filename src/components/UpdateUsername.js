import React, { useState, useRef } from "react";
import { getAuth, updateProfile } from "firebase/auth";

const UpdateUsername = ({ userObj, refreshUser }) => {
  const [newUsername, setNewUsername] = useState("");
  const fileInput = useRef();
  const auth = getAuth();
  const onChange = (e) => {
    setNewUsername(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newUsername) {
      await updateProfile(auth.currentUser, {
        displayName: newUsername,
      });
    }
    refreshUser();
    fileInput.current.value = "";
  };

  return (
    <form onSubmit={onSubmit} className="profileForm">
      <input
        type="text"
        value={newUsername}
        ref={fileInput}
        autoFocus
        placeholder="Your New Username"
        onChange={onChange}
        className="formInput"
      />
      <input
        type="submit"
        value="Done"
        className="formBtn"
        style={{
          marginTop: 10,
        }}
      />
    </form>
  );
};

export default UpdateUsername;
