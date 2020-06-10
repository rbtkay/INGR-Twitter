//module
import React, { useEffect } from "react";
import Highcharts from "highcharts";

const GraphLines = ({ id, series, title, xLabel, yLabel }) => {
    useEffect(() => {
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
    }, [series, id, title]);

    return <div id={id} className="graph"></div>;
};

export default GraphLines;
