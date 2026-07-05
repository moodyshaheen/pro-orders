// Helper function to handle image display
export const getImageSrc = (image, baseUrl) => {
    // If image is base64 (starts with data:), return as is
    if (image && image.startsWith('data:')) {
        return image;
    }

    // If image is a filename, construct URL
    if (image && baseUrl) {
        return `${baseUrl}/images/${image}`;
    }

    // Return placeholder or empty string
    return '';
};

// Helper component for product images
export const ProductImage = ({ image, alt, className, baseUrl }) => {
    const src = getImageSrc(image, baseUrl);

    return (
        <img
            src={src || '/placeholder-image.png'}
            alt={alt || 'Product'}
            className={className}
            onError={(e) => {
                e.target.src = '/placeholder-image.png';
            }}
        />
    );
};