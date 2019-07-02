// import React from 'react';
import React, { Component } from 'react';

class News
    extends Component {
    state = {
        articles: []
    }

    getArticles = num => {
        fetch(`/api/articles/${num}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const articles = data.body.articles;
                this.setState({ articles });
                console.log(articles);
            })
            .catch(error => {
                return error;
            });
    }

    // getCivicInfo = address => {
    //     fetch(`/api/civic_info/${address}`)
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then( data => {
    //         const civicInfo = data.body;
    //         this.setState({ civicInfo });
    //         console.log(civicInfo);
    //     })
    //     .catch(error => {
    //         return error;
    //     })
    // }

    async componentDidMount() {
        await this.getArticles(3);

    }

    render() {
        return (
            <div className='row justify-content-md-center mt-5 text-white text-center'>
                <div className='col-md-6 rounded-lg mt-5 p-3 m-4 text-dark'
                     style={{ backgroundColor: `rgba(255,255,255,.8)` }}>

                    <h1 className='border-bottom border-dark mb-3 pb-2'>
                        Learn about the State of the Wild!
                    </h1>

                    {this.state.articles.map(article => {
                        return (
                            <div className='card'>
                                <div className='card-body'>
                                    <h4 className='card-title'>
                                        {article.title}
                                    </h4>
                                    <p className='card-subtitle mb-2'>
                                        by {article.author}
                                    </p>
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
        );
    }
}

export default News;