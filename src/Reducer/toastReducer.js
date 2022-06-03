import { DELETE_TOAST, ADD_TOAST } from "../Constant/constant";

const toastReducer = (prevState, { type, payload }) => {
  switch (type) {
    case ADD_TOAST:
      return [...prevState, payload];

    case DELETE_TOAST:
      return prevState.filter((toast) => toast.id !== payload);

    default:
      break;
  }
};

export { toastReducer };
