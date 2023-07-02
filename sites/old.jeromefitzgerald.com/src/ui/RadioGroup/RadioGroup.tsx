import { cx } from '@jeromefitz/shared/src/utils'
import * as RadioGroup from '@radix-ui/react-radio-group'

const RadioGroupDemo = ({ items, label, onValueChange }) => (
  <form>
    <RadioGroup.Root
      className="ml-1 flex flex-col gap-2.5"
      defaultValue={'short_term'}
      aria-label={label}
      onValueChange={(e) => void onValueChange(e)}
    >
      {items.map((item) => {
        return (
          <div className="flex items-center" key={item.time_range}>
            <RadioGroup.Item
              className={cx(
                'hover:bg-radix-green3 h-[25px] w-[25px] cursor-default rounded-full shadow-[0_2px_10px] shadow-[var(--blackA7)] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black',
                'text-radix-slate12 bg-white'
              )}
              value={item.time_range}
              id={item.time_range}
            >
              <RadioGroup.Indicator
                className={cx(
                  'after:bg-radix-green11 relative flex h-full w-full items-center justify-center after:block after:h-[11px] after:w-[11px] after:rounded-[50%] after:content-[""]'
                )}
              />
            </RadioGroup.Item>
            <label
              className="pl-[15px] text-lg leading-none"
              htmlFor={item.time_range}
            >
              {item.name} ({item.description})
            </label>
          </div>
        )
      })}
    </RadioGroup.Root>
  </form>
)

export { RadioGroupDemo as RadioGroup }
