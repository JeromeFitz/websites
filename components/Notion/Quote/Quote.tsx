import cx from 'clsx'
import _map from 'lodash/map'

const quotes = [
  {
    author: 'Pittsburgh Magazine’s Sean Collier',
    content:
      'If there were a Tony for off-Broadway, short-form sketch musicals, this would win it... among the funniest things I’ve ever seen.',
    id: 1,
  },
  {
    author: 'Broadway World',
    content:
      '(S)hout-out for comic excellence in the cast goes to Jerome Fitzgerald.',
    id: 2,
  },
  {
    author: 'Pittsburgh City Paper',
    content:
      'There’s a part in Bubble Boy: The Musical where my husband laughed so hard that he started to choke (don’t worry, he’s fine).',
    id: 3,
  },
]

const Quote = () => {
  return (
    <>
      <div className={cx('_quoteContainer')}>
        {/* <div className={cx('_heading', '')}>
          <p className={cx('font-medium text-2xl')}>
            Quotes{' '}
            <span className="text-base italic">
              (from people with exquisite taste)
            </span>
          </p>
        </div> */}
        <h3
          className={cx(
            'flex flex-row items-center',
            'gradient text-2xl md:text-4xl',
            'leading-tight md:leading-tight',
            'mt-8 mb-3',
            '_text-black dark:_text-white'
          )}
        >
          Quotes
        </h3>
        <div className={cx('spacer ')} />
        <div className={cx('spacer _bg-black dark:_bg-white')} />
        <p className={cx('_text-black dark:_text-white')}>
          (From people with exquisite taste.)
        </p>
        <div
          className={cx('_quotes', 'grid gap-8 mb-10 ')}
          style={{ gridTemplateColumns: 'repeat(2,1fr)' }}
        >
          {_map(quotes, (quote, quoteIndex) => {
            return (
              <div
                className={cx(
                  'pt-3 h-1/3 first:col-span-2',
                  'first:rounded-xl first:h-full first:w-full first:p-4 first:mt-8',
                  'first:bg-gray-200 dark:first:bg-gray-800',
                  'first:border first:border-indigo-700 dark:first:border-pink-300',
                  'first:bg-pink-300 dark:first:bg-indigo-700'
                )}
                key={`quote-${quoteIndex}`}
                style={{
                  pageBreakInside: 'avoid',
                  breakInside: 'avoid',
                }}
              >
                <blockquote className={cx('')}>
                  <p
                    className={cx(
                      'before:text-xl before:mb-0 before:leading-3',
                      "before:content-['“']",
                      'after:text-xl after:mb-0 after:leading-3',
                      "after:content-['”']"
                    )}
                  >
                    {quote.content}
                  </p>
                </blockquote>
                <p
                  className={cx(
                    'text-md font-bold',
                    "before:content-[''] before:w-10 before:h-px before:block before:my-6 before:opacity-40 before:bg-secondary",
                    'leading-normal prose'
                  )}
                >
                  {quote.author}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Quote
