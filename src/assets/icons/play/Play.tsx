export const Play = ({ propsClass }: { propsClass?: string }) => {
  return (
    <div className={propsClass}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.1812 20.9414H8.18115V4.94141H10.1812V6.94141H12.1812V9.94141H14.1812V11.9414H16.1812V13.9414H14.1812V15.9414H12.1812V18.9414H10.1812V20.9414Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
