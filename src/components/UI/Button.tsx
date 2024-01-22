interface IconButtonProps {
  label: string;
  Icon?: React.ReactNode; 
  onClick?: () => void;
  className: string
 
}

const Button: React.FC<IconButtonProps> = ({ label, Icon, onClick, className }) => {
  return (
    <button className={`${className} bg-indigo-600  text-sm leading-6 rounded py-3 flex items-center justify-center gap-2`} onClick={onClick}>
      {Icon}
      {label}
    </button>
  );
};

export default Button;
