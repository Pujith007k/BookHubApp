import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="navBar">
      <Link to="/" className="navLink">
        <img
          className="navbarLogo"
          src="https://res.cloudinary.com/dbvonytlq/image/upload/v1707368077/Group_7731_1x_xx4e2k.png"
          alt="login website logo"
        />
      </Link>
      <div className="navBarList">
        <Link to="/" className="navLink">
          <p className="navParagraph">Home</p>
        </Link>
        <Link to="/shelf" className="navLink">
          <p className="navParagraph">Bookshelves</p>
        </Link>
        <button type="button" className="navBarLogout" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
