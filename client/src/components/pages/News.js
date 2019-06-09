// import React from 'react';
import React, { Component } from 'react';
import axios from 'axios';

class News 
extends Component {
    state = {  }

    getArticles = num => {
        axios.get(`/api/articles/${num}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
    }

    async componentDidMount() {
        const res = this.getArticles(1);

        console.log(res);
    }

    render() { 
        return (
            <div className='row justify-content-md-center mt-5 text-white text-center'>
            <div className='col-md-6 border border-white rounded-lg mt-5 h1'>
                  News!
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