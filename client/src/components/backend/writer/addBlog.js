import React, { Component } from 'react'
import ReactQuill from 'react-quill';



export default class addBlog extends Component {
constructor(props) {
  super(props)

  this.state = {
     text : "start typing",
     basic : true
  }
  this.handleChange = this.handleChange.bind(this)

}

handleChange(value) {
    this.setState({ text: value })

    this.props.handleBodyChange(this.state.text)
  }

  handlehangeView=()=>{
    this.setState({
        basic : !this.state.basic
    })
  }
  modules = {
    toolbar: [
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }]
      ['bold', 'italic', 'underline','strike', 'blockquote','font','script','size'],
      [{'list': 'ordered'}, {'list': 'bullet'},
       {'indent': '-1'}, {'indent': '+1'},{ 'script': 'sub'}, { 'script': 'super' },
       { 'direction': 'rtl' }],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],  
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']
    ],
  }
 
  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote','background','color','font','script','size',
    'list', 'bullet', 'indent','align',
    'link', 'image' ,'direction'
  ]

  render() {
      
    return (
      <div>
          <button className="btn btn-light bigger" onClick={this.handlehangeView}>CHange View</button>
           {
               this.state.basic ?
               
               <ReactQuill value={this.state.text}
               onChange={this.handleChange}
               theme="snow"
               modules={this.modules}
               formats={this.formats} /> :

               <ReactQuill value={this.state.text}
               onChange={this.handleChange}
               theme="bubble" 
               modules={this.modules}
               formats={this.formats}/>
           }
      </div>
    )
  }
}
 