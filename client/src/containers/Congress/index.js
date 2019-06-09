import React, { Component } from 'react';
import './form.css';

class Form extends Component {

    render() {
        return (
            <div className='row justify-content-md-center mt-5 mb-5 pb-5 pt-5'>
                <div className='col-md-7 m-3 mt-5'>

                    <form className=" rounded-lg p-4" style={{ backgroundColor: `rgba(255,255,255,.8)` }}>
                        <h1 className='text-center'>Email Our</h1>
                        <h1 className='text-center mb-2 border-bottom border-dark pb-1'>Secratary of Agriculture</h1>
                        <h4 className='p-4'>Save our wild forests! Tell U.S. Secretary of Agriculture Sonny Perdue to keep the 2001
Roadless Rule intact in Alaska, Utah, and across the country. Want to do more? Tell
your member of Congress to cosponsor the Roadless Area Conservation Act of 2019 to
permanently protect our roadless forests.</h4>

                        <p>Name<br></br>
                            <input
                                type='text'
                                className="border border-secondary rounded-sm"
                                id="nameInput"
                                name="name"
                                placeholder="Name"
                                required
                            /></p>
                        <p>E-mail<br></br>
                            <input
                                type='email'
                                className="border border-secondary rounded-sm"
                                id="emailInput"
                                name="email"
                                placeholder="E-mail"
                                required
                            /></p>
                        <p>Message to Sonny Purdue  <br></br>
                            <textarea
                                type='text'
                                className="border border-secondary rounded-sm"
                                id="productInput"
                                name="product"
                                placeholder="Message to the Secratary of Agriculture"
                                required
                            /></p>


                        {/* <div className=" row justify-content-sm-center mt-5"> */}

                        {/* <div className='col-sm-4'>
                                <button className=" border btn btn-block btn-light rounded-sm" onClick={this.handleCancel}>
                                    Cancel
                                </button>
                            </div> */}

                        <div className='col-sm-12'>
                            <button className='mt-4 border btn btn-block btn-dark rounded-sm' type="submit" value="Submit">
                                Submit
                                </button>
                        </div>

                        {/* </div> */}
                    </form>

                </div>
            </div>
        );
    }
}


export default Form;