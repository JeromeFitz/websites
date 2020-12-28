/**
 *
 * @todo Make this dynamic
 */
// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
const lpad = (val: any) => ('00' + val).substr(-2)

export default lpad
