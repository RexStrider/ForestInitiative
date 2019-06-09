// import React from 'react';
import React, { Component } from 'react';

class News 
extends Component {
    state = {
        articles: ''
    }

    getArticles = num => {
        fetch(`/api/articles/${num}`)
        .then(response => {
            return response.json();
        })
        .then( data => {
            const articles = data.body.articles;
            this.setState({ articles });
            console.log(articles);
        })
        .catch(error => {
            return error;
        });
    }

    getCivicInfo = address => {
        fetch(`/api/civic_info/${address}`)
        .then(response => {
            return response.json();
        })
        .then( data => {
            const civicInfo = data.body;
            // this.setState({ civicInfo });
            console.log(civicInfo);
        })
        .catch(error => {
            return error;
        })
    }

    async componentDidMount() {
        this.getArticles();
        // this.getCivicInfo('Oakland CA');

        // console.log(civ);
    }

    render() { 
        return (
            <div className='row justify-content-md-center mt-5 text-white text-center'>
            <div className='col-md-6 rounded-lg mt-5 p-3 m-4 text-dark' style={{ backgroundColor: `rgba(255,255,255,.8)` }}>
                  <h1 className='border-bottom border-dark mb-3 pb-2'>News!</h1>
            </div>
        </div>
        );
    }
}
 
export default News;

// const News = () => {

    

//     return (
//         <div className='row justify-content-md-center mt-5 text-white text-center'>
//             <div className='col-md-6 border border-white rounded-lg mt-5 h1'>
//                   News!
//             </div>
//         </div>
//     )
// }

// export default News;