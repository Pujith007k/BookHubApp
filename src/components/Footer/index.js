import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footerContainer">
    <div className="footerIcons">
      <FaGoogle className="googleIcon" />
      <FaTwitter className="twitterIcon" />
      <FaInstagram className="instagramIcon" />
      <FaYoutube className="youtubeIcon" />
    </div>
    <p className="footerParagraph">Contact Us</p>
  </div>
)

export default Footer
