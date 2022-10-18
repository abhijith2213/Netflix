import React,{useEffect,useState} from "react";
import YouTube from "react-youtube";
import axios from '../../axios';
import {imageUrl,API_KEY} from '../../Constants/constants';
import "./RowPost.css";
function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId,setUrlId] = useState('')
  useEffect(() => {
    axios.get(props.url).then((response)=>{
      console.log(response,'rowpost');
      setMovies(response.data.results)
    }).catch((err)=>{
      // alert(err)
    })
  }, [])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  
  const handleMovie = (id) =>{
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data);
      if(response.data.results[0]){
        setUrlId(response.data.results[0])
      }
    })
  }
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className= "posters">
        {movies.map((obj)=>
        <img onClick={()=>handleMovie(obj.id)} className={ props.isSmall ? "smallPoster" :"poster"}
        src={`${imageUrl+obj.backdrop_path}`}
        alt="poster"/>
        )}        
      </div>
     { urlId && <YouTube opts={opts} videoId={urlId.key}/>}
    </div>
  );
}

export default RowPost;
