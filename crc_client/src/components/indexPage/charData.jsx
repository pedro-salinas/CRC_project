export const data = {
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

export const options = {
    elements: {
        line: {
            borderWidth: 1,
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
                    size: 12,
                },
            },
            pointLabels: {
                font: {
                    size: 12,
                },
                padding: 1,
            },
        },
    },
    plugins: {
        legend: {
            labels: {
                font: {
                    size: 12,
                },
            },
        },
    },
};
