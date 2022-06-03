import { createContext, useReducer } from "react";
import { toastReducer } from "../Reducer/toastReducer";

const ToastContext = createContext({
  toast: [],
  dispatchToast: () => Promise,
});

const ToastProvider = ({ children }) => {
  const [toast, dispatchToast] = useReducer(toastReducer, []);

  return (
    <ToastContext.Provider value={{ toast, dispatchToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
