import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import Home from './views/Home/Home';
import Islamic from './views/Islamic/Islamic';
import Profile from './views/Profile/Profile';
import Quran from './views/Quran/Quran';
import Login2 from './views/Login2/Login2';
import Login from './components/Login/Login';
import VerificationCode from './components/VerificationCode/VerificationCode';
import NotFoundPage from './views/NotFoundPage/NotFoundPage';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { langActions } from './store/Lang/Lang';
import AdminLogin from './views/AdminLogin/AdminLogin';
import BasicLayout from './views/BasicLayout/BasicLayout';
import { modalsActions } from "./store/Modals/Modals";
import { getAuth } from "./utils/Auth";
import SheikhProfileRecords from './views/SheikhProfileRecords/SheikhProfileRecords';
import AboutUs from './views/AboutUs/AboutUs';
import PrivatePolicy from './views/PrivatePolicy/PrivatePolicy';
import Subscribe from './views/Subscribe/Subscribe';


function App() {

  const checkAuthLoader = () => {
    const { isAuth, loggedUser } = getAuth();
    if (isAuth && loggedUser.is_sheikh) {
      return redirect(`/users/${loggedUser.id}`);
    }
    if (!isAuth) {
      dispatch(modalsActions.openLoginModal());
      return redirect("/home");
    }
    return null;
  }
  const checkLogeedInLoader = () => {
    const { isAuth } = getAuth();
    if (isAuth) {
      return redirect("/home");
    }
    return null;
  }
  const checkSheikhLoader = () => {
    const { loggedUser } = getAuth();
    if (loggedUser && loggedUser.is_sheikh) {
      return redirect(`/shekh`);
    }
    return null;
  }

  const checkIsShekhLoader = () => {
    const { loggedUser } = getAuth();
    if (!(loggedUser && loggedUser.is_sheikh)) {
      return redirect('/home');
    }
    return null
  }

  const checkProfileLoader = () => {
    const { isAuth, loggedUser } = getAuth();
    if (!isAuth) {
      dispatch(modalsActions.openLoginModal());
      return redirect('/home');
    }
    if (isAuth && loggedUser.is_sheikh) {
      return redirect('/shekh');
    }
    return null
  }

  const globalLang = useSelector((state) => {
    return state.lang.globalLang;
  });
  const [lang, setLang] = useState(localStorage.getItem("lang"));
  const dispatch = useDispatch();
  const rootEle = document.getElementById("root-html");

  useEffect(() => {
    if (!lang) {
      setLang(rootEle.getAttribute("lang"));
    }
    dispatch(langActions.translation({ lang: lang }));
    // console.log('first init lang', lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    // console.log('global lang changed on app', globalLang);
    if (globalLang === "ar") {
      rootEle.setAttribute("dir", "rtl");
    }
    if (globalLang === "en") {
      rootEle.setAttribute("dir", "ltr");
    }
    rootEle.setAttribute("lang", globalLang);
    localStorage.setItem("lang", globalLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalLang]);
  const router = createBrowserRouter([
    {
      path: "login",
      element: <Login />,
      loader: checkLogeedInLoader
    },
    {
      path: "subscribe",
      element: <Subscribe />,
      loader: checkLogeedInLoader
    },
    {
      path: "shekh-login",
      element: <AdminLogin />,
    },
    {
      path: "/",
      element: <BasicLayout />,
      children: [
        {
          path: "/",
          loader: () => redirect("/home"),
        },
        {
          path: "home",
          element: <Home />,
          loader: checkSheikhLoader
        },

        // {
        //   path: "subscription-login",
        //   element: <SubscriptionLogin />
        // },
        {
          path: "users/:id",
          element: <Profile />,
          loader: checkProfileLoader,
        },
        {
          path: "shekh",
          element: <Profile />,
          loader: checkIsShekhLoader
        },
        {
          path: "islamic",
          element: <Islamic />,
          loader: checkAuthLoader,
        },
        {
          path: "quran",
          element: <Quran />,
          loader: checkAuthLoader,
        },
        {
          path: "sheikh-records/:type",
          element: <SheikhProfileRecords />,
        }
        // {
        //   path: "verification-code/:mobile",
        //   element: <VerificationCode />,
        // },

      ],
    },
    {
      path: "about-us",
      element: <AboutUs />
    },
    {
      path: "private-policy",
      element: <PrivatePolicy />
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
