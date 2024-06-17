// React
import { Radar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";

// Registramos los componentes necesarios de Chart.js
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export function Chart() {
    // Datos del grafico

    const data = {
        labels: [
            "Sentadilla",
            "Peso muerto",
            "Hip trust",
            "SLR Antes",
            "90/90",
            "Resp. Diafragmática",
            "Abd. Hollowing",
        ],
        datasets: [
            {
                label: "Antes de Kinesiología",
                data: [5, 5, 5, 20, 5, 25, 15],
                // backgroundColor: "#A0A9B2",
                // borderColor: "#6c757d",
                backgroundColor: "#E59F92",
                borderColor: "#F02626",

                borderWidth: 1,
            },
            {
                label: "Después de Kinesiología",
                data: [25, 35, 22, 100, 78, 62, 100],
                backgroundColor: "#C1FCF6",
                borderColor: "#31b6ad",
                borderWidth: 1,
            },
        ],
    };

    // Opciones del grafico
    // const options = {
    //     scales: {
    //         r: {
    //             angleLines: {
    //                 display: false,
    //             },
    //             suggestedMin: 0,
    //             suggestedMax: 20,
    //         },
    //     },
    // };

    const options = {
        elements: {
            line: {
                borderWidth: 1, // Ajusta el ancho de las líneas de los radios
            },
        },
        scales: {
            r: {
                angleLines: {
                    display: true,
                },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    font: {
                        size: 12, // Tamaño de la fuente de los ticks
                    },
                },
                pointLabels: {
                    font: {
                        size: 12, // Tamaño de la fuente de los labels
                    },
                    padding: 1, // Padding de los labels
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 12, // Tamaño de la fuente de la leyenda
                    },
                },
            },
        },
    };

    return <Radar data={data} options={options} />;
}
