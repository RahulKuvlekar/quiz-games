import { v4 as uuidv4 } from "uuid";

export const createToast = (type, message) => ({
  id: uuidv4(),
  type,
  title: type.slice(0, 1).toUpperCase() + type.slice(1).toLowerCase(),
  message,
});
