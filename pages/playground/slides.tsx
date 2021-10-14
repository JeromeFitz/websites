// https://www.ju.st/
import cx from 'clsx'
import dynamic from 'next/dynamic'

import Layout from '~components/Layout'

const Breadcrumb = dynamic(() => import('~components/Notion/Breadcrumb'), {})

const Slides = () => {
  return (
    <>
      <Layout>
        <Breadcrumb isIndex={true} title={'Slides'} />
        <div
          id="scrollpane"
          className={cx(
            'scrollOuter',
            'pointer-events-none block h-full w-[calc(100%+20px)]',
            't-0 l-0 absolute overflow-y-scroll'
          )}
        >
          <div
            className={cx(
              'scrollContent',
              'block w-[calc(100%-20px)] pointer-events-auto'
            )}
          >
            <div className="page">
              <div className={cx('bloks', 'max-w-full')}>
                <div className={cx('blok', 'relative')}>
                  <section
                    className={cx('Bloksection HP1 light', 'relative min-h-[100vh]')}
                    style={{ height: '640vh' }}
                  >
                    <div
                      className={cx(
                        '_sticky',
                        'pointer-events-none absolute l-0 t-0 w-full h-full'
                      )}
                    >
                      <div
                        className={cx(
                          'stickyInner',
                          'overflow-hidden sticky l-0 t-0 w-full h-[100vh]'
                        )}
                      >
                        <div
                          className={cx(
                            'content',
                            't-0 l-0 w-full h-full',
                            // 'absolute',
                            'relative'
                          )}
                        >
                          <div className={cx('slides')}>
                            <div
                              className={cx(
                                'bg slide-0',
                                'absolute t-0 l-0 w-full h-full overflow-hidden',
                                'opacity-0'
                              )}
                              style={{
                                visibility: 'visible',
                                opacity: '1',
                                transform: 'translateX(0px) translateY(-4px)',
                              }}
                            >
                              <div
                                className={cx(
                                  'action-asset',
                                  'absolute t-0 l-0 w-full h-full opacity-0 pointer-events-none'
                                )}
                              ></div>
                              <picture></picture>
                              <div className={cx('grid')}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Slides
