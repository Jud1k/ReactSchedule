import React from 'react';

interface FormAutocompleteItemProps {
  itemKey: string;
  onClick: () => void;
  children: React.ReactNode;
}

export const FormAutocompleteItem = ({
  itemKey,
  onClick,
  children,
}: FormAutocompleteItemProps) => {
  return (
    <li
      key={itemKey}
      onClick={onClick}
      className="p-3 cursor-pointer text-white bg-gray-900 hover:bg-gray-700 hover:text-white border-b border-gray-700 last:border-b-0 transition-all duration-200 hover:pl-4"
    >
      {children}
    </li>
  );
};
