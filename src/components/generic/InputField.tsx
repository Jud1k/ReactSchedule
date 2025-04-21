import { ChangeEventHandler } from "react"

interface InputFieldProps{
    label:string
    value:string
    onChange:ChangeEventHandler<HTMLInputElement>
}


export default function InputField({label,value,onChange}:InputFieldProps){
    return (
      <div className="form-control">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full mb-2"
          value={value}
          onChange={onChange}
        />
      </div>
    );
}