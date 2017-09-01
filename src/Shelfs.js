import React from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './common/components/ListBooks'



class Shelfs extends React.Component {


    
 


    render() {
        const { books, setUpdate, objShelfs, bookIdUpdate } = this.props

        let showingShelfs = Object.keys(objShelfs)
            .filter(shelf => shelf !== "none" && shelf !== "moveto")
            .reduce((obj, shelf) => {
                obj[shelf] = objShelfs[shelf];
                return obj;
            }, {});



        let shelfOptions = Object.keys(showingShelfs).map(function (key) {
            return <div key={key} className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">{objShelfs[key]}</h2>
                        <div className="bookshelf-books">
                            <ListBooks books={books} shelf={key}
                                title={objShelfs[key]}
                                setUpdate={setUpdate}
                                allShelfs={objShelfs}
                                bookIdUpdate={bookIdUpdate} />
                        </div>
                    </div>
                </div>
            </div>
        });

        return (

            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">''
                        <h1>MyReads</h1>
                    </div>
                    {shelfOptions}
                    <Link
                        to='/search'
                        className='open-search'>
                    </Link>
                </div>
            </div >
        )
    }
}

export default Shelfs