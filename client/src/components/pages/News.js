// import React from 'react';
import React, { Component } from 'react';

class News
    extends Component {
    state = {
        articles: [],
        totalResults: 0,
        currentPage: -1
    }

    getArticles = currentPage => {
        fetch(`/api/articles/${currentPage}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const articles = data.body.articles;
                const totalResults = data.body.totalResults;
                this.setState({ articles, totalResults, currentPage });
            })
            .catch(error => {
                return error;
            });
    }

    async componentDidMount() {
        await this.getArticles(1);
    }

    render() {
        console.log(this.state);
        const pages = this.state.articles.length > 0
                    ? Math.ceil(this.state.totalResults / this.state.articles.length)
                    : -1
        return (
            <div>
                <div className='row justify-content-md-center mt-5 text-white text-center'>
                    <div className='col-md-6 rounded-lg mt-5 p-3 m-4 text-dark'
                        style={{ backgroundColor: `rgba(255,255,255,.8)` }}>

                        <h1 className='border-bottom border-dark mb-3 pb-2'>
                            Learn about the State of the Wild!
                        </h1>

                        {this.state.articles.map(article => {
                            return (
                                <div className='card' key={`${article.title}, ${article.source.name}`}>
                                    <div className='card-body'>
                                        <h4 className='card-title'>
                                            {article.title}
                                        </h4>
                                        { article.author ?
                                            <p className='card-subtitle mb-2'>by {article.author}</p>
                                            : <p className='card-subtitle mb-2'>author not found</p> }
                                        <p className='card-text'>
                                            {article.description}
                                        </p>
                                        <a href={article.url}
                                        className='card-link'>
                                            SOURCE: {article.source.name}
                                        </a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='row justify-content-md-center'>
                    <div className='col-md-6 rounded-lg mt-5 p-3 m-4 text-dark'>
                    
                        {/* <h1>{ pages }</h1> */}

                        <nav>
                            <ul className="pagination pagination-lg justify-content-md-center">
                                <li className={this.state.currentPage <= 1 ? "page-item disabled" : "page-item"}>
                                    <button className="page-link" onClick={() => this.previousPage(this.state.currentPage)}>Previous</button>
                                </li>
                                { this.renderPagination(pages) }
                                <li className={this.state.currentPage >= 5 || this.state.currentPage >= pages ? "page-item disabled" : "page-item"}>
                                    <button className="page-link" onClick={() => this.nextPage(this.state.currentPage, pages)}>Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }

    renderPagination(pages) {
        const components=[];
        // civic info api collects up to 5 pages worth of results
        for (let i=0; i < pages && i < 5; i++) {
            components.push(this.renderPageItem(i+1));
        }
        return components;
    }

    renderPageItem(pageNum) {
        return (
            <li className={pageNum === this.state.currentPage ? "page-item active" : "page-item"} key={`page-${pageNum}`}>
                <button className="page-link" onClick={() => this.getArticles(pageNum)}>
                    { pageNum }
                </button>
            </li>
        )
    }

    nextPage(currentPage, pages) {
        if (currentPage > 0 && currentPage < pages && currentPage < 5) {
            this.getArticles(currentPage+1);
        }
    }

    previousPage(currentPage) {
        if (currentPage > 1) {
            this.getArticles(currentPage-1);
        }
    }
}

export default News;