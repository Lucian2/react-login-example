import { FunctionComponent, useState } from 'react';
import styles from './InputField.module.scss';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
}

export const InputField: FunctionComponent<InputFieldProps> = ({
  type,
  name,
  placeholder,
  register,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='form-group mb-5 position-relative'>
      <input
        {...register(name)}
        type={showPassword ? 'text' : type}
        className={`ps-0 pb-3 text-light form-control bg-transparent rounded-0 ${styles.inputField}`}
        id={name}
        aria-describedby={name}
        placeholder={placeholder}
      />
      {type === 'password' &&
        (!showPassword ? (
          <FaRegEyeSlash
            className={styles.svg}
            onClick={() => setShowPassword(true)}
          />
        ) : (
          <FaRegEye
            className={styles.svg}
            onClick={() => setShowPassword(false)}
          />
        ))}
    </div>
  );
};
