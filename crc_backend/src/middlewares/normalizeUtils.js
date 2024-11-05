export const normalizeRut = (req, res, next) => {
    try {
        const rut = req.body.rut || req.params.rut;

        const cleanedRut = rut.replace(/[^0-9kK]/g, "").toLowerCase();
        const formattedRut = cleanedRut.replace(/^(.*)(.)$/, "$1-$2");

        req.body.rut = formattedRut;

        next();
    } catch (error) {
        res.status(500).json({ message: ["rut", error.message] });
    }
};

export const normalizeEmail = (req, res, next) => {
    try {
        const { email } = req.body;

        const lowercaseEmail = email.toLowerCase();

        req.body.email = lowercaseEmail;

        next();
    } catch (error) {
        res.status(500).json({ message: ["email", error.message] });
    }
};
