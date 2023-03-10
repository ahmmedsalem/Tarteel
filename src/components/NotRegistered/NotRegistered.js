import { useDispatch } from "react-redux";
import Translate from "../../helpers/Translate/Translate";
import useHTTP from "../../hooks/use-http";
import { modalsActions } from "../../store/Modals/Modals";
import { setLongTermToken } from "../../utils/Auth";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import { useState } from "react";



const NotRegistered = () => {
  const dispatch = useDispatch();
  const closeLoginModal = () => {
    dispatch(modalsActions.closeLoginModal());
  };
  const { isLoading, error, sendRequest } = useHTTP();
  const [err, setErr] = useState('');

  // const onLogin = () => {
  //   sendRequest(
  //     {
  //       url: "login",
  //       method: "GET"
  //     },
  //     data => {
  //       window.location.replace(data.data);
  //     },
  //     err => {
  //       setErr(err);
  //     }
  //   )
  // }
  const onRegister = () => {
    sendRequest(
      {
        url: "subscribe",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          long_term_token: setLongTermToken()
        },
      },
      (data) => {
        // console.log(data);
        window.location.replace(data.data);
      },
      err => {
        setErr(err);
      }
    );

  }
  return (
    <Modal>
      {isLoading && <Loader />}
      <div className="not-registered">
        <div className="not-registered-header">
          <h3><Translate id="notRegistered.title" /></h3>
          <p><Translate id="notRegistered.pleaseRegister" /></p>
        </div>
        <div className="not-registered-actions">
          <button className="main-button" onClick={onRegister}><Translate id="button.login" /></button>
          <button className="trans-btn" onClick={onRegister}><Translate id="button.register" /></button>
        </div>
        <div className="not-registered-cancel">
          <button className="cancel-btn" onClick={closeLoginModal}><Translate id="button.cancel" /></button>
        </div>
      </div>
    </Modal>
  );
};

export default NotRegistered;
