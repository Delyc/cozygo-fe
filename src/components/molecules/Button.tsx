interface IconButtonProps {
    label?: string;
    Icon?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: string
  
  }
  
  const Button: React.FC<IconButtonProps> = ({ label, Icon, onClick, className, disabled }) => {
    return (
      <button className={`${className} bg-blue-900  text-sm leading-6 rounded py-3 flex items-center justify-center gap-2 `} onClick={onClick} disabled={disabled}>
        {Icon}
        {label}
      </button>
    );
  };
  
  export default Button;
  