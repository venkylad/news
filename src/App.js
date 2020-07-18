import React, { useState, useEffect} from 'react'
import './bootstrap.min.css'
import './styles.css'

const NewsArticle = () => {
    const[ news, setNews ] = useState([])
    const[ search, setSearch ] = useState('')
    const[ url, setUrl] = useState("http://hn.algolia.com/api/v1/search?query=react")
    const[ loading, setLoading ] = useState(false)

    const fetchNews = () => {
        setLoading(true)

        fetch(url)
        .then(response => response.json())
        .then(data => (setNews(data.hits), setLoading(false)))
        .catch(error => console.log(error))
    }

    useEffect( () => {
        fetchNews()
    },[url])

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setUrl(`http://hn.algolia.com/api/v1/search?query=${search}`)
    }



    return(
        <div className="container-fluid">
            <h1 className="jumbotron bg-primary" style={{textAlign:"center"}}>
              <span className="display-2">Tech</span> 
              <i style={{color:"yellow"}}><strong>NEWS</strong></i>
            </h1>


            <form
            className="container"
             onSubmit = {handleSubmit}
            >
                <div className="row form-group">
                  <input type="text" className="col-8 offset-1 form-control" autoFocus
                  placeholder="Tech Search" 
                  value={search}
                  onChange = {handleChange}
                  />
                  <button type="submit" className="col-2 btn btn-danger">Submit</button>
                </div>
            </form>

            {loading ? <h1 className="display-3 loading">Loading...</h1> : ""}


            {news.map( (single,i) => {
                return(
                    <div key={i} className="card">
                        <h2>{single.title}</h2>
                        <p><i>Created at</i>: {single.created_at}</p>
                        <h5>Author: <i><strong>{single.author}</strong></i></h5>
                        <button className="btn btn-info btn-sm">
                            <a href={single.url} className="lead">Learn More...</a>
                        </button>
                        {
                        single.relevancy_score ? 
                        <p className="lead">Relavancy Score : 
                        {single.relevancy_score }</p> : ""
                        }
                      
                    </div>
                )
            })}

        </div>
    )
}

export default NewsArticle
