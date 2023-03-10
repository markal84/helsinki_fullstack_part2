/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import { getAll, getWeather } from './services/countries';

import Search from './components/Search';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});

  // get list of all countries from api and store them in countries variable
  useEffect(() => {
    getAll().then((allCountries) => {
      setCountries(allCountries);
    });
  }, []);

  // show filtered countries
  const foundCountries =
    search === ''
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        );

  // contidions for countries list render
  const isMultiDisplay = foundCountries.length >= 10;
  const isEqualOne = foundCountries.length === 1;

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const resetSearch = () => {
    setSearch('');
    setWeather({});
  };

  const handleShow = (e) => {
    setSearch(e.name.common);
    // get the weather for selected country and store it in weather var
    getWeather(e.name.common).then((res) => setWeather(res.data.current));
  };

  return (
    <>
      <h1>Countries</h1>
      <Search
        search={search}
        handleSearch={handleSearch}
        resetSearch={resetSearch}
      />
      <div>
        {isMultiDisplay ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          <Countries
            foundCountries={foundCountries}
            isEqualOne={isEqualOne}
            handleShow={handleShow}
            weather={weather}
          />
        )}
      </div>
    </>
  );
}

export default App;
