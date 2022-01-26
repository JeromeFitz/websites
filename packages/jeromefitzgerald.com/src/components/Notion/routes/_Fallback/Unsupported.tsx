import { Box } from '@jeromefitz/design-system/components'

const Unsupported = ({ ...props }) => {
  console.dir(`> Unsupported`)
  console.dir(props)
  return (
    <Box>
      <h1>
        Unsupported: {props.routerNode} ({props.dataType})
      </h1>
    </Box>
  )
}

export default Unsupported
