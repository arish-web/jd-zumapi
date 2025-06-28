import Tattoo from "../models/TattooModel.js";

export const addTattoo = async (req, res) => {
  try {
    const { title, description, style, size, date, price, uniqueCode, image, id } =
      req.body;

    const tattoo = new Tattoo({
      title: req.body.title,
      description: req.body.description,
      artist: req.body.artist,
      style: req.body.style,
      size: req.body.size,
      date: req.body.date,
      price: req.body.price,
      uniqueCode: req.body.uniqueCode,
      image: req.body.image,
      ownerId: req.user.id
    });

    const saved = await tattoo.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create tattoo", error: err.message });
  }
};

export const getAllTattoos = async (req, res) => {
  try {
    // const tattoos = await Tattoo.find({ artist: req.user.name });
    const tattoos = await Tattoo.find({ deleted: { $ne: true } }); // Optional: Skip soft-deleted
    res.status(200).json(tattoos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tattoos", error: error.message });
  }
};

export const getTattooById = async (req, res) => {
  const { id } = req.params;

  try {
    const tattoo = await Tattoo.findById(id);

    if (!tattoo || tattoo.deleted) {
      return res.status(404).json({ msg: "Tattoo not found" });
    }

    res.status(200).json(tattoo);
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving tattoo", error });
  }
};

export const updateTattoo = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedTattoo = await Tattoo.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedTattoo) {
      return res.status(404).json({ msg: "Tattoo not found" });
    }

    res.status(200).json(updatedTattoo);
  } catch (error) {
    res.status(500).json({ msg: "Error updating tattoo", error });
  }
};

export const softDeleteTattoo = async (req, res) => {
  const { id } = req.params;

  try {
    const tattoo = await Tattoo.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!tattoo) {
      return res.status(404).json({ msg: 'Tattoo not found' });
    }

    res.status(200).json({ msg: 'Tattoo soft-deleted successfully', tattoo });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete tattoo', error: err });
  }
};


