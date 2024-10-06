import './404.css'

function NotFound() {
  return (
    <div className="not-found-container">
      Not Found. Go <a href="/" style={{textDecoration: "underline"}}>Home</a>?
    </div>
  )
}

export default NotFound;