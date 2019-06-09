import React from 'react';

const Home = () => {
    return (
        <div className='row justify-content-md-center mt-5 text-dark text-center'>
            <div className='col-md-6 border border-white rounded-lg m-3 mt-5' style={{ backgroundColor: `rgba(255,255,255,.8)` }}>
                <h1 className='h1'>Welcome to the</h1>
                <h1 className='h1 border-bottom border-dark mb-4'><strong>Forest Intiative!</strong></h1>

                <h2 className=''>Who are we?</h2>
                <p className='text-left mb-4'>The Wilderness Society is the leading American conservation organization working to
protect the nation’s shared wildlands. Since 1935, The Wilderness Society has led the
effort to permanently protect nearly 110 million acres of wilderness in 44 states.</p>

                <h2 className=''>What are our goals with the Forest Intiative?</h2>

                <h3 className='text-left'>#1: Defend the Roadless Rule</h3>
                <p className='text-left'>Inventoried Roadless Areas are wild, undeveloped places on our national forests that
are protected under a law called the 2001 Roadless Area Conservation Rule, better

known as the Roadless Rule. The Roadless Rule protects 58 million acres of these wild,
road-free forested areas from harmful logging, road building and other development.</p>
                <p className='text-left'>The Trump administration and special interest groups are pushing to carve loopholes
into the law, intending to open up our wildest publicly-owned forests to harmful logging,
road-building, and other development. If successful, they could establish state-by-state
Roadless Rule exemptions that will irreparably damage remote, undeveloped forests
across the U.S.</p>

                <h3 className='text-left'>#2: Proper Forest Planning</h3>
                <p className='text-left'>One of the best ways to protect our national forests involves shaping the U.S. Forest
Service’s management plans that decide a national forest’s future for 15 or more years.
These forest management plans determine, up front, where destructive activities like
harmful logging, pipelines, and roads will be prohibited and where wildlife, water, and
wildlands will be protected.</p>
                <p className='text-left'>National forests across the country are actively developing new forest management
plans. In these forest plans, the U.S. Forest Service decides what to protect and what
will be made available to harmful development.</p>
            </div>
        </div>
    )
}

export default Home;