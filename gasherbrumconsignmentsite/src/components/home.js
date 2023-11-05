import { useNavigate } from "react-router"
function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <ul>
        <a href="" onClick={() => navigate('/sitemanagerlogin')}>Site Manager Login</a><br></br>
        <a href="" onClick={() => navigate('/storeownerlogin')}>Store Owner Login</a>
      </ul>
    </div>
  )
}

export default Home