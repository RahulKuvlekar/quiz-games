import { useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import SmallLoader from "../../Components/UI/SmallLoader/SmallLoader";
import { ADD_TOAST, DANGER, SUCCESS } from "../../Constant/constant";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useToastContext } from "../../Hooks/useToastContext";
import { loginUser } from "../../Utils/authentication";
import "./Auth.css";
import { createToast } from "../../Utils/createToast";

const Login = () => {
  const INITIAL_VALUE = {
    email: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(INITIAL_VALUE);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const { isAuthenticated, userLoading, setUserLoading } = useAuthContext();
  const { dispatchToast } = useToastContext();
  const location = useLocation();
  const navigate = useNavigate();

  const FROM = location?.state?.from?.pathname || "/";

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsSubmit(false);
  };

  const validate = ({ email, password }) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!email) error.email = "Email Id is required*";
    else if (!regex.test(email)) error.email = "Enter Valid Email-Id";

    if (!password) error.password = "Password is required*";

    return error;
  };

  function submitHandler(event) {
    event.preventDefault();
    setFormError(validate(formValue));
    setIsSubmit(true);
  }

  const focusHandler = () => {
    setFormError({});
    setIsSubmit(false);
    setLoginError(null);
  };

  const resetHandler = () => {
    setFormValue(INITIAL_VALUE);
    setFormError({});
    setIsSubmit(false);
    setLoginError(null);
  };

  const setDummyCredentials = () => {
    resetHandler();
    setFormValue({
      email: "guestuser@urservice.com",
      password: "1234567890",
    });
  };

  const LoginService = async (emailId, password) => {
    try {
      setUserLoading(true);
      const currentUser = await loginUser(emailId, password);
      if (currentUser?.user) {
        dispatchToast({
          type: ADD_TOAST,
          payload: createToast(
            SUCCESS,
            `${
              currentUser?.user?.displayName !== null
                ? currentUser?.user?.displayName
                : ""
            } login successfully 🎉`
          ),
        });
        navigate(FROM, { replace: true });
      }
    } catch (error) {
      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(DANGER, error.message),
      });
      setLoginError(error.message);
    } finally {
      if (!isAuthenticated) setUserLoading(false);
    }
    return;
  };

  useEffect(() => {
    if (isSubmit && Object.keys(formError).length === 0) {
      LoginService(formValue.email, formValue.password);
      resetHandler();
    }
    // eslint-disable-next-line
  }, [isSubmit]);

  if (isAuthenticated) return <Navigate to={FROM} replace />;
  return (
    <div className="login">
      <form action="" className="form form-login" onSubmit={submitHandler}>
        <div className="input-group">
          <h1 className="text-grey-dk">Login Form</h1>
        </div>
        <div className={`input-group ${formError.email && "input-error"}`}>
          <label className="input-label">Email Id *</label>
          <input
            placeholder="Enter Email Id"
            autoComplete="off"
            name="email"
            value={formValue.email}
            onChange={inputHandler}
            onFocus={focusHandler}
          />
          {formError.email && (
            <p className="input-error-message text-sm">{formError.email}</p>
          )}
        </div>

        <div className={`input-group ${formError.password && "input-error"}`}>
          <label className="input-label">Password *</label>
          <input
            type="password"
            placeholder="Enter Password"
            autoComplete="off"
            name="password"
            value={formValue.password}
            onChange={inputHandler}
            onFocus={focusHandler}
          />
          {formError.password && (
            <p className="input-error-message text-sm">{formError.password}</p>
          )}
        </div>

        {loginError && (
          <div className={`input-group ${loginError && "input-error"}`}>
            <p className="input-error-message text-md">{loginError}</p>
          </div>
        )}

        <div className="input-group h4 text-grey-dk">
          <p>
            Don't have account ?
            <Link to="/signup" className="btn-link link-primary text-md">
              SignUp ?
            </Link>
            or use
            <button
              type="button"
              onClick={setDummyCredentials}
              className="btn-link link-primary text-md"
            >
              DUMMY CREDENTIALS ?
            </button>
            {/* or
            <Link to="/forgotpassword" className="btn-link link-primary text-md">
              Forgot Password ?
            </Link> */}
          </p>
        </div>
        <button
          type="submit"
          className="btn btn-success"
          disabled={userLoading ? true : false}
        >
          {userLoading ? <SmallLoader /> : "Login"}
        </button>
        <button type="reset" className="btn btn-success" onClick={resetHandler}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default Login;
