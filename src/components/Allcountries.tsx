import React, { FC, useEffect, useState } from "react";
import axios from 'axios';
import Countriesbarchar from '../components/Countriesbarchar';
import '../style/Allcountries.css';


const Allcountries: FC<{ filter: number }> = ({ filter }) => {

    const [datac, setDatac] = useState<any>();
    const [urlc, setUrlc] = useState("https://covid-api.mmediagroup.fr/v1/cases");
    const [urlv, setUrlv] = useState("https://covid-api.mmediagroup.fr/v1/vaccines");
    const [datav, setDatav] = useState<any>();

    useEffect(() => {
        axios.get(urlc).then((response) => {
            setDatac(response);
        });

    }, [urlc]);

    useEffect(() => {
        axios.get(urlv).then((response) => {
            setDatav(response);
        });

    }, [urlv]);

    let arr: any;
    let newarr: Array<any> = [];
    let result: Array<any> = [];

    if (filter == 1) {

        if (datac) {

            arr = Object.values(datac.data);
            arr.forEach((element: any) => {
                newarr.push(element.All);
            });
            newarr.sort((a: any, b: any) => (a.deaths < b.deaths) ? 1 : -1)
            result = newarr.slice(1, 21).map(({ deaths, country }) => ({ deaths, country }))

        }

        return (

            <div>

                <div className="Countriesbarchar">
                    <Countriesbarchar databar={result} datakey={"deaths"} color={"#c23232"}></Countriesbarchar>
                </div>

                <div className="Infolist">

                    {result &&
                        
                        result.map((r: { deaths: number, country: string }, index) => (
                            <div className="Datacountry">
                                <div>{index + 1 + "º " + r.country}</div>
                                <div className="Datanextcountry">{r.deaths.toLocaleString()}</div>
                            </div>
                        ))
                    }

                </div>

            </div>

        );

    }

    if (filter == 2) {

        if (datav) {

            arr = Object.values(datav.data);
            arr.forEach((element: any) => {
                newarr.push(element.All);
            });
            newarr.forEach(function (obj, index) {
                if (obj.country == undefined) {
                    delete newarr[index]
                }
            });

            newarr.sort((a: any, b: any) => (a.people_vaccinated < b.people_vaccinated) ? 1 : -1)
            result = newarr.slice(0, 20).map(({ people_vaccinated, country }) => ({ people_vaccinated, country }))

        }

        return (

            <div>
                <div className="Countriesbarchar">
                    <Countriesbarchar databar={result} datakey={"people_vaccinated"} color={"#82ca9d"}></Countriesbarchar>
                </div>

                <div className="Infolist">

                    {result &&

                        result.map((r: { people_vaccinated: number, country: string }, index) => (

                            <div className="Datacountry">
                                <div>{index + 1 + "º " + r.country}</div>
                                <div className="Datanextcountry">{r.people_vaccinated.toLocaleString()}</div>
                            </div>
                        ))
                    }

                </div>

            </div>

        );

    }


    if (datac) {

        arr = Object.values(datac.data);
        arr.forEach((element: any) => {
            newarr.push(element.All);
        });
        newarr.sort((a: any, b: any) => (a.confirmed < b.confirmed) ? 1 : -1)
        result = newarr.slice(1, 21).map(({ confirmed, country }) => ({ confirmed, country }))

    }

    return (

        <div>

            <div className="Countriesbarchar">
                <Countriesbarchar databar={result} datakey={"confirmed"} color={"#8884d8"}></Countriesbarchar>
            </div>

            <div className="Infolist">

                {result &&

                    result.map((r: { confirmed: number, country: string }, index) => (

                        <div className="Datacountry">
                            <div>{index + 1 + "º " + r.country}</div>
                            <div className="Datanextcountry">{r.confirmed.toLocaleString()}</div>
                        </div>

                    ))

                }

            </div>

        </div>

    );
}

export default Allcountries;
