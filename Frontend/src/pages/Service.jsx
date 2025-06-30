import React from 'react'
import { useAuth } from '../store/Auth'

function Service() {

  const { services } = useAuth()
  return (
    <section className='section-services'>
      <div className='container'>
        <h1 className='main-heading'> Services </h1>
      </div>

      <div className="container grid grid-three-cols">
        {services.map((curElem, index) => {
          const { price, description, provider, service , image } = curElem

          return (
            <div className="card" key={index}>
              <div className="card-img">
                <img src={image} alt="Services info" />
              </div>
              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p> Rs {price}</p>
                </div>
                <h2>{service}</h2>
                <p style={{color:'black'}}>{description}</p>
              </div>
            </div>
          )
        })
        }
      </div>
    </section>
  )
}

export default Service