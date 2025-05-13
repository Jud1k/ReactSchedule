import React, { useEffect, useRef, useState } from "react";
import useDebounce from "../schedule/hooks/useDebounce";
import Spinner from "./Spinner";

interface ComboboxProps<T> {
  onSelect: (item: T) => void;
  fetchItems: (searchTerm: string) => Promise<T[]> | T[];
  itemKey: (item: T) => string | number;
  itemLabel: (item: T) => string;
  placeholder?: string;
  isLoading?: boolean;
  debounceTime?: number;
  isSearch?: boolean;
  onChange?: (value: string) => void;
}

export default function Combobox<T>({
  onSelect,
  fetchItems,
  itemKey,
  itemLabel,
  placeholder,
  isLoading: externalLoading,
  debounceTime = 500,
  isSearch = true,
  onChange,
}: ComboboxProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(inputValue, debounceTime);
  const [isListOpen, setIsListOpen] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLoading =
    externalLoading !== undefined ? externalLoading : internalLoading;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsListOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const loadItems = async () => {
      if (!debouncedSearchTerm) {
        setItems([]);
        return;
      }

      try {
        setInternalLoading(true);
        const results = await fetchItems(debouncedSearchTerm);
        setItems(results);
      } finally {
        setInternalLoading(false);
      }
    };

    loadItems();
  }, [debouncedSearchTerm, fetchItems]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
    setIsListOpen(true);
    setInternalLoading(true);
  };
  const handleItemSelect = (item: T) => {
    onSelect(item);
    setIsListOpen(false);
    if (isSearch) {
      setInputValue("");
      onChange?.("");
    } else {
      const label = itemLabel(item);
      setInputValue(label);
      onChange?.(label);
    }
  };

  const shouldShowList =
    isListOpen && (isLoading || (inputValue && !isLoading));
  const noResults = items.length === 0 && !isLoading && inputValue;

  return (
    <div className="relative mb-4" ref={dropdownRef}>
      <label className="floating-label">
        <input
          type="search"
          placeholder={placeholder}
          className="input input-bordered w-full"
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => setIsListOpen(true)}
          aria-haspopup="listbox"
          aria-expanded={isListOpen}
          role="combobox"
        />
        <span>{placeholder}</span>
      </label>
      {shouldShowList && (
        <div
          className="absolute z-10 mt-1 w-full shadow-lg rounded-lg border bg-base-100 border-gray-200 max-h-48 overflow-y-auto"
          role="listbox"
        >
          {isLoading ? (
            <Spinner />
          ) : noResults ? (
            <div className="p-3 text-center text-gray-500">
              Запись не найдена
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li
                  key={itemKey(item)}
                  className="p-3 hover:bg-base-300 hover:border-accent cursor-pointer"
                  onClick={() => handleItemSelect(item)}
                  role="option"
                >
                  {itemLabel(item)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
