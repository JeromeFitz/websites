const Header = ({ description, title }) => (
  <>
    <h1>{title}</h1>
    <div className="mt-2 mb-4 text-gray-900 dark:text-gray-100">
      <p className="my-4 mt-0">{description}</p>
    </div>
  </>
)

export default Header
