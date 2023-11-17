import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
    setQuery('');
  };

  return (
    <div className="mb-3">
      <h5>Search By City</h5>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder='type here to search by city'/>
      <button onClick={handleSearch} className="btn btn-primary mt-2">Search</button>
    </div>
  );
};

export default SearchBar;
