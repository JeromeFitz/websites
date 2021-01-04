import SplitText from '~components/SplitText'

const Header = ({ description, title }) => (
  <>
    <h1 aria-label={title}>
      <SplitText splitBy="letter" text={title} />
    </h1>
    <div className="mt-2 mb-4 font-medium text-2xl leading-tight md:max-w-3xl">
      <p className="lead">{description}</p>
    </div>
  </>
)

export default Header
