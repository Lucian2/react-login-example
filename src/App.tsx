import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import RequireAuth from './components/require-auth/RequireAuth';
import UserProfile from './components/user-profile/UserProfile';
import NotFound from './components/404/404';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />}></Route>

      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path='/' element={<UserProfile />}></Route>
      </Route>

      {/* Catch-all route for 404 */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
