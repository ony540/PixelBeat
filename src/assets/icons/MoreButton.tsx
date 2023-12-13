export const MoreButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <svg
      onClick={onClick}
      className="absolute right-10 cursor-pointer"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        x="14"
        y="5"
        width="3"
        height="3"
        transform="rotate(90 14 5)"
        fill="white"
      />
      <rect
        x="14"
        y="11"
        width="3"
        height="3"
        transform="rotate(90 14 11)"
        fill="white"
      />
      <rect
        x="14"
        y="17"
        width="3"
        height="3"
        transform="rotate(90 14 17)"
        fill="white"
      />
    </svg>
  )
}
