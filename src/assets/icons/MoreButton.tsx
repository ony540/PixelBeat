export const MoreButton = ({ onClick, fill = 'white' }: { onClick?: () => void; fill?: string }) => {
  return (
    <svg
      onClick={onClick}
      className="absolute right-10 cursor-pointer"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="14" y="5" width="3" height="3" transform="rotate(90 14 5)" fill={fill} />
      <rect x="14" y="11" width="3" height="3" transform="rotate(90 14 11)" fill={fill} />
      <rect x="14" y="17" width="3" height="3" transform="rotate(90 14 17)" fill={fill} />
    </svg>
  );
};
