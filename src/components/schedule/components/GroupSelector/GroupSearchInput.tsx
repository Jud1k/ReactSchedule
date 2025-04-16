import { Input } from "@/components/generic/Input";

interface GroupSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClick?:()=>void
}

export function GroupSearchInput({ value, onChange }: GroupSearchInputProps) {
  return (
    <Input
      type="search"
      placeholder="Введите название группы"
      className="input input-bordered w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      
    />
  );
}

