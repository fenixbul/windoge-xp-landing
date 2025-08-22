import React from 'react';
import styles from './Wallpaper.module.css';

interface WallpaperProps {
  src?: string;
  alt?: string;
}

const Wallpaper: React.FC<WallpaperProps> = ({
  src = '/images/wallpapers/green-wallpaper.jpeg',
  alt = 'Desktop Wallpaper'
}) => {
  return (
    <img 
      src={src}
      alt={alt}
      className={styles.desktopWallpaper}
    />
  );
};

export default Wallpaper;
