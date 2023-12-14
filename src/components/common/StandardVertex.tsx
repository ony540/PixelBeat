export const StandardVertex = ({
  propsClass,
  fillColor
}: {
  propsClass?: string
  fillColor?: string
}) => {
  return (
    <div className={propsClass}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <mask
          id="mask0_880_19881"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48">
          <rect
            width="48"
            height="48"
            fill="#D9D9D9"
          />
        </mask>
        <g mask="url(#mask0_880_19881)">
          <rect
            x="0.570801"
            y="-0.697266"
            width="1.28542"
            height="3.91006"
            fill={fillColor || 'currentColor'}
          />
          <rect
            x="-1"
            y="-1"
            width="4"
            height="3"
            fill={fillColor || 'currentColor'}
          />
          <rect
            x="-0.714355"
            y="0.607422"
            width="1.28542"
            height="3.91006"
            fill={fillColor || 'currentColor'}
          />
          <rect
            x="-2"
            y="3.21289"
            width="2.57084"
            height="1.30335"
            fill={fillColor || 'currentColor'}
          />
          <rect
            x="47"
            y="50"
            width="3"
            height="3"
            transform="rotate(-180 47 50)"
            fill={fillColor || 'currentColor'}
          />
          <rect
            x="48"
            y="49"
            width="2"
            height="5"
            transform="rotate(-180 48 49)"
            fill={fillColor || 'currentColor'}
          />
          <rect
            x="49.9102"
            y="1"
            width="1.28542"
            height="3.91006"
            transform="rotate(90 49.9102 1)"
            fill={fillColor || 'currentColor'}
          />
          <rect
            x="49"
            y="1"
            width="3"
            height="2"
            transform="rotate(90 49 1)"
            fill={fillColor || 'currentColor'}
          />
          <rect
            x="50"
            y="-1"
            width="2"
            height="5"
            transform="rotate(90 50 -1)"
            fill={fillColor || 'currentColor'}
          />
          <rect
            x="46.3032"
            y="-2"
            width="2.57084"
            height="1.30335"
            transform="rotate(90 46.3032 -2)"
            fill={fillColor || 'currentColor'}
          />
          <rect
            x="-2"
            y="46"
            width="3"
            height="3"
            transform="rotate(-90 -2 46)"
            fill={fillColor || 'currentColor'}
          />
          <rect
            x="-1"
            y="47"
            width="1"
            height="4"
            transform="rotate(-90 -1 47)"
            fill={fillColor || 'currentColor'}
          />
          <rect
            y="48"
            width="1"
            height="4"
            transform="rotate(-90 0 48)"
            fill={fillColor || 'currentColor'}
          />
        </g>
      </svg>
    </div>
  )
}
