import { useState } from "react";
import { useSelector } from "react-redux";
import Translate from "../../../helpers/Translate/Translate";
import AddComment from "../../Comments/AddComment/AddComment";
import AudioPlayer from "./../../AudioPlayer/AudioPlayer";
import Comments from "./../../Comments/Comments";

const Record = (props) => {
  const img = require("../../../assets/images/personal.png");
  const [showComments, setShowComments] = useState(false);
  const loggedUser = useSelector(state => {
    return state.auth.user;
  })
  return (
    <div className="post">
      <div className="post-header">
        <div className="post-header-user">
          <div className="post-header-user-image">
            <img src={props?.user?.avatar || img} className="d-block" alt="..." />
          </div>
          <div className="post-header-user-name">
            <h3>{props?.record?.user?.name || 'لا يوجد اسم' }</h3>
            <p>منذ ٤ يوم</p>
          </div>
        </div>
        {
          loggedUser.id === props?.record?.user?.id &&
          <span className="post-header-user-follow">
            <i className="fa-solid fa-user-plus"></i>
          </span>
        }
      </div>
      <AudioPlayer id={Math.floor(Math.random() * 1000)} />
      <div className="post-text"><Translate id="record.fromAyah" /> 2 <Translate id="record.toAyah" /> 7 <Translate id="record.surah" /> البقرة</div>
      <div className="post-feedback">
        <span className="post-feedback-likes-comments">
          <p>{props?.record?.likes_count}</p>
          <i className="fa-regular fa-thumbs-up"></i>
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
        <AddComment />
      </div>}
    </div>
  );
};

export default Record;
