import { Component } from 'react';
import './styles.css';
import { Posts } from '../../Components/Posts';
import { Button } from '../../Components/Button';
import { TextInput } from '../../Components/TextInput';
  export class Home extends Component{
    state = {
      posts:[],
      allPosts:[],
      page:0,
      postsPerPage:10,
      searchValue:""
    };

    componentDidMount(){
      
      this.loadPosts();
    }

    loadPosts = async ()=> {
      const {page, postsPerPage} = this.state;
      const postsResponse =  fetch('https://jsonplaceholder.typicode.com/posts');
      const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');


      const [posts,photos] = await Promise.all([postsResponse,photosResponse]);

      const postsJson  = await posts.json();
      const photosJson  = await photos.json();

      const postsAndPhotos = postsJson.map((post,index)=>{
        return {...post, cover:photosJson[index].url}
      });

      this.setState({
        posts:postsAndPhotos.slice(page,postsPerPage),
        allPosts:postsAndPhotos
      })
    }

    loadMorePosts =() => {
      const{
        page,
        postsPerPage,
        allPosts,
        posts
      } = this.state;
      const nextPage = page + postsPerPage;
      const nextPosts = allPosts.slice(nextPage , nextPage + postsPerPage);
      posts.push(...nextPosts);
      this.setState({posts,page:nextPage})
    }
    handleChange = (e) => {
      const {value} = e.target;
      this.setState({searchValue:value});
    }
    render (){
      const {posts,page,postsPerPage,allPosts,searchValue} = this.state;
      const noMorePosts = page + postsPerPage >= allPosts.length;
      const filteredPosts = !!searchValue ? 
      allPosts.filter(post=> {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      })
      :
      posts;
      return(
        <section className='container'>
         < div class="search-container">
          <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
          </div>
          {filteredPosts.length > 0 && (
            <Posts posts={filteredPosts}/>
          )}
           {filteredPosts.length === 0 && (
            <p>Não existem posts.</p>
          )}         
          <div className="button-container">
          {!searchValue && (
          <Button
           text="Load more posts"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
            /> 
            )}
          </div>
        </section>
 
      )
    }
  }




