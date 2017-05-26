import React, { Component } from 'react'; 
import ys from './api.js'
import './app.css';
const key = 'AIzaSyD-v05UL11bB8YW4onJIphPIzEyI2DTDrg' 

class App extends Component {
  constructor(props){
    super(props)
    this.state = {term: "" , clear: "" , error:"" , videos : [] , selectedVideo: null}
  }

  onChange = (e) => {
    clearTimeout(this.state.clear)
    
    this.setState({ term: e.target.value })
    this.state.clear = setTimeout(() => {
      this.apiCall(this.state.term)
    } , 400)

  } 

  apiCall = (term) => {
    ys({key , term}).then(r =>{
      this.setState({
        videos: r.data.items || []  ,
        selectedVideo:r.data.items && r.data.items[0]&& r.data.items[0].id.videoId ,
        error: "",
      })  
    }).catch(error => this.setState({error}))
  }

  handleClick = (id) => this.setState({selectedVideo: id}) 
  render() {
    const {videos,term,selectedVideo} = this.state
    return (
      <div className="App">
        <header>
          <input value={this.state.term} onChange={this.onChange} type="text" className="search"/> 
        </header>
      <Content empty={term == ""} videos = {videos}  selectedVideo={this.state.selectedVideo} handleClick={this.handleClick} />
      </div>
    );
  }
}

const VideoWrapper = ({id}) => (
<div className="videoWrapper">
  <Embedd id={id} />
</div>
)

const Sidebar = ({videos, handleClick}) => (
  <div className="sidebar">
    {videos.length > 0 && videos.map( video => <SidebarItem video={video} handleClick={handleClick} key={video.etag}/>)}
  </div>  
)

const SidebarItem = ({video , handleClick}) => (
  <div className="sidebar-item-container" onClick={() => handleClick( video.id.videoId )} >
    <img src={video.snippet.thumbnails.default.url} alt="video preview" className="sidebar-item-img" /> 
    <div className="sidebar-item-content">
      <p className="sidebar-item-title">{video.snippet.title.substring(0 , 50) + "..."}</p>
    </div>
  </div>
)

const Embedd = ({id}) => (
  <div className="video-container">
    <iFrame className="frame"  src={`https://www.youtube.com/embed/${id}?autoplay=1`} frameBorder="0" allowFullScreen>
    </iFrame>
  </div>
)

const Content = ({videos , empty , selectedVideo , handleClick}) => (
  <div>
    {console.log(empty , videos)}
    {empty || videos[0] == undefined  ? <p> Search For Youtube Videos </p> : (
      <div>
        <VideoWrapper id={selectedVideo}/>  
        <Sidebar videos={videos} handleClick={handleClick}/>
      </div>
    )}
  </div> 
)

export default App;