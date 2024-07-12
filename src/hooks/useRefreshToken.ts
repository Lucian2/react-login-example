import { AxiosResponse } from 'axios';
import axios from '../api/axios';
import URLS from '../constants/urls';
import { AuthContextType, User } from '../context/AuthProvider';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { user, setUser } = useAuth() as AuthContextType;

  const refresh = async () => {
    console.log(user);
    const respone: AxiosResponse<{ token: string; refreshToken: string }> =
      await axios.post(URLS.REFRESH, {
        refreshToken: user?.refreshToken,
      });
    setUser(
      (prevValue) =>
        ({
          ...prevValue,
          token: respone?.data?.token,
          refreshToken: respone?.data?.refreshToken,
        } as User)
    );
    return respone.data.token;
  };
  return refresh;
};

export default useRefreshToken;
