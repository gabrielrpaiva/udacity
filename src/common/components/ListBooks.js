import React, { Component } from 'react';
import If from '../../If';
import RelatedBooks from '../../RelatedBooks'
import * as BooksAPI from '../../util/BooksAPI'


class ListBooks extends Component {


    state = {
        booksRelated: []
    }


    componentDidMount() {

        let shelRead = window.localStorage.getItem('ctrlDidMount')

        if (shelRead === "read") {

            window.localStorage.setItem('ctrlRelatedBooks', 0)
            console.log("componentWillMount")
            let books = window.localStorage.getItem('booksInShelfs') || '{}';
            books = JSON.parse(books)

            books = books.filter((book) => book.shelf === "read")

            //let currentBook = []
            books.map((bookRead, index) => {

                let booksSearched
                // console.log("verifica qual id:" + bookRead.id + "index: " + index)


                let arrayTitle = bookRead.title.split(' ')

                arrayTitle.map(desc => {

                    if (desc.length > 3) {

                        if (typeof (booksSearched) === "undefined" || booksSearched.length < 3) {

                            BooksAPI.search(desc, 20).then(booksReturn => {

                                let booksInShelfs = window.localStorage.getItem('booksInShelfs') || '{}';

                                booksInShelfs = JSON.parse(booksInShelfs)
                                let newCurrentBook = []
                                if (booksReturn.length > 3) {


                                    booksReturn.map((b) => {


                                        if (newCurrentBook.length < 3) {

                                            let bookShelf = booksInShelfs.filter(bs => bs.id === b.id)

                                            if (bookShelf.length === 0) {
                                                //console.log("insrido: " + bookRead.id)
                                                b.relatedBookId = bookRead.id
                                                newCurrentBook.push(b)
                                            }

                                        }
                                    })

                                    //    console.log("verifica : " + bookRead.id + " Qtd: " + newCurrentBook.length)



                                }
                                else {

                                    newCurrentBook = booksReturn

                                }


                                if (typeof (booksSearched) !== "undefined" && booksSearched.length > 0) {
                                    booksSearched = booksSearched.concat(newCurrentBook)
                                }
                                else {

                                    booksSearched = newCurrentBook
                                }


                                //console.log("booksSearched.length: " + booksSearched.length)

                                if (typeof (booksSearched) !== "undefined" && booksSearched.length === 3) {

                                    let ctrlRelatedBooks = window.localStorage.getItem('ctrlRelatedBooks');
                                    ctrlRelatedBooks = JSON.parse(ctrlRelatedBooks)
                                    // console.log("books.length:" + books.length)
                                    ctrlRelatedBooks += 1;
                                    //console.log("ctrlRelatedBooks: " + ctrlRelatedBooks)
                                    if (ctrlRelatedBooks == books.length) {
                                        console.log("vai setar estado: " + booksSearched.length)
                                        this.setState({ booksRelated: booksSearched })

                                    }

                                    window.localStorage.setItem('ctrlRelatedBooks', ctrlRelatedBooks);



                                    // if (relatedBooks.length > 0) {

                                    //    relatedBooks = JSON.parse(relatedBooks)
                                    //     booksSearched = booksSearched.concat(relatedBooks)
                                    //}

                                    //window.localStorage.setItem('relatedBooks', JSON.stringify(booksSearched));
                                    // console.log("booksSearched.length: " + booksSearched.length)


                                }
                            })

                            //console.log("depois: " + MySerBooks)
                        }
                    }
                })
            })

        }


    }


    render() {

        const { booksRelated } = this.state
      
        const { books, shelf, setUpdate, allShelfs, bookIdUpdate } = this.props
        console.log("booksRelated: " + booksRelated.length + " shelf :" + shelf)
        let showingBooks = {}

        window.localStorage.setItem('ctrlDidMount', shelf)


        if (shelf === "allShelfs") {

            showingBooks = books

        } else {

            if (typeof (books) !== "undefined" && books.length > 0) {

                if (shelf === "none") {

                    showingBooks = books.filter((book) => typeof (book.shelf) === "undefined")

                }
                else {

                    showingBooks = books.filter((book) => book.shelf === shelf)

                }

            }

        }


        let shelfOptions = Object.keys(allShelfs).map(function (key) {

            if (key === "moveto") {

                return <option key={key} value={key} disabled>{allShelfs[key]}</option>

            } else {

                return <option key={key} value={key}>{allShelfs[key]}</option>
            }

        });

        let shelfBooks

        if (typeof (showingBooks) !== "undefined" && showingBooks.length > 0) {

            shelfBooks = showingBooks.map(function (book) {

                let classToLoad = "book-shelf-changer"

                if (bookIdUpdate === book.id) { classToLoad = "book-shelf-on-changer" }





                return <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
                            <If test={book.shelf === 'read'}>
                                <div>

                                    <a className="book-shelf-read" href="#popup1"></a>

                                </div>
                            </If>

                            <div className={classToLoad}>
                                <select value={book.shelf} onChange={(event) => setUpdate(book, event.target.value)}>
                                    {shelfOptions}
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                        <div className="book-authors">{book.shelf}</div>
                        <If test={book.shelf === 'read'}>
                            <div id="popup1" className="overlay">
                                <div className="popup">
                                    <a className="close" href="">&times;</a>
                                    <RelatedBooks bookId={book.id} relatedBooks={booksRelated}
                                        setUpdate={setUpdate}
                                        objShelfs={allShelfs}
                                        bookIdUpdate={bookIdUpdate} />
                                </div>
                            </div>


                        </If>



                    </div>
                </li>




            });
        }

        return (
            <ol className="books-grid">
                {shelfBooks}
            </ol>
        )
    }


}

export default ListBooks