// swr-esque
import _isArray from 'lodash/isArray'

export interface Unsubscribe {
  unsubscribe(): void
}

type Callback = (data?: any) => void

const pubsub = () => {
  const subscribers: Record<string, Callback[]> = {}

  const publish = (eventName: string, data?: any) => {
    if (!_isArray(subscribers[eventName])) {
      return
    }

    subscribers[eventName].forEach((callback: Callback) => {
      callback(data)
    })
  }

  const subscribe = (eventName: string, callback: Callback): Unsubscribe => {
    if (!_isArray(subscribers[eventName])) {
      subscribers[eventName] = []
    }
    subscribers[eventName].push(callback)

    const index = subscribers[eventName].length - 1

    return {
      unsubscribe(): void {
        subscribers[eventName].splice(index, 1)
      },
    }
  }

  return {
    publish,
    subscribe,
  }
}

export default pubsub()

/**
 * @example
 */
/*
// init content
//
import pubsub, { Unsubscribe } from '../lib/pubsub';

  useEffect(() => {
    const unsubscribe: Unsubscribe = pubsub.subscribe('fetchXyz', () => props.fetchXyz());

    return () => {
      unsubscribe.unsubscribe();
    };
  }, [props.fetchXyz]);
*/

/*
// somewhere else
//
import pubsub from '../pubsub';

pubsub.publish('fetchCart');

*/
