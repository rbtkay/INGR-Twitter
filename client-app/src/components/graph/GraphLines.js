//module
import React, { useEffect } from "react";
import Highcharts from "highcharts";

const GraphLines = ({ id, series, title, xLabel, yLabel }) => {
    console.log("1", series);
    useEffect(() => {
        console.log("2", series);
        Highcharts.chart(id, {
            chart: {
                type: "line",
            },
            title: { text: title },
            series: series,
            xAxis: {
                title: { text: xLabel },
                type: "category",
            },
            yAxis: {
                title: { text: yLabel },
            },
            credits: {
                enabled: false,
            },
        });
    }, [series, id, title, xLabel, yLabel]);

    return <div id={id} className="graph"></div>;
};

export default GraphLines;
