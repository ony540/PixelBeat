export const FullHeart = ({
  onClick,
  className,
  fillColor
}: {
  onClick?: () => void
  className?: string
  fillColor?: string
}) => {
  return (
    <button className={className}>
      <svg
        onClick={onClick}
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 9C2.83333 7.83333 1.49964 3.5 3.99981 2.5L6.00022 2L7.64552 3.85422L9.49981 4.5L10.4998 3.5L11.4998 2.5L13.4998 2L13.9998 2.5L15.9998 4.5L16.0002 7L9.00022 14L5.50019 10.5L4.00019 9H3Z"
          fill={fillColor}
          stroke={fillColor}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.75 0.5H3.75V2H2.25V3.5H0.75V8H2.25V9.5H3.75V11H5.25V12.5H6.75V14H8.25V15.5H9.75V14H11.25V12.5H12.75V11H14.25V9.5H15.75V8H17.25V3.5H15.75V2H14.25V0.5H11.25V2H9.75V3.5H8.25V2H6.75V0.5ZM6.75 2V3.5H8.25V5H9.75V3.5H11.25V2H14.25V3.5H15.75V8H14.25V9.5H12.75V11H11.25V12.5H9.75V14H8.25V12.5H6.75V11H5.25V9.5H3.75V8H2.25V3.5H3.75V2H6.75Z"
          fill={fillColor}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.75 0.5H3.75V2H2.25V3.5H0.75V8H2.25V9.5H3.75V11H5.25V12.5H6.75V14H8.25V15.5H9.75V14H11.25V12.5H12.75V11H14.25V9.5H15.75V8H17.25V3.5H15.75V2H14.25V0.5H11.25V2H9.75V3.5H8.25V2H6.75V0.5ZM6.75 2V3.5H8.25V5H9.75V3.5H11.25V2H14.25V3.5H15.75V8H14.25V9.5H12.75V11H11.25V12.5H9.75V14H8.25V12.5H6.75V11H5.25V9.5H3.75V8H2.25V3.5H3.75V2H6.75Z"
          fill="black"
        />
      </svg>
    </button>
  )
}
