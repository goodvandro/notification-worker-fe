import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { removeToken } from "../store/auth.slice";

export const useAuth = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  return {
    isAuthenticated: !!token,
    logout: () => dispatch(removeToken()),
    token,
  };
};
