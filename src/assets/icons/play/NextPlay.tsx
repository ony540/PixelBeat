export const NextPlay = ({ propsClass }: { propsClass?: string }) => {
  return (
    <div className={propsClass}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 6.66602H13.3333V9.99935H16.6667V13.3327H20L20 16.666H23.3334V23.3327H20L20 26.666H16.6667V29.9994H13.3333V33.3327H10V6.66602ZM30 6.66602H26.6667V33.3327H30V6.66602Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
