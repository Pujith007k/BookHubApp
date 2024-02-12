import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusBookConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {book: {}, apiStatus: apiStatusBookConstants.initial}

  componentDidMount() {
    this.getBookItemDetails()
  }

  onResettoGetApi = () => {
    this.getBookItemDetails()
  }

  getBookItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusBookConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const bookapi = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(bookapi, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        id: data.book_details.id,
        coverPic: data.book_details.cover_pic,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      this.setState({
        book: updatedData,
        apiStatus: apiStatusBookConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusBookConstants.failure,
      })
    }
  }

  renderBookLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBookFailureView = () => (
    <div className="failureContainer">
      <img
        className="failImage"
        src="https://res.cloudinary.com/dbvonytlq/image/upload/v1707464501/Group_7522_1px_xmvasn.png"
        alt="failure view"
      />
      <p className="failParagraph">Something went wrong, Please try again.</p>
      <button
        className="failButton"
        type="button"
        onClick={this.onResettoGetApi}
      >
        Try Again
      </button>
    </div>
  )

  renderBookSuccessView = () => {
    const {book} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      id,
      coverPic,
      rating,
      readStatus,
      title,
    } = book
    console.log(id)
    return (
      <>
        <div className="bookDetailsBgContainer">
          <div className="detailsofBookContainer">
            <div className="detailsContainer">
              <img className="bookItemImage" src={coverPic} alt={title} />
              <div className="bookItemDetails">
                <h1 className="bookItemHeading">{title}</h1>
                <p className="bookItemParagraph">{authorName}</p>
                <div className="ratingItemContainer">
                  <p className="ratingItemParagraph">Avg Rating</p>
                  <BsFillStarFill className="ratingItemIcon" />
                  <p className="ratingItem">{rating}</p>
                </div>
                <p className="statusItemParagraph">
                  Status: <span className="statusItem">{readStatus}</span>
                </p>
              </div>
            </div>
            <hr className="itemLine" />
            <h3 className="itemAuthorHeading">About Author</h3>
            <p className="itemAuthorParagraph">{aboutAuthor}</p>
            <h3 className="itemAboutBookheading">About Book</h3>
            <p className="itemAboutBookParagraph">{aboutBook}</p>
          </div>
        </div>
      </>
    )
  }

  renderBookSwitchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusBookConstants.success:
        return this.renderBookSuccessView()
      case apiStatusBookConstants.failure:
        return this.renderBookFailureView()
      case apiStatusBookConstants.inProgress:
        return this.renderBookLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderBookSwitchCase()}
        <Footer />
      </>
    )
  }
}
export default BookDetails
