import { useContext } from "react";
import { ToastContext } from "../Context/ToastContext";

const useToastContext = () => useContext(ToastContext);

export { useToastContext };
