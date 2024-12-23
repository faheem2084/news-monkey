import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

    capitalizeFirstLetter = (val) => {
      return String(val).charAt(0).toUpperCase() + String(val).slice(1);  
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0

        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMoneky`;
    }

    async updateNews(){
      const url =
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&apiKey=5e6d01cac52643d4bda1d74d541196a6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
      let parsedData = await data.json();
  
      const filteredArticles = parsedData.articles.filter(
        (article) => article.title !== "[Removed]"
      );
  
      // Set the filtered articles in the state
      this.setState({
        articles: filteredArticles,
        totalResults: parsedData.totalResults,
        loading: false
      });

    }

    async componentDidMount() {
      // let url =
      //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&apiKey=5e6d01cac52643d4bda1d74d541196a6&page=1&pageSize=${this.props.pageSize}`;
      //   this.setState({loading: true})
      //   let data = await fetch(url);
      // let parsedData = await data.json();
  
      // const filteredArticles = parsedData.articles.filter(
      //   (article) => article.title !== "[Removed]"
      // );
  
      // // Set the filtered articles in the state
      // this.setState({
      //   articles: filteredArticles,
      //   totalResults: parsedData.totalResults,
      //   loading: false
      // });
      this.updateNews();
    }

    handleNextClick = async () =>{
      console.log("Next Clicked..");
      // if( !(this.state.page + 1 > Math.ceil(this.state.totalResults/ this.props.pageSize ) )){
      //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&apiKey=5e6d01cac52643d4bda1d74d541196a6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      //   this.setState({loading: true });
      //   let data = await fetch(url);
      //   let parsedData = await data.json();
      //   const filteredArticles = parsedData.articles.filter(
      //     (article) => article.title !== "[Removed]"
      //   );

      //   // Set the filtered articles in the state
      //   this.setState({
      //     articles: filteredArticles,
      //     page: this.state.page + 1,
      //     loading: false
      //   });
      // }
      this.setState({page: this.state.page + 1});
      this.updateNews()
    }

    handlePrevClick = async () =>{
      console.log("Prev Clicked..");
      // if( !(this.state.page - 1 >= Math.ceil(this.state.totalResults / this.props.pageSize ) )){
      //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&category=${this.props.category}&apiKey=5e6d01cac52643d4bda1d74d541196a6&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      //   this.setState({loading: true})
      //     let data = await fetch(url);
      //   let parsedData = await data.json();
      //   const filteredArticles = parsedData.articles.filter(
      //     (article) => article.title !== "[Removed]"
      //   );

      //   // Set the filtered articles in the state
      //   this.setState({
      //     articles: filteredArticles,
      //     page: this.state.page - 1,
      //     loading: false
      //   });
      // }

      this.setState({page: this.state.page - 1});
      this.updateNews()

    }


  render() {
    return (

      <div className='container my-3'>
        <h1 className="text-center" style={ {margin: '35px 0px'} }>Monkey News - Top headlines from {this.capitalizeFirstLetter(this.props.category)} </h1>
        { this.state.loading && <Spinner/>}
        <div className='row'>

        {!this.state.loading && this.state.articles.map((element) => {
          return (
            <div className='col-md-3' key={element.url}>
              <NewsItem key={element.url}
                title={element.title?element.title:""}
                description={element.description?element.description:""}
                imageUrl={element.urlToImage?element.urlToImage:""}
                newsUrl={element.url?element.url:""} 
                author={element.author?element.author:"Unknown"}
                date={element.publishedAt} 
                source={element.source.name}
                
              />

            </div>


          );
        })}

        </div>
        <div className="container d-flex justify-content-between">
          <button type="button" disabled = {this.state.page <=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type="button" disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/ this.props.pageSize )} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
       </div>

      </div>
    )
  }
}

export default News
