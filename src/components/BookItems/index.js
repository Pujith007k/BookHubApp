import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItems = props => {
  const {bookDetails} = props
  const {authorName, coverPic, id, rating, readStatus, title} = bookDetails
  return (
    <Link to={`/books/${id}`} className="item-link">
      <li className="bookList">
        <img className="bookImage" src={coverPic} alt={title} />
        <div className="bookDetails">
          <h4 className="bookHeading">{title}</h4>
          <p className="bookParagraph">{authorName}</p>
          <div className="ratingContainer">
            <p className="ratingParagraph">Avg Rating</p>
            <BsFillStarFill className="ratingIcon" />
            <p className="rating">{rating}</p>
          </div>
          <p className="statusParagraph">
            Status : <span className="status">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookItems
