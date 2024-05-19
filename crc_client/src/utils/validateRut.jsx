export function validateRut(rut) {
    if (!/^[0-9.]+[-]?[0-9kK]{1}/.test(rut)) {
        return false;
    }

    rut = rut.replace(/[\.\-]/gi, "");
    const dv = rut.slice(-1);
    const numero = rut.slice(0, -1);
    let i = 2;
    let suma = 0;

    [...numero].reverse().forEach((v) => {
        if (i === 8) {
            i = 2;
        }
        suma += parseInt(v, 10) * i;
        i++;
    });

    let dvr = 11 - (suma % 11);

    if (dvr === 11) {
        dvr = 0;
    }
    if (dvr === 10) {
        dvr = "K";
    }

    if (dvr == dv.toUpperCase()) {
        return true;
    } else {
        return false;
    }
}
