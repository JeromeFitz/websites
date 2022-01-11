import get from 'lodash/get'
import last from 'lodash/last'
import { useMemo, useCallback, useRef } from 'react'
import type { SWRInfiniteConfiguration } from 'swr/infinite'
import useSWRInfinite from 'swr/infinite'

type PageKeyMaker<Page, Key extends any[]> = (
  index: number,
  previousPageData?: Page
  /**
   * Mutable ref object. Set this to `true` before the request and `false` afterwards if the request is fetching more.
   *
   * For example, if the request has a `lastDocId`, it should set it to `true` before fetching.
   *
   * This prevents multiple page increases at once.
   */
) => Key

export type UseSWRInfinitePagesConfig<Page extends object> =
  SWRInfiniteConfiguration<Page> & {
    limit?: number
    dataPath: keyof Page | string[]
  }

type PageFetcher<Page, Key extends any[]> = (...params: Key) => Page | Promise<Page>

const useSWRInfinitePages = <
  Page extends object,
  Data,
  /**
   * Path to your list data
   */
  Key extends any[] = any[]
>(
  key: PageKeyMaker<Page, Key>,
  fetcher: PageFetcher<Page, Key>,
  { limit = 20, dataPath: path, ...options }: UseSWRInfinitePagesConfig<Page>
) => {
  const isFetching = useRef(false)
  const dataPath = Array.isArray(path) ? path.join('.') : path

  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite<Page>(
    (index, previousPage) => {
      const previousPageData = get(previousPage, dataPath)
      // we've reached the last page, no more fetching
      if (previousPageData?.length === 0) return null
      // @todo(swr) is this correct?
      // this means we haven't fetched the previous page yet, so don't fetch multiple at once.
      // if (index > 0 && !previousPageData) return null
      if (isFetching.current && index) return null
      if (previousPageData && previousPageData.length < limit) {
        return null
      }

      return key(index, previousPageData)
    },
    async (...key: Key) => {
      let val: Page
      try {
        isFetching.current = true
        val = await fetcher(...key)
        if (isFetching.current) {
          isFetching.current = false
        }
      } catch (e) {
        if (isFetching.current) {
          isFetching.current = false
        }
        throw e
      }

      return val
    },
    { revalidateAll: false, revalidateFirstPage: false, ...options }
  )

  const firstPageData = get(data?.[0], dataPath)
  const lastPage = last(data)
  const lastPageData = get(lastPage, dataPath)
  const canFetchMore = lastPageData?.length && lastPageData.length === limit

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (isValidating && size > 1 && data && typeof data[size - 1] === 'undefined')

  const isRefreshing = isValidating && data?.length === size
  const isEmpty = firstPageData?.length === 0

  const fetchMore = useCallback(() => {
    if (isLoadingMore || isFetching.current) return null

    void setSize((size) => {
      // console.dir('🍔 [useSWRInfinitePages] is fetching more', {
      //   currentPage: size,
      // })
      return size + 1
    })
  }, [isLoadingMore, setSize])

  const flat = useMemo(() => {
    // console.dir(`🍔 [useSWRInfinitePages] flat`)
    // console.dir(data)
    return data
      ?.map((page) => get(page, dataPath) as Data)
      ?.flat(1)
      .filter(Boolean) as
      | (Data extends readonly (infer InnerArr)[] ? InnerArr : Data)[]
      | undefined
  }, [data, dataPath])

  return {
    canFetchMore,
    data: flat,
    error,
    fetchMore,
    isEmpty,
    isFetchingMore: !!isLoadingMore,
    isLoadingInitialData,
    isLoadingMore,
    isRefreshing,
    isValidating,
    lastPage,
    mutate,
    pages: data,
    size,
  }
}

export default useSWRInfinitePages
