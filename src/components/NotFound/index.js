import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notFoundContainer">
    <img
      className="notFoundImage"
      src="https://res.cloudinary.com/dbvonytlq/image/upload/v1707462980/Group_7484_1px_av9fpj.png"
      alt="not found"
    />
    <h1 className="notFoundHeading">Page Not Found</h1>
    <p className="notFoundParagraph">
      we are sorry, the page you requested could not be found,
    </p>
    <p className="notFoundParagraph">Please go back to the homepage.</p>
    <Link to="/" className="navLink">
      <button type="button" className="notFoundButton">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
