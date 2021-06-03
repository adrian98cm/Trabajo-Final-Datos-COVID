import React, { FC, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const Countriesbarchar: FC<{ databar: any, datakey: string, color: string }> = ({ databar, datakey, color }) => {

    console.log(databar)

    return (
        <BarChart width={900} height={400} data={databar} margin={{ top: 30, right: 40, left: 20, bottom: 5 }}>
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={datakey} fill={color} />
        </BarChart>
    );
}


export default Countriesbarchar;
