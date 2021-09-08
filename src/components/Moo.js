import React, { useState } from "react";
import { doc, deleteDoc, updateDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Moo = ({ mooObj, isOwner }) => {
  const [editToggle, setEditToggle] = useState(false);
  const [edittedMoo, setEdittedMoo] = useState("");
  const db = getFirestore();
  const storage = getStorage();

  const onClickDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete this moo?");
    if (ok) {
      await deleteDoc(doc(db, `moos/${mooObj.id}`));
      if (mooObj.imgURL !== "") {
        const imgToDelete = ref(storage, mooObj.imgURL);
        await deleteObject(ref(storage, imgToDelete));
      }
    }
  };

  const onClickToggle = () => {
    setEditToggle((prev) => !prev);
    setEdittedMoo("");
  };

  const onChange = (e) => {
    setEdittedMoo(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, `moos/${mooObj.id}`), {
      text: edittedMoo,
    });
    setEditToggle(false);
  };

  return (
    <div className="moo">
      {editToggle ? (
        <>
          <form onSubmit={onSubmit} className="container mooEdit">
            <input
              type="text"
              value={edittedMoo}
              onChange={onChange}
              autoFocus
              placeholder={mooObj.text}
              className="formInput"
            ></input>
            <input type="submit" value="Done" className="formBtn" />
          </form>
          <span onClick={onClickToggle} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{mooObj.text}</h4>
          {mooObj.imgURL && <img src={mooObj.imgURL} alt=""/>}
          {isOwner && (
            <div className="moo__actions">
              <span onClick={onClickDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={onClickToggle}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Moo;
