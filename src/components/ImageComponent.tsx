import React, { useEffect, useRef, useCallback } from 'react';

type ImageProps = {
    src: string;
    style?: React.CSSProperties;
    alt?: string;
    onLoad?: () => void; // Add an onLoad prop
    onError?: () => void; // Add an onError prop (optional)
};

const ImageComponent: React.FC<ImageProps> = ({ src, style, alt, onLoad, onError }) => {
    const imgRef = useRef<HTMLImageElement>(null);

    const handleImageLoaded = useCallback(() => {
        console.log('Image has finished loading!');
        onLoad && onLoad(); // Call the onLoad prop if provided
    }, [onLoad]);

    const handleImageError = useCallback(() => {
        console.log('Error loading image.');
        onError && onError(); // Call the onError prop if provided
    }, [onError]);

    useEffect(() => {
        const imageElement = imgRef.current;

        if (imageElement) {
            if (imageElement.complete && imageElement.naturalHeight !== 0) {
                // Image is already loaded (from cache)
                handleImageLoaded();
            } else {
                // Image is not yet loaded, set up event listeners
                imageElement.addEventListener('load', handleImageLoaded);
                imageElement.addEventListener('error', handleImageError);

                // Remove event listeners on cleanup
                return () => {
                    imageElement.removeEventListener('load', handleImageLoaded);
                    imageElement.removeEventListener('error', handleImageError);
                };
            }
        }
    }, [src, handleImageLoaded, handleImageError]); // Re-run effect if src or callbacks change

    return (
        <img
            style={style}
            ref={imgRef}
            src={src}
            alt={alt}
        />
    );
};

export default ImageComponent;