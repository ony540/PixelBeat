import { useState } from 'react';

export const MoreCircle = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const fill = isHovered ? '#313131' : 'black';
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_863_20307)">
        <g filter="url(#filter0_d_863_20307)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17 3H7V4V5H5V7H3V17H5V19H7V21H17V19H19V17H20H21V7H20H19V5H17V4V3Z"
            fill="white"
          />
        </g>
        <g filter="url(#filter1_d_863_20307)">
          <path
            fill={fill}
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17 10L15 10L15 12L17 12L17 10ZM13 14L15 14L15 12L13 12L13 14ZM11 14L11 16L13 16L13 14L11 14ZM9 12L11 12L11 14L9 14L9 12ZM9 12L9 10L7 10L7 12L9 12Z"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_863_20307"
          x="-1"
          y="3"
          width="26"
          height="26"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
          <feFlood
            flood-opacity="0"
            result="BackgroundImageFix"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite
            in2="hardAlpha"
            operator="out"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_863_20307"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_863_20307"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_863_20307"
          x="3"
          y="10"
          width="18"
          height="14"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
          <feFlood
            flood-opacity="0"
            result="BackgroundImageFix"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite
            in2="hardAlpha"
            operator="out"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_863_20307"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_863_20307"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_863_20307">
          <rect
            width="24"
            height="24"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
