import React, { useState } from "react";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import { db, storage } from "../database";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import "./additem.css";
import Photos from "../photos/Photos";

function Additem(props) {
  const user = props.user;
  const [style, setstyle] = useState({});
  const [image, setimage] = useState(null);
  const [progress, setprogress] = useState(0);
  const [caption, setcaption] = useState("");
  const [url, seturl] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `images/${image.name}`);
    console.log("Uploading the file");
    const uploadTask = uploadBytesResumable(storageRef, image);
    const unsubauth = await uploadTask.on(
      "state_changed",
      async (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressinupload =
          (await (snapshot.bytesTransferred / snapshot.totalBytes)) * 100;
        setprogress(progressinupload);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error.message);
      },

      async () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          seturl(downloadURL);
          console.log(url);
          const colRef = collection(db, "photos");
      addDoc(colRef, {
        name: user.displayName,
        photoUrl: downloadURL,
        caption: caption,
        createdAt: serverTimestamp(),
      })
        .then(() => {
          console.log("the photo is uploaded successfully");
        })
        .catch((err) => {
          console.log(err.message);
        });
        });
        setstyle({
          display: "none",
        });
        
      },
      
    );
    
      
    
  };

  return (
    <div>
      <div
        className="add"
        onClick={() => {
          setstyle({
            display: "block",
          });
        }}
      >
        <AddSharpIcon className="addicon" />
      </div>

      <div id="myModal" class="modal" style={style}>
        <div class="modal-content">
          <div class="modal-header"></div>
          <form action="">
            <div className="imageform">
              <label htmlFor="">Select Image</label>
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  setimage(e.target.files[0]);
                }}
              />
            </div>
            <div className="caption">
              <label htmlFor="">Add Comments...</label>
              <textarea
                name="comments"
                id=""
                cols="30"
                rows="5"
                onChange={(e) => {
                  setcaption(e.target.value);
                }}
                placeholder="write comments..."
              ></textarea>
            </div>
          </form>
          <div class="modal-body">
            <div
              className="cancel"
              onClick={() => {
                setstyle({ display: "none" });
              }}
            >
              <CloseRoundedIcon />
            </div>
            <div className="posti" onClick={handlesubmit}>
              <SendSharpIcon />
            </div>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
      <Photos user={user} />
    </div>
  );
}

export default Additem;
