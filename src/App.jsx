import { useEffect, useState } from 'react'
import './App.css'

const API_KEY = '2987c1d326f842169956cb426f2f3906';

function App() {

  const[articles, setArticles] = useState([]);
  const[error, setError] = useState(null);
  const[loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const articlesPerPage = 12;
  // const [count, setCount] = useState(0);
  
  useEffect(()=>{
    const fetchData = async() => {
      try{
        const response = await fetch(`https://newsapi.org/v2/everything?domains=bbc.com,thenextweb.com&apiKey=${API_KEY}`);
        if (!response.ok){
          throw new Error('Network not responding...')
        }
        const result = await response.json();
        console.log(result.articles);
        setArticles(result.articles);
      }
      catch(error){
        setError(error.message);
      }
      finally{
        setLoading(false);
      }
    }
    fetchData();

  },[]);


  if (loading) return <h2>Loading...</h2>
  if (error) return <p>Error: {error}</p>


  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const selectedArticles = articles.slice(startIndex, startIndex + articlesPerPage);
  console.log(selectedArticles)

  return (
    <>
      <h1>Blogposts</h1>
        <div className='blogposts' style={{ padding: "20px", textAlign: "center" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // 3 columns
            gap: "20px",
            maxWidth: "1200px",
            margin: "auto"
          }}>
        {selectedArticles.map((article, index) => (
          <div key={index} style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
          }}>
            <img src={article?.urlToImage} alt={article?.title} style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px"
            }} />
            <h2 style={{ fontSize: "18px", margin: "10px 0" }}>{article?.title}</h2>
            <p style={{ fontSize: "14px", color: "#555" }}>{article?.description}</p>
            <p><strong>Source:</strong> {article?.source?.name}</p>
            <a href={article?.url} target="_blank" rel="noopener noreferrer"
              style={{ color: "#007BFF", textDecoration: "none", fontWeight: "bold" }}>
              Read more
            </a>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ margin: "5px", padding: "10px", cursor: "pointer" }}
        >
          Previous
        </button>

        <span style={{ fontSize: "16px", fontWeight: "bold", margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{ margin: "5px", padding: "10px", cursor: "pointer" }}
        >
          Next
        </button>
      </div>
    </div>
    </>
  )
}

export default App
