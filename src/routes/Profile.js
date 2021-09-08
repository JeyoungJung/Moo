import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  where,
  orderBy,
  onSnapshot,
  query,
} from "firebase/firestore";

import Moo from "components/Moo";

import UpdateUsername from "components/UpdateUsername";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const auth = getAuth();
  const db = getFirestore();
  const [moos, setMoos] = useState([]);
  const onClickLogOut = () => {
    signOut(auth);
    history.push("/");
  };

  useEffect(() => {
    const q = query(
      collection(db, "moos"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const mooArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMoos(mooArray);
    });
  }, [db, userObj.uid]);

  return (
    <div className="container">
      <UpdateUsername userObj={userObj} refreshUser={refreshUser} />
      <span
        style={{
          marginTop: 20,
          marginBottom: 20,
        }}
      >
      My moos:
      </span>
      {moos.map((moo) => (
        <Moo
          key={moo.id}
          mooObj={moo}
          isOwner={moo.creatorId === userObj.uid}
        />
      ))}
      <span className="formBtn cancelBtn logOut" onClick={onClickLogOut}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
