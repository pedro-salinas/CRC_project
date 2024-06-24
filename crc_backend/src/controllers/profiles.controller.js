import Profile from "../models/profile.model.js";

export const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        return res.json(profiles);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const createProfile = async (req, res) => {
    try {
        const { name, variables } = req.body;

        const newProfile = new Profile({
            name,
            variables,
        });

        const savedProfile = await newProfile.save();
        return res.json(savedProfile);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndUpdate(
            req.params._id,
            req.body,
            {
                new: true,
            }
        );
        if (!profile)
            return res.status(404).json({ message: "Perfil no encontrado" });
        return res.json(profile);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params._id);

        if (!profile)
            return res.status(404).json({ message: "Perfil no encontrado" });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
