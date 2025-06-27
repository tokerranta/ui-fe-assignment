import React from 'react';

type AutocompleteProps = {
  options: { label: string; value: string }[];
  onSearch: (value: string) => void;
  onItemSelected: (value: string) => void;
  onClearSearch: () => void;
};

export const Autocomplete = ({
  options,
  onSearch,
  onClearSearch,
  onItemSelected,
}: AutocompleteProps) => {
  const [filteredOptions, setFilteredOptions] = React.useState(
    options.map((option, index) => ({ ...option, selected: false, index }))
  );
  const [showResults, setShowResults] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    setFilteredOptions(
      options
        .filter((option) =>
          option.label.toLowerCase().includes(value.toLowerCase())
        )
        .map((option, index) => ({ ...option, selected: false, index }))
    );
    setShowResults(value.length > 0 && filteredOptions.length > 0);
    if (value.length === 0) {
      onClearSearch();
    }
  };

  const handleSelect = ({ value, label }: { value: string; label: string }) => {
    setSearch(label);
    setShowResults(false);
    onItemSelected(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (search.length > 0) {
      onSearch(search);
      setShowResults(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && showResults) {
      const selected = filteredOptions.find((opt) => opt.selected);
      if (selected) {
        const nextIndex = selected.index + 1;
        if (nextIndex < filteredOptions.length) {
          setFilteredOptions(
            filteredOptions.map((option, index) => ({
              ...option,
              selected: index === nextIndex,
            }))
          );
        }
      } else {
        setFilteredOptions(
          filteredOptions.map((option) => ({
            ...option,
            selected: option.index === 0,
          }))
        );
      }
    }

    if (event.key === 'ArrowUp' && showResults) {
      const selected = filteredOptions.find((opt) => opt.selected);
      if (selected) {
        const prevIndex = selected.index - 1;
        if (prevIndex >= 0) {
          setFilteredOptions(
            filteredOptions.map((option, index) => ({
              ...option,
              selected: index === prevIndex,
            }))
          );
        }
      }
    }

    if (event.key === 'Enter' && showResults) {
      const selected = filteredOptions.find((opt) => opt.selected);
      if (selected) {
        handleSelect({ value: selected.value, label: selected.label });
      }
    }
  };
  return (
    <div className="flex gap-4 items-center py-4">
      <div className="relative">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            className=" bg-gray-200 rounded w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={search}
            onChange={handleChange}
            placeholder="Search"
            onKeyDown={handleKeyDown}
          />
        </form>
        {showResults && (
          <ul className="absolute z-100 bg-white rounded w-full shadow-2xl max-h-60 overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <li
                key={option.value + index}
                className={`px-3 py-2 hover:bg-gray-100 hover:cursor-pointer ${
                  option.selected ? 'bg-blue-200' : ''
                }`}
                onClick={() =>
                  handleSelect({ value: option.value, label: option.label })
                }
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="text-gray-300">
        {filteredOptions.length} results found
      </div>
    </div>
  );
};
