interface FormAutocompleteListProps {
  children: React.ReactNode;
}

export const FormAutocompleteList = ({
  children,
}: FormAutocompleteListProps) => {
  return (
    <ul className="absolute z-10 w-full mt-1 border bg-gray-900 border-gray-600 rounded-lg shadow-xl max-h-60 overflow-auto backdrop-blur-sm">
      {children}
    </ul>
  );
};
