import styles from './Login.module.scss';

const LoginBackgroundImages = () => {
  return (
    <>
      <img
        src='/images/polygon1.png'
        className={`img-fluid polygon position-absolute d-none d-lg-block`}
        alt=''
      />
      <img
        src='/images/ellipse1.png'
        className='img-fluid position-absolute start-0'
        alt=''
      />
      <img
        src='/images/ellipse2.png'
        className={`img-fluid position-absolute d-none d-xl-block ${styles.ellipse2}`}
        alt=''
      />
      <img
        src='/images/subtract.png'
        className='img-fluid position-absolute top-0 end-0'
        alt=''
      />
    </>
  );
};

export default LoginBackgroundImages;
