import SplitText from '~components/SplitText'

const Header = ({ description, title }) => (
  <>
    <h1 aria-label={title} className="h1">
      <SplitText text={title} />
    </h1>
    <div className="mt-2 mb-4">
      <p className="my-4 mt-0">{description}</p>
    </div>
  </>
)

export default Header
