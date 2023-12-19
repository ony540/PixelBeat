export const PixelBeatLoginButton = ({
  onClick,
  propsClass
}: {
  onClick?: () => void
  propsClass?: string
}) => {
  return (
    <button
      className="relative"
      type="button"
      onClick={onClick}>
      <svg
        className={propsClass}
        width="100%"
        height="100%"
        viewBox="0 0 357 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none">
        <rect
          width="356"
          height="56"
          rx="19"
          fill="#FFFF57"
        />
        <rect
          x="5.71484"
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
          x="1.90527"
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
          transform="matrix(-1 0 0 1 350.809 1.9043)"
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
          transform="matrix(-1 0 0 1 354.618 5.71387)"
          fill="black"
        />
        <rect
          width="3.80952"
          height="1.90476"
          transform="matrix(-1 0 0 1 356.523 9.52344)"
          fill="black"
        />
        <rect
          x="5.71484"
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
          transform="matrix(1 0 0 -1 1.90527 50.2852)"
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
          transform="matrix(-1 0 0 1 350.809 50.2852)"
          fill="black"
        />
        <rect
          width="1.90476"
          height="5.71429"
          transform="matrix(-1 0 0 1 352.714 46.4756)"
          fill="black"
        />
        <rect
          x="354.618"
          y="50.2852"
          width="1.90476"
          height="5.71429"
          transform="rotate(180 354.618 50.2852)"
          fill="black"
        />
        <rect
          x="356.523"
          y="46.4756"
          width="3.80952"
          height="1.90476"
          transform="rotate(180 356.523 46.4756)"
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
          transform="matrix(-1 0 0 1 356.523 11.4287)"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M45.5 20H24V37.2H45.5V20ZM26.15 35.05V22.15H43.35V35.05H26.15ZM30.45 24.3002H28.3V26.4502H30.45L30.45 28.6002H32.6V30.7502H36.9L36.9 28.6002H39.05L39.05 26.4502H41.2V24.3002H39.05V26.4502H36.9V28.6002H32.6V26.4502H30.45V24.3002Z"
          fill="black"
        />
      </svg>
      <p
        className="text-mainBlack absolute 
                    left-[50%] translate-x-[-50%]
                    desktop:top-15
                    mobile:top-17">
        이메일 로그인
      </p>
    </button>
  )
}
