import React from 'react';
import { motion } from 'framer-motion';

export default function ExternalImage({ src, alt, className = '', eager = false, motionProps = {} }) {
  const hideBrokenImage = (event) => {
    event.currentTarget.style.display = 'none';
    event.currentTarget.parentElement?.classList.add('image-failed');
  };

  return (
    <span className={`external-image ${className}`}>
      <span className="image-fallback" aria-hidden="true">
        <i className="bi bi-signpost-2" />
      </span>
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'auto' : 'async'}
        fetchPriority={eager ? 'high' : 'auto'}
        onError={hideBrokenImage}
        {...motionProps}
      />
    </span>
  );
}
