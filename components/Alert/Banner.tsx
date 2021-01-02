import cx from 'clsx'
import { useState } from 'react'
import Container from '~components/Container'

const Banner = ({ isPersistent = true, children }) => {
  const [isChecked, isCheckedSet] = useState(false)
  const handleVisible = () => {
    isCheckedSet(true)
  }

  return (
    <div
      className={cx(
        'alert-footer w-full fixed bottom-0 z-50 bg-warning',
        'border border-l-0 border-r-0 border-black',
        { checked: isChecked }
      )}
    >
      <input
        checked={isChecked}
        className="hidden"
        defaultChecked={false}
        id="alert-footer"
        onChange={() => handleVisible()}
        type="checkbox"
      />
      <Container>
        <div className="flex justify-items-start justify-between w-full">
          {children}
          {!isPersistent && (
            <label
              className="close cursor-pointer"
              title="close"
              htmlFor="alert-footer"
            >
              <svg
                className="fill-current text-black"
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
      </Container>
    </div>
  )
}

export default Banner
