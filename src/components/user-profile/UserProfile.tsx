import { FunctionComponent, useEffect, useState } from 'react';
import URLS from '../../constants/urls';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { AuthContextType } from '../../context/AuthProvider';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

const UserProfile: FunctionComponent = () => {
  const [user, setUser] = useState<User | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const { setUser: setUserAuthState } = useAuth() as AuthContextType;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const constroller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(URLS.CURRENT_USER, {
          signal: constroller.signal,
        });
        isMounted && setUser(response.data);
      } catch (error: any) {
        if (error.name !== 'CanceledError') {
          console.log(error);
          navigate('/login', { state: { from: location }, replace: true });
        }
      }
    };

    getUser();

    return () => {
      isMounted = false;
      constroller.abort();
    };
  }, []);

  const handleLogout = () => {
    setUserAuthState(null);
  };

  return (
    <article className='my-4 d-flex justify-content-center'>
      {user && (
        <div className='card rounded' style={{ width: '20rem' }}>
          <div className='card-header text-center'>
            <img src={user?.image} alt='user-image' />
          </div>
          <div className='card-body text-center'>
            <p>{`${user.firstName} ${user.lastName}`}</p>
            <p>{user.email}</p>
          </div>
          <div className='card-footer text-center'>
            <button onClick={handleLogout} className='btn btn-primary mt-2'>
              Logout
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default UserProfile;
