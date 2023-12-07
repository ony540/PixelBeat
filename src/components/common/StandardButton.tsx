export const StandardButton = ({
  text,
  propsClass,
  onClick,
  fillColor,
  height
}: {
  text: string
  onClick: () => any
  propsClass?: string
  fillColor?: string
  height?: number
}) => {
  return (
    <button
      type="button"
      className={propsClass ? `${propsClass} block relative` : 'block relative'}
      onClick={onClick}>
      <svg
        width="100%"
        height={height || 56}
        viewBox="0 0 356 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect
          width="100%"
          height="100%"
          rx="19"
          fill={fillColor || '#57FF57'}
        />
        <rect
          x="5.71436"
          y="1.9043"
          width="3.80952"
          height="3.80952"
          fill="black"
        />
        <rect
          x="3.80957"
          y="3.80859"
          width="1.90476"
          height="5.71429"
          fill="black"
        />
        <rect
          x="1.90479"
          y="5.71387"
          width="1.90476"
          height="5.71429"
          fill="black"
        />
        <rect
          y="9.52344"
          width="3.80952"
          height="1.90476"
          fill="black"
        />
        <rect
          width="3.80952"
          height="3.80952"
          transform="matrix(-1 0 0 1 350.81 1.9043)"
          fill="black"
        />
        <rect
          width="1.90476"
          height="5.71429"
          transform="matrix(-1 0 0 1 352.714 3.80957)"
          fill="black"
        />
        <rect
          width="1.90476"
          height="5.71429"
          transform="matrix(-1 0 0 1 354.619 5.71387)"
          fill="black"
        />
        <rect
          width="3.80952"
          height="1.90476"
          transform="matrix(-1 0 0 1 356.524 9.52344)"
          fill="black"
        />
        <rect
          x="5.71436"
          y="50.2852"
          width="3.80952"
          height="3.80952"
          fill="black"
        />
        <rect
          x="3.80957"
          y="46.4756"
          width="1.90476"
          height="5.71429"
          fill="black"
        />
        <rect
          width="1.90476"
          height="5.71429"
          transform="matrix(1 0 0 -1 1.90479 50.2852)"
          fill="black"
        />
        <rect
          width="3.80952"
          height="1.90476"
          transform="matrix(1 0 0 -1 0 46.4756)"
          fill="black"
        />
        <rect
          width="3.80952"
          height="3.80952"
          transform="matrix(-1 0 0 1 350.81 50.2852)"
          fill="black"
        />
        <rect
          width="1.90476"
          height="5.71429"
          transform="matrix(-1 0 0 1 352.714 46.4756)"
          fill="black"
        />
        <rect
          x="354.619"
          y="50.2852"
          width="1.90476"
          height="5.71429"
          transform="rotate(180 354.619 50.2852)"
          fill="black"
        />
        <rect
          x="356.524"
          y="46.4756"
          width="3.80952"
          height="1.90476"
          transform="rotate(180 356.524 46.4756)"
          fill="black"
        />
        <rect
          x="8"
          width="339"
          height="3"
          fill="black"
        />
        <rect
          x="8"
          y="54"
          width="339"
          height="2"
          fill="black"
        />
        <rect
          y="11.4287"
          width="3.80952"
          height="33.1429"
          fill="black"
        />
        <rect
          width="3.80952"
          height="33.1429"
          transform="matrix(-1 0 0 1 356.524 11.4287)"
          fill="black"
        />
      </svg>
      <span className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-40%] w-full text-mainBlack">
        {text}
      </span>
    </button>
  )
}
