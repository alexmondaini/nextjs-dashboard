'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { NameField } from '../lib/definitions';

export default function SearchMod({
  placeholder,
  distinctValues,
}: {
  placeholder: string;
  distinctValues: NameField[];
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const initialQuery = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(initialQuery);
  const [filteredValues, setFilteredValues] = useState<NameField[]>(() =>
    distinctValues.filter((value) =>
      value.name.toLowerCase().includes(initialQuery.toLowerCase()),
    ),
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (term: string) => {
    setInputValue(term);
    if (term) {
      setFilteredValues(
        distinctValues.filter((value) =>
          value.name.toLowerCase().includes(term.toLowerCase()),
        ),
      );
      setShowDropdown(true);
    } else {
      setFilteredValues([]);
      setShowDropdown(false);
      updateURLParams('');
    }
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    updateURLParams(value);
    setShowDropdown(false);
  };

  const updateURLParams = (query: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      {showDropdown && filteredValues.length > 0 && (
        <ul className="absolute top-full z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          {filteredValues.map((value) => (
            <li
              key={value.name}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => handleSelect(value.name)}
            >
              {value.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
