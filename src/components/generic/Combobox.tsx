import { useEffect, useRef, useState } from 'react';
import useDebounce from '../../features/schedule/hooks/useDebounce';
import Spinner from './Spinner';

interface ComboboxProps<T> {
  onSelect: (item: T) => void;
  onSearch: (searchTerm: string) => Promise<T[]> | T[];
  itemKey: (item: T) => string | number;
  itemLabel: (item: T) => string;
  placeholder?: string;
  isLoading?: boolean;
  debounceTime?: number;
}

export default function Combobox<T>({
  onSelect,
  onSearch,
  itemKey,
  itemLabel,
  placeholder,
  isLoading: externalLoading,
  debounceTime = 500,
}: ComboboxProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState('');
  const debouncedSearchTerm = useDebounce(inputValue, debounceTime);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isWaitingForDebounce, setIsWaitingForDebounce] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLoading = externalLoading || isWaitingForDebounce;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsListOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const loadItems = async () => {
      if (!debouncedSearchTerm) {
        setItems([]);
        setIsWaitingForDebounce(false);
        return;
      }

      try {
        const results = await onSearch(debouncedSearchTerm);
        console.log(results);
        setItems(results);
      } catch (e) {
        setItems([]);
      } finally {
        setIsWaitingForDebounce(false);
      }
    };

    loadItems();
  }, [debouncedSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsListOpen(true);
    setIsWaitingForDebounce(true);
  };

  const handleItemSelect = (item: T) => {
    onSelect(item);
    setIsListOpen(false);
  };

  const shouldShowList = isListOpen && inputValue; // Показывать список только если он открыт и есть ввод
  const showSpinner = isLoading; // Показывать спиннер когда идет загрузка (дебаунс или внешняя)
  const showNoResults = !isLoading && items.length === 0 && inputValue; // Показывать "не найдено" когда загрузка завершена, но результатов нет
  const showResults = !isLoading && items.length > 0; // Показывать результаты когда загрузка завершена и есть результаты

  return (
    <div className="relative mb-4" ref={dropdownRef}>
      <label className="floating-label">
        <input
          type="text"
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
          role="listbox"
          className="absolute z-10 mt-1 w-full shadow-lg rounded-lg border bg-base-100 border-gray-200 max-h-48 overflow-y-auto"
        >
          {showSpinner && <Spinner />}
          {showNoResults && (
            <div className="p-3 text-center text-gray-500">
              Запись не найдена
            </div>
          )}
          {showResults && (
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li
                  key={itemKey(item)}
                  onClick={() => handleItemSelect(item)}
                  className="p-3 cursor-pointer hover:bg-base-200 hover:border-accent"
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
