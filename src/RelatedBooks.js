import React from 'react'
import ListBooks from './common/components/ListBooks'

import If from './If'





class RelatedBooks extends React.Component {



    render() {


        const { bookId, relatedBooks, setUpdate, objShelfs, bookIdUpdate } = this.props

        return (

            <div className="bookshelf">
                <h2 className="bookshelf-title">Related books you may like</h2>
                <If test={typeof (relatedBooks) !== "undefined" &&  relatedBooks.length > 0}>

                    <div className="bookshelf-books">
                        <ListBooks books={relatedBooks}
                            shelf="allShelfs"
                            setUpdate={setUpdate}
                            allShelfs={objShelfs}
                            bookIdUpdate={bookIdUpdate} />
                    </div>

                </If>
                <If test={typeof (relatedBooks) === "undefined" || relatedBooks.length === 0}>

                    <h3 className="bookshelf-title">Unfortunately, we did not find suggestions for this book</h3>

                </If>


            </div>
        )

    }


}

export default RelatedBooks