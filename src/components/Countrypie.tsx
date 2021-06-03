import React, { FC, useEffect, useState } from "react";
import { PieChart, Pie, Tooltip } from 'recharts';


const Countrypie: FC<{ datapie: any, color: string }> = ({ datapie, color }) => {


    return (

        <div>

            <PieChart width={160} height={160}>
                <Pie data={datapie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={55} fill={color} />
                <Tooltip />
            </PieChart>

        </div>

    );
}

export default Countrypie;
