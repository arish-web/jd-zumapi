import Photo from "../models/PhotoModel.js";

// Add photo
export const addPhoto = async (req, res) => {
  try {
    const {
      id,
      title,
      photographer,
      description,
      category,
      // size,
      date,
      price,
      uniqueCode,
      image,
      
    } = req.body;

    const photo = new Photo({
      title,
      photographer,
      description,
      category,
      // size,
      date,
      price,
      uniqueCode,
      image,
      ownerId: req.user.id,
    });

    const saved = await photo.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to create photo", error: err.message });
  }
};

// Get all
export const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({ deleted: { $ne: true } });
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch photos", error: error.message });
  }
};

// Get by ID
export const getPhotoById = async (req, res) => {
  const { id } = req.params;
  try {
    const photo = await Photo.findById(id);
    if (!photo || photo.deleted) {
      return res.status(404).json({ msg: "Photo not found" });
    }
    res.status(200).json(photo);
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving photo", error });
  }
};

// Update
export const updatePhoto = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Photo.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: "Photo not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ msg: "Error updating photo", error });
  }
};

// Soft Delete
export const softDeletePhoto = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Photo.findByIdAndUpdate(id, { deleted: true }, { new: true });
    if (!deleted) return res.status(404).json({ msg: "Photo not found" });
    res.status(200).json({ msg: "Photo soft-deleted successfully", deleted });
  } catch (error) {
    res.status(500).json({ msg: "Failed to delete photo", error });
  }
};
