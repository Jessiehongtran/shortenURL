import Axios from 'axios';
import React from 'react';
import { Route } from 'react-router-dom';

export default class RedirectUrl extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            origin_url: ""
        }
        this.getURL = this.getURL.bind(this);
    }

    async getURL(urlID){
        try {
            const res = await Axios.get(`http://localhost:5006/url/${urlID}`)
            window.location.assign(res.data.url);
        } catch (err){
            console.error(err)
        }
    }

    shortURLToId(shortURL){
        let id = 0
        for (let i = 0; i < shortURL.length; i++){
          let n = shortURL[i].charCodeAt()
          if (n >= 'a'.charCodeAt() && n <= 'z'.charCodeAt()){
            id = id*62 + n - 'a'.charCodeAt()
          } else if (n >= 'A'.charCodeAt() && n <= 'Z'.charCodeAt()){
            id = id*62 + n - 'Z'.charCodeAt() + 26
          } else {
            id = id*62 + n - '0'.charCodeAt() + 52
          }
        }
        return id
      }

    componentDidMount(){
        const shortenUrl = this.props.match.params.shortenUrl;
        const urlID = this.shortURLToId(shortenUrl)
        this.getURL(urlID)
    }

    render(){
        console.log(this.props)

        return (
            <>
            <p>Welcome to shorten URL!</p>
           </>
        )
    }
}