import React from "react";
import { Button, TextField } from '@material-ui/core'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       hunt: [],
       collection: [],
       lookUpVal: '',
       albumList: [],
       artistSearch: false,
       artistBtn: false,
       searched: false,
       listView: 'hunt'

    }
  }
  handleChange(e){
    this.setState({lookUpVal: e.target.value})
  }
  handleSearchByClick(button){
    if(button === 'artist') this.setState({artistSearch: !false, artistBtn: !false,lookUpVal: '', albumList: [],searched: false })
    else this.setState({artistSearch: false, artistBtn: false, lookUpVal: '', albumList: [],searched: false })
  }
  clearList(){
    this.setState({albumList: [], searched: false})
  }
  changeListView(view){
    if(view === 'hunt') this.setState({listView: 'hunt'})
    else this.setState({listView: 'collection'})
  }
  handleSearchClick(e){
    e.preventDefault()
    let value = this.state.lookUpVal.replace(' ', '_')
    if(this.state.artistSearch && this.state.artistBtn){
      axios.get(`https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=${value}`)
      .then(value => {
        this.setState({lookUpVal: '',searched: !false, albumList: []})
        value.data.album.forEach(element => this.setState({albumList: this.state.albumList.concat(element)}))
      })
      .catch(err => {
        console.log('error fetching artist details', err)
        this.setState({lookUpVal: '',searched: !false, albumList: []})
      })
    }else{
      axios.get(`https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?a=${value}`)
      .then(value => {
        this.setState({lookUpVal: '',searched: !false, albumList: []})
        value.data.album.forEach(element => this.setState({albumList: this.state.albumList.concat(element)}))
      })
      .catch(err => {
        console.log('error fetching artist details', err)
        this.setState({lookUpVal: '',searched: !false, albumList: []})
      })
    }
  }
  addToHunt(obj, list){
    if(list === 'hunt'){
      this.setState({
        hunt: this.state.hunt.concat(obj),
        albumList: this.state.albumList.filter(val => val !== obj),
        searched: false
      })
    }else {
      this.setState({
        collection: this.state.collection.concat(obj),
        albumList: this.state.albumList.filter(val => val !== obj),
        searched: false
      })
    }
  }
  render() {
    return (
      <div className='container'>
      <h1 className='app-title'>Vinyl Hunt</h1>
        <div className='searchBy' >Search By..</div>
          {this.state.artistBtn
            ?
          <div className='button-div'>
            <Button id='album-btn' variant='contained' size='small' color='default' onClick={()=> this.handleSearchByClick('album')}>Album</Button>
            <Button  variant='contained' size='small' color='primary' >Artist</Button>
          </div>
            :
          <div className='button-div'>
            <Button id='album-btn' variant='contained' size='small' color='primary'>Album</Button>
            <Button  variant='contained' size='small' color='default' onClick={()=> this.handleSearchByClick('artist')} >Artist</Button>
          </div>  
          }
        <div className='search-div'>
          {this.state.artistSearch
          ?
          <TextField id='search-input' placeholder='Enter Artist Name...' value={this.state.lookUpVal} onChange={this.handleChange.bind(this)} />
          :
          <TextField id='search-input' placeholder='Enter Album Name...' value={this.state.lookUpVal} onChange={this.handleChange.bind(this)}  />
          }
          <Button id='search-btn' type='submit' variant='outlined' size='small' onClick={this.handleSearchClick.bind(this)} >Search</Button>
        </div>
        <div className='albums'>
          {
            this.state.albumList.length > 0 
            ?
            <ul> 
            <p className='album-list-label'>Select An Album to add to your collection or to your hunt list</p>
              {this.state.albumList.map((val,idx) => {
                if(this.state.artistBtn && this.state.artistSearch){
                  return (
                    <li key={idx} className='album-list-title' >{val.strAlbum}
                    <div className='add-btn'>
                      <Button variant='contained' size='small' onClick={()=> this.addToHunt(val, 'hunt')} style={{maxHeight:"20px", maxWidth:"12px", marginRight: "5px", fontSize: "10px"}}>Hunt</Button>
                      <Button variant='contained' size='small' onClick={()=> this.addToHunt(val, 'collection')} style={{maxHeight:"20px", maxWidth:"100px", fontSize: "10px"}}>Collected</Button>
                    </div>
                    </li>
                  )
                }else{
                  return (
                    <li key={idx} className='album-list-title' >{val.strAlbum} by {val.strArtist}
                    <div className='add-btn'>
                      <Button variant='contained' size='small' onClick={()=> this.addToHunt(val, 'hunt')} style={{maxHeight:"20px", maxWidth:"12px",marginRight: "5px", fontSize: "10px"}}>Hunt</Button>
                      <Button variant='contained' size='small' onClick={()=> this.addToHunt(val, 'collection')} style={{maxHeight:"20px", maxWidth:"100px", fontSize: "10px"}}>Collected</Button>
                    </div>
                    </li>
                  )
                }
              })}
              <Button id='clear-list-btn' variant='contained' size='small' onClick={this.clearList.bind(this)} style={{maxHeight:"20px", maxWidth:"100px", fontSize: "10px", marginTop: "18px" }}>Clear List</Button>
            </ul>
            :
            <></>
          }
          {this.state.searched && this.state.albumList.length === 0
            ?
            <h3 className='album-err' >No Albums Found for that artist</h3>
            :
            <></>
          }  
        </div>
        {
          this.state.listView === 'collection'
          ?
          <div className='list-choice'>
            <Button id='hunt-list-btn' variant='contained' size='small' color='default' onClick={() => this.changeListView('hunt')} >Hunt List</Button>
            <Button variant='contained' size='small' color='primary' >Collection</Button>
          </div>  
          :
          <div className='list-choice'>
            <Button id='hunt-list-btn' variant='contained' size='small' color='primary' >Hunt List</Button>
            <Button variant='contained' size='small' color='default' onClick={() => this.changeListView('collection')} >Collection</Button>
          </div>
        }
        <div className='listView'>
            {
              this.state.listView === 'hunt'
              ?
              <ul>
                {this.state.hunt.map((element,idx) =>{
                  return (
                    <li key={idx} className='tile-list'>
                      <img src={element.strAlbumThumb} alt={`${element.strAlbum} Album Cover `} className='img-thumb' />
                      <div className='artist-tile-div'>Artist : {element.strArtist}</div>
                      <div className='album-tile-div'>Album : {element.strAlbum}</div>
                      <div className='release-tile-div'>Release Date : {element.intYearReleased}</div>
                      <div className='desc-tile-div'>Album Description :{element.strDescriptionEN}</div>
                    </li>
                  )
                })}
              </ul>  
              :
              <ul>
                {this.state.collection.map((element,idx) =>{
                  return (
                    <li key={idx} className='tile-list'>
                      <img src={element.strAlbumThumb} alt={`${element.strAlbum} Album Cover `} className='img-thumb' />
                        <div className='artist-tile-div'>Artist: {element.strArtist}</div>
                        <div className='album-tile-div'>Album: {element.strAlbum}</div>
                        <div className='release-tile-div'>Release Date : {element.intYearReleased}</div>
                        <div className='desc-tile-div'>Album Description : {element.strDescriptionEN}</div>
                    </li>
                  )
                })}
              </ul>
            }
        </div>
      </div>
    )
  }
  
  
}

export default App;
