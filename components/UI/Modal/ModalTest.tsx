import { FC, useState } from 'react'

import { Button, Skeleton } from '~components/UI'
import { useUI } from '~context/ManagedUIContext'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const ModalTest: FC<Props> = () => {
  const [loading] = useState(false)
  const [disabled] = useState(false)
  const [message] = useState('Call out title')

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setModalView, closeModal } = useUI()

  return (
    <form className="w-80 flex flex-col justify-between p-3">
      <div className="flex justify-center pb-12 ">
        <Skeleton className="w-full animated fadeIn" height={64} width={64} />
      </div>
      <div className="flex flex-col space-y-4">
        {message && (
          <div className="text-secondary-2 border border-secondary-2 p-3">
            {message}
          </div>
        )}
        <div className="pt-2 w-full flex flex-col">
          <Button
            disabled={disabled}
            loading={loading}
            onClick={() => closeModal()}
            variant="slim"
          >
            Close Modal
          </Button>
        </div>

        <span className="pt-3 text-center text-sm">
          <span className="text-accents-7">Open another Modal?</span>
          {` `}
          {/* <a
            className="text-accent-9 font-bold hover:underline cursor-pointer"
            onClick={() => setModalView('MODAL_TEST_VIEW')}
          >
            Test Modal View 2
          </a> */}
        </span>
      </div>
    </form>
  )
}

export default ModalTest
