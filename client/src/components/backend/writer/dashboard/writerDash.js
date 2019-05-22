import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { addBlogHead ,addBlogContent,getWriterBlogs} from "../../../../actions/writerActions";
import AddBlog from "../addBlog";
class writerDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addBlogs: false,
      blogForm: {
        blogHead: true,
        blogContent: false
      },
      blogHead: {
        title: "",
        description: "",
        cover: require("../../../../images/curator/addImg.png"),
        coverFile: "",
        blogCode: ""
      },
      blogContent: {
        link: "",
        img: require("../../../../images/curator/addImg.png"),
        imgFile: "",
        blogContent: ""
      },
      myBlogs :[]
    };
  }
  componentDidMount() {
    if (!this.props.writer.isAuthenticated)
      window.location.replace("/backend/writer");

    this.props.getWriterBlogs();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.writer) {
      if (!nextProps.writer.isAuthenticated) {
        window.location.replace("/backend/writer");
      }

      this.setState({
        myBlogs : nextProps.writer.writerBlogs
      })

      if (nextProps.writer.addBlog) {
        if(nextProps.writer.addBlog.head){
          this.setState({
            blogHead: {
              ...this.state.blogHead,
              blogCode: nextProps.writer.addBlog.head.blogCode
            }
          });
        }
        if(nextProps.writer.addBlog.content){
          this.setState({
            blogContent: {
              link: "",
              img: require("../../../../images/curator/addImg.png"),
              imgFile: "",
              blogContent: ""
            }
          });
        }

      
      }
    }
  }

  handelHeadChange = e => {
    this.setState({
      blogHead: {
        ...this.state.blogHead,
        [e.target.name]: e.target.value
      }
    });
  };

  handelHeadCoverChange = e => {
    this.setState({
      blogHead: {
        ...this.state.blogHead,
        cover: URL.createObjectURL(e.target.files[0]),
        coverFile: e.target.files[0]
      }
    });
  };

  handleBodyChange = data => {
    this.setState({
      blogHead: {
        ...this.state.blogHead,
        description: data
      }
    });
  };

  handelBlogHeadSubmit = e => {
    e.preventDefault();

    this.setState({
      blogForm: {
        blogHead: false,
        blogContent: true
      },
      blogHead: {
        title: "",
        description: "",
        cover: require("../../../../images/curator/addImg.png"),
        coverFile: "",
        blogCode: this.state.blogHead.blogCode
      },
      blogContent: {
        link: "",
        img: require("../../../../images/curator/addImg.png"),
        imgFile: "",
        blogContent: ""
      }
    });

    let blogHead = {
      title: this.state.blogHead.title,
      description: this.state.blogHead.description,
      coverFile: this.state.blogHead.coverFile
    };

    let formData = new FormData();

    formData.append("title", blogHead.title);
    formData.append("description", blogHead.description);
    formData.append("cover", blogHead.coverFile);

    this.props.addBlogHead(formData);
  };

  closeConetntBody = () => {
    this.setState({
      addBlogs: false,
      blogForm: {
        blogHead: true,
        blogContent: false
      }
    });
  };

  card = (blog) => (
    <div className="card" style={{ width: "30rem", fontSize: "2rem",margin:"1rem" }}>
        <img src={blog.cover} alt="cover" className="card-img-top"  />
      <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>
        <a href={`/blog/${blog.blogCode}`} target="_blank" rel="noopener noreferrer" className="card-link btn btn-outline-primary">
          View Blog
        </a>
      </div>
    </div>
  );

  handleBlogContentChange = e=>{
    this.setState({
      blogContent:{
        ...this.state.blogContent,
        [e.target.name] : e.target.value
      }
    })
  }

  handleBlogContentImageChange = e=>{
    this.setState({
      blogContent: {
        ...this.state.blogContent,
        img: URL.createObjectURL(e.target.files[0]),
        imgFile: e.target.files[0]
      }
    });
  }

  handelBlogContentSubmit = e=>{
    e.preventDefault();
    const content = {
      link : this.state.blogContent.link,
      blogContent : this.state.blogContent.blogContent,
      blogCode : this.state.blogHead.blogCode,
      contentImg : this.state.blogContent.imgFile
    }

    const newFormData = new FormData();
    for(let key in content){
      newFormData.append(key , content[key])
    }
    this.props.addBlogContent(newFormData);
    
  }
  blogHead = () => {
    return (
      <>
        <h1>ADD Blog Head</h1>
        <form
          className="authPage-signIn-form"
          onSubmit={this.handelBlogHeadSubmit}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            id="blogTitle"
            value={this.state.blogHead.title}
            onChange={this.handelHeadChange}
            required
          />

          <div className="writerDash-addBlogs-form-body">
            <AddBlog handleBodyChange={data => this.handleBodyChange(data)} />
          </div>

          <label htmlFor="blogCover" className=" writerDash-addBlogs-coverImg">
            <img src={this.state.blogHead.cover} alt="" />
          </label>
          <input
            type="file"
            name="cover"
            id="blogCover"
            style={{ display: "none" }}
            onChange={this.handelHeadCoverChange}
          />
          <input
            type="submit"
            className="authPage-signIn-form-btn adminAuth-btn"
            value="NEXT"
          />
        </form>
      </>
    );
  };

  blogContent = () => {
    return (
      <>
        <h1>ADD Blog Content</h1>
        <form
          className="authPage-signIn-form"
          onSubmit={this.handelBlogContentSubmit}
        >
          <input
            type="text"
            name="link"
            placeholder="Link to buy"
            id="ContentLink"
            value={this.state.blogContent.link}
            onChange={this.handleBlogContentChange}
          />
          <input
            type="text"
            name="blogCode"
            value={this.state.blogHead.blogCode}
            id="blogCode"
            disabled
          />

          <textarea
            type="text"
            name="blogContent"
            placeholder="content body"
            id="content body"
            className="bigger"
            value={this.state.blogContent.blogContent}
            onChange={this.handleBlogContentChange}

          />
          <label htmlFor="contentImg" className=" writerDash-addBlogs-coverImg">
            <img src={this.state.blogContent.img} alt="" />
          </label>
          <input
            type="file"
            name="contentImg"
            id="contentImg"
            style={{ display: "none" }}
            onChange={this.handleBlogContentImageChange}

          />
          <input
            type="submit"
            className="authPage-signIn-form-btn adminAuth-btn"
            value="ADD"
          />
          <button
            className="btn btn-danger btn-lg"
            onClick={this.closeConetntBody}
          >
            Close
          </button>
        </form>
      </>
    );
  };

  addBlogs = () => ( <>
        <div
        className="writerDash-addBlogs"
        onClick={() => {
          this.setState({ addBlogs: !this.state.addBlogs });
        }}
      />
      <div className="authPage-signIn  adminAuth writerDash-addBlogs-form">
        {this.state.blogForm.blogHead ? this.blogHead() : this.blogContent()}
      </div>
    </>
  );

  render() {
    console.log(this.state.myBlogs);
    
    return (
      <div className="container">
        {this.state.addBlogs ? this.addBlogs() : null}

        {!this.props.writer.isAuthenticated ? (<Redirect to="/backend/writer" />) : null}
        <div className="jumbotron writerDash-head">WRITER PANEL</div>
        <div className="row">
        
        {this.state.myBlogs.map((blog,i)=>(
            <div className="col" key={`blogsWriter${i}`}>{this.card(blog)}</div>
        ))}

        </div>
        <br />
        <br />
        <br />
        <button
          className="btn btn-block btn-secondary btn-lg"
          onClick={() => {
            this.setState({ addBlogs: !this.state.addBlogs });
          }}
        >
          ADD BLOGS
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  writer: state.writer
});

export default connect(
  mapStateToProps,
  { addBlogHead ,
    addBlogContent,
    getWriterBlogs}
)(writerDash);
