import React from 'react'
import ListBooks from './common/components/ListBooks'





class RelatedBooks extends React.Component {

  

    render() {

       
        const { bookId, relatedBooks, setUpdate, objShelfs, bookIdUpdate } = this.props 
        
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
        )

    }


}

export default RelatedBooks