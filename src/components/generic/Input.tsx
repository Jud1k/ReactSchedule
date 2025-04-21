
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

export const Input = ({ ...props }: InputProps) => {
  return (
    <div className="relative">
      <input className="input input-bordered w-full" {...props} />
    </div>
  );
};
