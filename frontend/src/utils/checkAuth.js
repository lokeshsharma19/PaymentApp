import { jwtDecode } from "jwt-decode";

export const checkAuth = () => {
  const token = localStorage.getItem("token");
  if (token?.length > 0) {
    const user = jwtDecode(token);
    return user;
  } else return null;
};
