import React from "react";
import Chart from "react-apexcharts";

const state = [
    {
        name: "Phim lẻ",
        data: [31, 40, 28, 51, 42, 109, 100, 90],
    },
    {
        name: "Phim bộ",
        data: [11, 32, 45, 32, 34, 52, 41, 39],
    },
];

const options = {
    chart: {
        type: "area",
        animations: {
            easing: "linear",
            speed: 300,
        },
        sparkline: {
            enabled: false,
        },
        brush: {
            enabled: false,
        },
        id: "basic-bar",
        foreColor: "hsl(var(--nextui-default-800))",
        stacked: true,
        toolbar: {
            show: false,
        },
    },
    xaxis: {
        categories: ['9/2023', '10/2023', '11/2023', '12/2023', '1/2024', '2/2024', '3/2024', '4/2024'],
        labels: {
            style: {
                colors: "hsl(var(--nextui-default-800))",
            },
        },
        axisBorder: {
            color: "hsl(var(--nextui-nextui-default-200))",
        },
        axisTicks: {
            color: "hsl(var(--nextui-nextui-default-200))",
        },
    },
    yaxis: {
        labels: {
            style: {
                colors: "hsl(var(--nextui-default-800))",
            },
        },
    },
    tooltip: {
        enabled: false,
    },
    grid: {
        show: true,
        borderColor: "hsl(var(--nextui-default-200))",
        strokeDashArray: 0,
        position: "back",
    },
    stroke: {
        curve: "smooth",
        fill: {
            colors: ["red"],
        },
    },
    markers: false,
};

export const Steam = () => {
    return (
        <>
            <div className="w-full z-20">
                <div id="chart">
                    <Chart options={options} series={state} type="area" height={425} />
                </div>
            </div>
        </>
    );
};
