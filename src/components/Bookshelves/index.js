import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import BookItems from '../BookItems'

import './index.css'

const apiStatusShelvesConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noBooks: 'NO_BOOKS',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    totalBooks: [],
    input: '',
    bookShelf: bookshelvesList[0].value,
    apiStatus: apiStatusShelvesConstants.initial,
  }

  componentDidMount() {
    this.getTotalBooksList()
  }

  onGetAgainApi = () => {
    this.getTotalBooksList()
  }

  onResettoGetApi = () => {
    this.getTotalBooksList()
  }

  onChangeInput = event => {
    this.setState({input: event.target.value})
  }

  onBookShelf = event => {
    this.setState({bookShelf: event.target.value})
  }

  getTotalBooksList = async () => {
    this.setState({
      apiStatus: apiStatusShelvesConstants.inProgress,
    })
    const {input, bookShelf} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookShelf}&search=${input}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      if (data.books === []) {
        this.setState({
          apiStatus: apiStatusShelvesConstants.noBooks,
        })
      }
      const updatedData = data.books.map(eachItem => ({
        authorName: eachItem.author_name,
        coverPic: eachItem.cover_pic,
        id: eachItem.id,
        rating: eachItem.rating,
        readStatus: eachItem.read_status,
        title: eachItem.title,
      }))
      this.setState({
        totalBooks: updatedData,
        apiStatus: apiStatusShelvesConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusShelvesConstants.failure,
      })
    }
  }

  renderNoBooksview = () => {
    const {input} = this.state
    return (
      <div className="nobooksView">
        <img
          className="noBooksImage"
          src="https://res.cloudinary.com/dbvonytlq/image/upload/v1707465095/Group_1px_gyhi61.png"
          alt="no books"
        />
        <p className="noBooksParagraph">
          Your search for {input} did not find any matches.
        </p>
      </div>
    )
  }

  renderShelvesLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderShelvesFailureView = () => (
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

  renderShelvesSuccessView = () => {
    const {totalBooks} = this.state
    return (
      <>
        <ul className="unOrderedList">
          {totalBooks.map(eachItem => (
            <BookItems bookDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  renderShelvesSwitchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusShelvesConstants.success:
        return this.renderShelvesSuccessView()
      case apiStatusShelvesConstants.failure:
        return this.renderShelvesFailureView()
      case apiStatusShelvesConstants.inProgress:
        return this.renderShelvesLoaderView()
      case apiStatusShelvesConstants.noBooks:
        return this.renderNoBooksview()
      default:
        return null
    }
  }

  render() {
    const {input} = this.state
    return (
      <>
        <Header />
        <div className="bookshelvesbgContainer">
          <div className="sideBarContainer">
            <h1 className="siderBarHeading">Bookshelves</h1>
            {bookshelvesList.map(eachItem => (
              <button
                type="button"
                className="sideBarParagraph"
                value={eachItem.value}
                onChange={this.onBookShelf}
                key={eachItem.id}
              >
                {eachItem.label}
              </button>
            ))}
          </div>
          <div className="allbooksContainer">
            <div className="allBooksHeader">
              <h4 className="allbooksHeading">All Books</h4>
              <div className="searchContainer">
                <input
                  type="search"
                  className="searchBar"
                  placeholder="search"
                  value={input}
                  onChange={this.onChangeInput}
                />
                <button
                  type="button"
                  className="IconButton"
                  onClick={this.onGetAgainApi}
                  testid="searchButton"
                >
                  <BsSearch className="searchIcon" />
                </button>
              </div>
            </div>
            {this.renderShelvesSwitchCase()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}
export default Bookshelves
