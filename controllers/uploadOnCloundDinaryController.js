const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dtwfpuc6b',
    api_key: '763859465439312',
    api_secret: 'lU2EhY026oeZtbXt5ddAcZf3HUA'
});

// Upload an image to Cloudinary
const uploadToCloudinary = async (req, res) => {
    try {
        const file = req.file; // Assume you're using middleware like multer to handle file upload
        const uploadPreset = 'ml_default';
        const result = await cloudinary.uploader.upload(file.path, {
            upload_preset: uploadPreset,
            folder: 'my_pictures'
        });

        if (result.secure_url) {
            return res.status(200).json({
                message: 'Image uploaded successfully',
                url: result.secure_url
            });
        } else {
            return res.status(400).json({
                message: 'Failed to upload image',
                data: result
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Error uploading image',
            error: error.message
        });
    }
};

// Fetch all images from Cloudinary folder
const fetchImagesFromCloudinary = async (req, res) => {
    try {
        const result = await cloudinary.search
            .expression('folder:my_pictures')
            .execute();

        console.log('helllo'+result);

        if (result.resources && result.resources.length > 0) {
            const images = result.resources.map((image) => ({
                url: image.secure_url
            }));

            return res.status(200).json({
                message: 'Images fetched successfully',
                images: images
            });
        } else {
            return res.status(404).json({
                message: 'No images found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching images',
            error: error.message
        });
    }
};

module.exports = {
    uploadToCloudinary,
    fetchImagesFromCloudinary
};
