import React from 'react';
import axios from 'axios';

export default class CollectUrl extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: "",
      shortenedUrl: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitUrl = this.submitUrl.bind(this);
  }

  reverseString(s){
    let chars = []
    for (let i = 0; i < s.length; i++){
      chars.push(s[i])
    }
    for (let i = 0; i < chars.length/2; i++){
      let el = chars[i]
      chars[i] = chars[chars.length -1 -i]
      chars[chars.length -1 -i] = el
    }
    return chars.join('')
  }

  idToShortURL(id){
    const map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let shortURL = ""
  
    //for each digit find the base 62
    while (id > 0){
      shortURL += map[id % 62]
      id = Math.floor(id/62)
    }
  
    //reversing the shortURL 
    return this.reverseString(shortURL)
  }


  async postUrl(url){
    try {
      const res = await axios.post('http://localhost:5006/url', url )
      console.log(res.data)
      if (res.data && res.data.id){
        this.setState({shortenedUrl: 'http://localhost:3000/' + this.idToShortURL(parseInt(res.data.id))})
      }
    } catch (err){
      console.error(err)
    }
  }

  handleChange(e){
    this.setState({url: e.target.value})
  }

  submitUrl(){
    this.postUrl({url : this.state.url})
  }

  render(){
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px'}}>
        <input 
          style={{width: '500px', height: '50px', marginRight: '20px', paddingLeft: '20px', fontSize: '16px'}}
          placeholder="Enter your url"
          onChange={this.handleChange}
        />
        <button 
            onClick={() => this.submitUrl()}
            style={{ height: '50px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '6px', padding: '10px', fontSize: '20px'}}
        >Shorten URL</button>
        {this.state.shortenedUrl.length > 0
        ? <p>Your shortened url is <a href={this.state.shortenedUrl}>{this.state.shortenedUrl}</a> </p>
        : null}
      </div>
    );
  }
}
