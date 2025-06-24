import { fetchAuthStatus } from "@/store/slices/Auth-Slice";
import type { AppDispatch } from "@/store/store";
import { useEffect, type PropsWithChildren } from "react";
import { useDispatch } from "react-redux";

const AuthWrapper = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAuthStatus());
  }, [dispatch]);


  return <>{children}</>;
};

export default AuthWrapper;
