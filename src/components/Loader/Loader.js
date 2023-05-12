import React from 'react'
import ContentLoader from 'react-content-loader'

import styles from './Loader.module.css'

export function Loader() {
  return (
    <>
      <ContentLoader
        className={styles.loader}
        speed={2}
        width={502}
        height={184}
        viewBox="0 0 502 184"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="20" y="20" rx="3" ry="3" width="147" height="24" />
        <rect x="342" y="20" rx="5" ry="5" width="110" height="36" />
        <rect x="20" y="76" rx="0" ry="0" width="80" height="18" />
        <rect x="20" y="100" rx="0" ry="0" width="100" height="18" />
        <rect x="181" y="76" rx="0" ry="0" width="80" height="18" />
        <rect x="181" y="100" rx="0" ry="0" width="100" height="18" />
        <rect x="342" y="100" rx="0" ry="0" width="100" height="18" />
        <rect x="21" y="155" rx="0" ry="0" width="100" height="18" />
        <rect x="342" y="76" rx="0" ry="0" width="80" height="18" />
        <rect x="20" y="130" rx="0" ry="0" width="80" height="18" />
        <rect x="181" y="131" rx="0" ry="0" width="80" height="18" />
        <rect x="342" y="133" rx="0" ry="0" width="80" height="18" />
        <rect x="181" y="156" rx="0" ry="0" width="100" height="18" />
        <rect x="342" y="155" rx="0" ry="0" width="100" height="18" />
      </ContentLoader>
    </>
  )
}
