interface IconButtonProps {
  label?: any;
  Icon?: React.ReactNode; 
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: String
 
}

const Button: React.FC<IconButtonProps> = ({ label, Icon, onClick, className, disabled }) => {
  return (
    <button className={`${className} bg-indigo-600  text-sm leading-6 rounded py-3 flex items-center justify-center gap-2 `} onClick={onClick} disabled={disabled}>
      {Icon}
      {label}
    </button>
  );
};

export default Button;
