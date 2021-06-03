import React, { FC, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import '../style/Search.css';
import Countrycovid from '../components/Countrycovid';

const COUNTRIES = gql`

    query countries($name:String) {

        countries(where:{name:{eq:$name}}) {
        
            name
            population
            alpha2Code
    		continent {
    		  name
    		}
    		languages{
                name
            }
            currencies{
                name
            }  
            capital{
                name
                population
            }
        }
        
    }`;

let text = "";

const Search: FC = () => {

    const [country, setCountry] = useState<string>("");
    const { loading, error, data } = useQuery(COUNTRIES, {
        variables: { name: country },
    });

    if (error) console.log(error);


    return (

        <div className="Countries">

            <div className="Title">Write the name of the Country</div>

            <div className="Searcher">

                <div className="Input">
                    <input className="Inputcomponent" type="text" onChange={(e) => text = e.target.value} />
                </div>
                <div className="Search">
                    <button onClick={() => setCountry(text)} >Search</button>
                </div>

            </div>

            <div className="Infocountry">

                {data &&

                    data.countries.map((r: {
                        name: string, population: string, continent: any, languages: any, currencies: any,
                        capital: any, alpha2Code: string
                    }) => (

                        <div className="CountryInfo">

                            <div className="Datacountryinfo">

                                <div className="Datacountrynoflag">
                                    <div>{r.population ? "Population: " + r.population.toLocaleString() : ""}</div>
                                    <div>{r.continent ? "Continent: " + r.continent.name : ""}</div>
                                    <div className="">{r.capital ? "Capital: " + r.capital.name : ""}</div>
                                </div>

                                <div className="Flag">
                                    <img width="100px" height="90px" src={"https://www.countryflags.io/" + r.alpha2Code + "/flat/64.png"} alt=""></img>
                                </div>

                            </div>

                            <Countrycovid country={r.name}></Countrycovid>

                        </div>

                    ))

                }

            </div>


        </div>

    );

}



export default Search;


