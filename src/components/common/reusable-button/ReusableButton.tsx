import { FunctionComponent } from 'react';

interface ReusableButtonProps {
  type: 'submit' | 'reset' | 'button';
  label: string;
  size?: string;
  classes?: string;
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const ReusableButton: FunctionComponent<ReusableButtonProps> = ({
  type,
  color,
  label,
  size,
  classes,
  disabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`btn btn-${size ?? 'md'} btn-${
        color ?? 'primary'
      } border-0 rounded-0 ${classes ?? ''}`}
    >
      {label}
    </button>
  );
};
