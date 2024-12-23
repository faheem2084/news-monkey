import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {    
    let { title, description,imageUrl, newsUrl, author, date, source } = this.props;

    return (
      <div className='my-4'> 
        <div className="card">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" 
            style={{left: '90%', zIndex:'1'}}>
                  {source}</span>
            <img className="card-img-top" src={imageUrl} alt="nothing."/>
            <div className="card-body">
                <h5 className="card-title">{title} </h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {author} updated on {new Date(date).toLocaleTimeString()} </small></p>
                <a href={newsUrl} className="btn btn-dark">Go somewhere</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
