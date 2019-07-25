import React, { Component } from 'react';

// this component displays the news articles retrieved from the news api
class News extends Component {

    state = {
        // ary of news article results
        articles: [],
        // total results that may be retrieved from the news api
        totalResults: 0,
        // the current page of results
        currentPage: -1
    }

    // retrieves 20 articles, the number of total articles possible,
    // and sets the current page of results
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

    // retrieves articles before rendering news component
    async componentDidMount() {
        await this.getArticles(1);
    }

    // render the news component
    render() {
        // Total pages possible are determined by the total results possible divided by the number of articles returned per page.
        // If no articles are retrieved, return -1 -- this represents that some error occurred that should be handled discreetly.
        const totalPages = this.state.articles.length > 0
                    ? Math.ceil(this.state.totalResults / this.state.articles.length)
                    : -1;
        // When testing the news api, I was only able to return up to 5 pages of results.
        // So I've set the maximum total pages to 5.
        const maxPages=5;

        return (
            <div>
                <div className='row justify-content-md-center mt-5 text-white text-center'>
                    <div className='col-md-6 rounded-lg mt-5 p-3 m-4 text-dark'
                        style={{ backgroundColor: `rgba(255,255,255,.8)` }}>

                        <h1 className='border-bottom border-dark mb-3 pb-2'>
                            Learn about the State of the Wild!
                        </h1>

                        { this.renderPaginationWrapper(this.state.currentPage, totalPages, maxPages) }

                        { this.state.articles.map(article => {
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
                    
                        { this.renderPaginationWrapper(this.state.currentPage, totalPages, maxPages) }

                    </div>
                </div>
            </div>
        );
    }

    // renders the pagination navigation bar
    renderPaginationWrapper(currentPage, totalPages, maxPages) {
        if (currentPage < 0) return null;
        return (
            <div className='row justify-content-md-center'>
                <div className='col-md-6 rounded-lg mt-5 p-3 m-4 text-dark'>
                    <nav>
                        <ul className="pagination pagination-lg justify-content-md-center">
                            <li className={currentPage <= 1 ? "page-item disabled" : "page-item"}>
                                <button className="page-link" onClick={() => this.previousPage(currentPage)}>Previous</button>
                            </li>
                            { this.renderPagination(totalPages, maxPages) }
                            <li className={currentPage >= maxPages || currentPage >= totalPages ? "page-item disabled" : "page-item"}>
                                <button className="page-link" onClick={() => this.nextPage(currentPage, totalPages, maxPages)}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }

    // returns the numbered page items for the pagination navigation bar
    renderPagination(pages, max) {
        const components=[];
        // civic info api collects up to 5 pages worth of results,
        // this limit is set by the constant max pages, which is set when render() is called
        for (let i=0; i < pages && i < max; i++) {
            components.push(this.renderPageItem(i+1));
        }
        return components;
    }

    // creates one numbered page item for the pagination navigation bar
    renderPageItem(pageNum) {
        return (
            <li className={pageNum === this.state.currentPage ? "page-item active" : "page-item"} key={`page-${pageNum}`}>
                <button className="page-link" onClick={() => this.getArticles(pageNum)}>
                    { pageNum }
                </button>
            </li>
        )
    }

    // gets the articles for the next page,
    // returns nothing if we are on the last page
    nextPage(currentPage, totalPages, maxPages) {
        if (currentPage > 0 && currentPage < totalPages && currentPage < maxPages) {
            this.getArticles(currentPage+1);
        }
    }

    // gets the articles for the previous page,
    // returns nothing if we are on the first page
    previousPage(currentPage) {
        if (currentPage > 1) {
            this.getArticles(currentPage-1);
        }
    }
}

export default News;