import React, { FC, useEffect, useState } from "react";
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Search from './components/Search';
import Allcountries from './components/Allcountries';

// Token para las pruebas
const token_everbase = "06cccbaf-4ffb-4d33-abb7-6ba9edb79429";

const client = new ApolloClient({
  uri: "https://api.everbase.co/graphql?apikey=" + token_everbase,
  cache: new InMemoryCache()
});

function App() {

  const [filter, setFilter] = useState<number>(3);

  return (

    <ApolloProvider client={client}>

      <div className="App">

        <div className="Searchercountry">
          <Search></Search>
        </div>

        <div className="Infocountries">

          <div className="Infocountriesradios">

            <div>
              <input className="Radio" type="radio" name="filter" checked={filter === 3} onClick={() => setFilter(3)}></input>
              <label>Infected by Covid</label><br></br>
            </div>

            <div className="Infocountriesradiosmiddle">
              <input className="Radio" type="radio" name="filter" checked={filter === 1} onClick={() => setFilter(1)}></input>
              <label>Deaths by Covid</label><br></br>
            </div>

            <div>
              <input className="Radio" type="radio" name="filter" checked={filter === 2} onClick={() => setFilter(2)}></input>
              <label>Vaccinated</label><br></br>
            </div>

          </div>

          <div>
            <Allcountries filter={filter}></Allcountries>
          </div>

        </div>

      </div>

    </ApolloProvider>

  );
}

export default App;
