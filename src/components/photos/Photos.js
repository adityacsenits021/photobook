import React, { useEffect,useState } from 'react'
import {db} from '../database'
import './photos.css'
import ClearIcon from '@mui/icons-material/Clear';
import {collection, onSnapshot,
    
    query, where,
    orderBy, 
    } from 'firebase/firestore'

function Photos(props) {
    const user=props.user;
    const [posts, setposts] = useState([])
    const [style, setstyle] = useState({})
    const [clickurl, setclickurl] = useState("")
    useEffect(() => {
        const colRef = collection(db, 'photos')
        const q = query(colRef, where("name", "==", user.displayName), orderBy('createdAt'))
        const unsubCol = onSnapshot(q, (snapshot) => {
            let photos = []
            snapshot.docs.forEach(doc => {
              photos.push({ ...doc.data(), id: doc.id })
            })
            console.log(photos)
            setposts(photos)
          })
    
      return () => {
        unsubCol();
      }
    }, [])
    
  return (
    <div className='posts'>
        {
            posts.map((post)=>{
                return <div className="post">
                    <div className="image">
                        <img src={post.photoUrl?post.photoUrl:""} alt="" srcset=""
                        onClick={(e)=>{
                          console.log(e.target.src)
                          setstyle({
                            display:"block",
                            
                          })
                          setclickurl(e.target.src)
                        }}
                        />
                        
                          
                    </div>
                    <div  class="modalpost" style={style}>
                          <span class="close" onClick={()=>{
                            setstyle({
                              display:"none"
                            })
                          }}>
                            <ClearIcon/>
                          </span>
                          
                          <img class="modal-content" id="img01" src={clickurl} />
                            
                          </div>
                    <div className="caption">
                        <h5>{post.caption?post.caption:""}</h5>
                    </div>
                    <div className="created">
                        {/* <h3>{post.createdAt?post.createdAt:""}</h3> */}
                    </div>
                </div>
            })
        }
    </div>
  )
}

export default Photos