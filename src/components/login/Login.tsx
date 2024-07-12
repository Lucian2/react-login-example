import { FunctionComponent, useEffect, useState } from 'react';
import styles from './Login.module.scss';
import LoginBackgroundImages from './LoginBackgroundImages';
import { ReusableButton } from '../common/reusable-button/ReusableButton';
import { InputField } from '../common/fields/InputField';
import { FieldValues, useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { AuthContextType } from '../../context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import URLS from '../../constants/urls';

const Login: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
    watch,
    setFocus,
  } = useForm();

  const { setUser } = useAuth() as AuthContextType;
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || '/';

  // login submission handler
  const onSubmit = async (data: FieldValues) => {
    try {
      setError(null);
      const response = await axios.post(URLS.LOGIN, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      setUser(response.data);
      reset();
      navigate(from, { replace: true });
    } catch (error: any) {
      setError(
        error?.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  };

  // Set focus on the username input field when the component mounts
  useEffect(() => {
    setFocus('username');
  }, []);

  return (
    <section
      className={`${styles.loginCtn} vh-100 d-flex flex-column gap-5 justify-content-center align-items-center position-relative overflow-hidden`}
    >
      <LoginBackgroundImages />

      {/* login form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.form} d-flex flex-column`}
      >
        <h1 className='mb-5 pb-5'>login</h1>
        <InputField
          register={register}
          type={'text'}
          name={'username'}
          placeholder={'Username'}
        />
        <InputField
          register={register}
          type={'password'}
          name={'password'}
          placeholder={'Password'}
        />
        {/* error message */}
        {error && <small className='alert alert-danger'>{error}</small>}
        <ReusableButton
          type={'submit'}
          label={`${isSubmitting ? 'loading...' : 'login'}`}
          size='lg'
          classes='mt-3'
          disabled={isSubmitting || !watch('username') || !watch('password')}
        />
      </form>
    </section>
  );
};

export default Login;
