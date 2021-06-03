import React, { FC, useEffect, useState } from "react";
import axios from 'axios';
import Countrypie from '../components/Countrypie';
import '../style/Countrycovid.css';

const Countrycovid: FC<{ country: string }> = ({ country }) => {

    const [datac, setDatac] = useState<any>();
    const [datav, setDatav] = useState<any>();
    let urlv = "https://covid-api.mmediagroup.fr/v1/vaccines?country=" + country;
    let urlc = "https://covid-api.mmediagroup.fr/v1/cases?country=" + country;

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

    let datacie: Array<any> = [];
    let datadie: Array<any> = [];
    let datavie: Array<any> = [];

    if (datac) {

        datacie = [
            {
                "name": "Population",
                "value": datac.data.All.population - datac.data.All.confirmed
            },
            {
                "name": "Infected",
                "value": datac.data.All.confirmed
            }
        ];

        datadie = [
            {
                "name": "Population",
                "value": datac.data.All.population - datac.data.All.deaths
            },
            {
                "name": "Deaths",
                "value": datac.data.All.deaths
            }
        ];

    }

    if (datav) {

        datavie = [
            {
                "name": "Population",
                "value": datav.data.All.population - datav.data.All.people_vaccinated
            },
            {
                "name": "Vaccinated",
                "value": datav.data.All.people_vaccinated
            }
        ];

    }


    return (

        <div className="Infocountry">

            {datac &&
                <div className="covidcountry">
                    <div className="">Infected by Covid</div>
                    <div>{datac.data.All.confirmed.toLocaleString()}</div>
                    <div className="countrypie">
                        <Countrypie datapie={datacie} color={"#8884d8"}></Countrypie>
                    </div>
                </div>
            }

            {datac &&
                <div className="covidcountry">

                    <div className="">Deaths by Covid</div>
                    <div>{datac.data.All.deaths.toLocaleString()}</div>
                    <div className="countrypie">
                        <Countrypie datapie={datadie} color={"#c23232"}></Countrypie>
                    </div>
                </div>
            }

            {datav &&
                <div className="vaccountry">
                    <div className="">Vaccinated</div>
                    <div>{datav.data.All.people_vaccinated.toLocaleString()}</div>
                    <div className="countrypie">
                        <Countrypie datapie={datavie} color={"#82ca9d"}></Countrypie>
                    </div>
                </div>

            }

        </div>

    );
}

export default Countrycovid;
