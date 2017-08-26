import React, { Component } from 'react';


class ListBooks extends Component {





    render() {
        const { books, shelf, title, allShelfs } = this.props
        let showingBooks

        showingBooks = books.filter((book) => book.shelf === shelf)

       console.log(allShelfs.map.length)



        return (


            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">{title}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {showingBooks.map(book => (
                                    <li key={book.title}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
                                                <div className="book-shelf-changer">
                                                    <select id="selectShelf">
                                                        <option value="none" disabled>Move to...</option>

                                                        {allShelfs.map(shelfs => (

                                                            <option value={myRetun =>  Object.getOwnPropertyValues(shelfs)}>{shelfs}</option>
                                                        ))}

                                                        
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{book.authors}</div>
                                            <div className="book-authors">{book.shelf}</div>
                                        </div>
                                    </li>
                                ))}


                            </ol>

                        </div>

                    </div>
                </div>
            </div>



        )

    }


}

export default ListBooks