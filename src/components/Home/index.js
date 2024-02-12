import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusHomeConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {booksList: [], apiStatus: apiStatusHomeConstants.initial}

  componentDidMount() {
    this.getBooksList()
  }

  onResettoGetApi = () => {
    this.getBooksList()
  }

  getBooksList = async () => {
    this.setState({
      apiStatus: apiStatusHomeConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.books.map(eachBook => ({
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        id: eachBook.id,
        title: eachBook.title,
      }))
      console.log(updatedData)
      this.setState({
        booksList: updatedData,
        apiStatus: apiStatusHomeConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusHomeConstants.failure,
      })
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
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

  renderSliderSuccessView = () => {
    const {booksList} = this.state
    console.log(booksList)
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <div className="slick-container">
        <Slider {...settings}>
          {booksList.map(eachBook => {
            const {id, authorName, coverPic, title} = eachBook
            return (
              <div className="slickItem" key={id}>
                <img className="bookimage" src={coverPic} alt={title} />
                <h4 className="bookTitle">{title}</h4>
                <p className="bookAuthor">{authorName}</p>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  renderHomeSwitchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusHomeConstants.success:
        return this.renderSliderSuccessView()
      case apiStatusHomeConstants.failure:
        return this.renderFailureView()
      case apiStatusHomeConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="homeContainer">
          <Header />
          <h1 className="homeHeading">Find Your Next Favorite Books?</h1>
          <p className="homeParagraph">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <div className="BooksSliderContainer">
            <div className="slickHeadingDetails">
              <h3 className="topRatedHeading">Top Rated Books</h3>
              <Link to="/shelf" className="navLink">
                <button
                  type="button"
                  className="findBooksButt"
                  onClick={this.onRouteBookShelves}
                >
                  Find Books
                </button>
              </Link>
            </div>
            {this.renderHomeSwitchCase()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
