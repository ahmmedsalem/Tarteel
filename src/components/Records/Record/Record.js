import { useState } from "react";
import { useSelector } from "react-redux";
import Translate from "../../../helpers/Translate/Translate";
import AddComment from "../../Comments/AddComment/AddComment";
import AudioPlayer from "./../../AudioPlayer/AudioPlayer";
import Comments from "./../../Comments/Comments";
import useHTTP from './../../../hooks/use-http';

const Record = (props) => {
  const img = require("../../../assets/images/personal.png");
  const { sendRequest:toggleLike } = useHTTP();
  const [showComments, setShowComments] = useState(false);
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const likeBtnHandler =()=>{

    toggleLike(
      {
      url : `records/${props?.record?.id}/reactions`,
      headers : {'Authorization': `Bearer ${token}`,
     'Content-Type' : 'application/json'
    },
      method : 'POST',
      body : {'reaction' : props.record.is_liked ? `unlike` :`like` }
    }
    )
  }
  const loggedUser = useSelector(state => {
    return state.auth.user;
  });
  const lang = useSelector(state => {
    return state.lang.globalLang;
  });
  return (
    <div className="post">
      <div className="post-header">
        <div className="post-header-user">
          <div className="post-header-user-image">
            <img src={props?.user?.avatar || img} className="d-block" alt="..." />
          </div>
          <div className="post-header-user-name">
            <h3>{props?.record?.user?.name || 'لا يوجد اسم'}</h3>
            <p>{lang === 'ar' ? props?.record?.created_at_ar : props?.record?.created_at_en}</p>
          </div>
        </div>
        {
          loggedUser.id !== props?.record?.user?.id &&
          <span className="post-header-user-follow">
            <i className="fa-solid fa-user-plus"></i>
          </span>
        }
      </div>
      <AudioPlayer id={`record-${props?.record?.id}`} />
      <div className="post-text"><Translate id="record.fromAyah" /> {props?.record?.ayahs[0]?.number} <Translate id="record.toAyah" /> {props?.record?.ayahs[props?.record?.ayahs?.length-1]?.number} <Translate id="record.surah" /> البقرة</div>
      <div className="post-feedback">
        <span className="post-feedback-likes-comments">
          <p>{props?.record?.likes_count}</p>
          <i onClick={likeBtnHandler} className={`${props?.record.is_liked ? 'fa-solid' : 'fa-regular'} fa-thumbs-up`}></i>
          <p>{props?.record?.comments_count}</p>
          <i className="fa-regular fa-comment" onClick={() => setShowComments(prev => !prev)}></i>
        </span>
        <div>
          <span className="post-feedback-share">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </span>
        </div>
      </div>
      {showComments && <div className="post-comments">
        <Comments comments={props?.record?.latest_comments} />
      </div>}
      {showComments && <div className="post-add-comment">
        <AddComment recordId={props.record.id} />
      </div>}
    </div>
  );
};

export default Record;
