import React, { useEffect, useState } from "react";
import Moo from "components/Moo";

import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import MooMain from "components/MooMain";

const Home = ({ userObj }) => {
  const [moos, setMoos] = useState([]);
  const db = getFirestore();
  useEffect(() => {
    const q = query(collection(db, "moos"), orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const mooArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMoos(mooArray);
    });
    return () => {};
  }, [db]);

  return (
    <>
      <div className="container">
        <MooMain userObj={userObj} />
        <div style={{ marginTop: 30 }}>
          {moos.map((moo) => (
            <Moo
              key={moo.id}
              mooObj={moo}
              isOwner={moo.creatorId === userObj.uid}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
