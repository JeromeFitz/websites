import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import cx from 'clsx'

const Toggle = ({ title, children }) => {
  return (
    <>
      <div className="w-full px-4 pt-16">
        <div className="w-full p-2 mx-auto bg-info-lighter rounded-2xl">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex flex-row">
                  {title}
                  <ChevronUpIcon
                    className={cx(
                      'ml-2 w-5 h-5',
                      'transform duration-500',
                      open ? ' rotate-180' : 'rotate-360'
                    )}
                  />
                </Disclosure.Button>
                <Transition
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel
                    className="px-4 pt-4 pb-2 text-sm text-gray-500"
                    static
                  >
                    {children}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </>
  )
}

export default Toggle
