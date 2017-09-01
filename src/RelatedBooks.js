import React from 'react'
import ListBooks from './common/components/ListBooks'





class RelatedBooks extends React.Component {

  

    render() {

        //const { booksRelated } = this.state
        const { bookId, relatedBooks, setUpdate, objShelfs, bookIdUpdate } = this.props

        // let relatedBooks = window.localStorage.getItem('relatedBooks') || '{}';



        // relatedBooks = JSON.parse(relatedBooks)
        //console.log("booksRelated: " + booksRelated.length)


        // console.log("relatedBookId: " + relatedBookId)

          let newBooksRelated = []
          console.log("relatedBookId fora: " + bookId)
          if (relatedBooks.length > 0) {
              console.log("relatedBookId: " + bookId)
              newBooksRelated = relatedBooks.filter(rb => rb.relatedBookId === bookId)
          }  






        //console.log(relatedBooks.length)
        return (

            <div className="bookshelf">
                <h2 className="bookshelf-title">Related books you may like</h2>
                <div className="bookshelf-books">
                    <ListBooks books={relatedBooks}
                        shelf="allShelfs"
                        setUpdate={setUpdate}
                        allShelfs={objShelfs}
                        bookIdUpdate={bookIdUpdate} />
                </div>
            </div>

            /*  <ListBooks books={booksRelated}
                 shelf="allShelfs"
                 setUpdate={setUpdate}
                 allShelfs={objShelfs}
                 bookIdUpdate={bookIdUpdate} /> */
        )

    }


}

export default RelatedBooks