import { useState, useEffect } from "react";
import LoginWrapper from "../../components/LoginWrapper/LoginWrapper";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import useHTTP from "../../hooks/use-http";
import { modalsActions } from "../../store/Modals/Modals";
import { getAuth, getLongTermToken, setAuth } from "../../utils/Auth";
import Loader from "../Loader/Loader";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [code, setCode] = useState(searchParams.get('code'));
    const [status, setstatus] = useState(searchParams.get('status'));
    const [message, setMessage] = useState(searchParams.get('message'));
    const [error, setError] = useState(searchParams.get('error'));
    const { isLoading, error: requestError, sendRequest } = useHTTP();
    const auth = getAuth();
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    useEffect(() => {
        if (status && message && code) {
            if (code) {
                if (error === 'USER_ALREADY_SUBSCRIBED') {
                    console.log('login')
                    setSuccessMessage('You logged in successfully');
                    setErrorMessage('')
                }
                else if (status === '200') {
                    console.log('subscribe')
                    setSuccessMessage('You subscribed successfully');
                    setErrorMessage('');
                }
                fetchUserWithCode(code);
            }
            else {
                console.log('1111', error);
                setErrorMessage(error);
                setSuccessMessage('');
            }
        } else if (error) {
            console.log('2222', error);
            setErrorMessage(error);
            setSuccessMessage('');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchUserWithCode = (code) => {
        sendRequest(
            {
                url: 'codes',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    authorization_code: code,
                    long_term_token: getLongTermToken(),
                    operator_id: 1
                }

            },
            data => {
                console.log(data);
                setAuth(data.data);
                // if (
                //     data.data.user.name &&
                //     data.data.user.email
                // ) {
                //     console.log('user exist and login');
                //     // navigate(`/home`);
                // } else {
                //     console.log('user not exist and register');
                //     // openEditProfileModal();
                // }
            },
            err => {
                console.log('3333', err)
                setErrorMessage('something went wrong');
                setSuccessMessage('');
                // setTimeout(() => {
                // navigate('/login');
                // });
            }
        )
    }
    // const openEditProfileModal = () => {
    //     dispatch(modalsActions.openEditProfileModal());
    // }
    return (
        <LoginWrapper>
            {isLoading && <Loader />}
            <div className="login-message">
                {errorMessage && <div className="error-message">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <h4>Oh snap!</h4>
                    <p>{errorMessage}</p>
                    <button onClick={() => navigate('/home')} className="error-message-cancel-btn w-100">Home</button>
                </div>}
                {successMessage && <div className="success-message">
                    <i className="fa-regular fa-square-check"></i>
                    <h4>{successMessage}</h4>
                    <button onClick={() => navigate('/home')} className="success-message-cancel-btn w-100">Home</button>
                </div>}
            </div>
        </LoginWrapper>
    );
};
export default Login;