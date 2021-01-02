import cx from 'clsx'
import { useState } from 'react'

const Toast = ({ children, isPersistent = false }) => {
  const [isChecked, isCheckedSet] = useState(false)
  const handleVisible = () => {
    isCheckedSet(true)
  }
  return (
    <div
      className={cx(
        'alert-toast fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm bg-warning rounded-md',
        'flex items-start justify-between w-full p-2 h-24 rounded shadow-lg',
        { checked: isChecked }
      )}
    >
      <input
        checked={isChecked}
        className="hidden"
        defaultChecked={false}
        id="alert-toast"
        onChange={() => handleVisible()}
        type="checkbox"
      />
      {children}
      {!isPersistent && (
        <label
          className="close cursor-pointer  "
          title="close"
          htmlFor="alert-toast"
        >
          <svg
            className="fill-current "
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
        </label>
      )}
    </div>
  )
}

export default Toast
