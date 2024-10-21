import { toast, Slide } from "react-toastify";

export const getToast = (type, innerText) => {
  if (type === "error") {
    return toast.error(innerText, {
      style: { backgroundColor: "rgb(250 212 205)", fontSize: "1rem" },
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      transition: Slide,
    });
  } else if (type === "success") {
    return toast.success(innerText, {
      style: { backgroundColor: "rgb(195 245 213)", fontSize: "1rem" },
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      transition: Slide,
    });
  }
};
