import React, { Component } from 'react';
import { getMovies } from '../services/movieService';
import Like from './common/like';
import Pagination from './common/pagination';

class Movies extends Component {
    state = { 
        movies: getMovies(),
        pageSize: 5
    };

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    handlePageChange = (page) =>{
        console.log(page);
    }

    render() { 
        const count = this.state.movies.length;

        if (count === 0) 
            return <h4>Movie list is empty!</h4>

        return (
            <React.Fragment>
                <h4>Showing the list of {count} movies!</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rating</th>
                            <th>Liked</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.movies.map(movie => 
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <Like 
                                    liked={movie.liked}
                                    onClick={() => this.handleLike(movie)}
                                />
                            </td>
                            <td>
                                <button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">DELETE</button>
                            </td>
                        </tr>)}
                        
                    </tbody>
                </table>
                <Pagination 
                    itemsCount={this.count} 
                    pageSize={this.state.pageSize}
                    onPageChange={this.handlePageChange}
                />
            </React.Fragment>
        );
    }
}
 
export default Movies;