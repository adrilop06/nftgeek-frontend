import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home/home';
import NavMenu from "./components/nav/navMenu";
import Login from "./components/Users/Login/login";
import Registration from './components/Users/Registration/registration';
import CreatePost from "./components/Post/createPost";
import ProtectedRoute from "./components/nav/ProtectedRoute/protectedRoute";
import CreatePostNoUser from "./components/Post/createPostNoUser";
import GameCategory from "./components/Categories/gamesCategory";
import InsidePost from "./components/Post/insidePost";
import UpdatePost from "./components/Post/updatePost";
import Profile from "./components/Users/profile/profile";
import InsideTag from "./components/Tag/insideTag";
import LearningCategory from "./components/Categories/learningCategory";
import Market from "./components/Market/marketComponent";
import News from "./components/News/news";
import Results from "./components/Searcher/results";
import Footer from "./components/nav/footer";
import About from "./components/About/about";
import InsideCoin from "./components/Market/insideCoin";


function App() {

  return (
    <BrowserRouter>
      <NavMenu/>
      <Routes>
        <Route path='/' element={<Home/>} component={Home} />
        <Route path='/registration' element={<Registration/>} component={Registration} />
        <Route path='/login' element={<Login/>} component={Login} />
        <Route path='/no-user' element={<CreatePostNoUser/>} component={CreatePostNoUser} />
        <Route path='/posts/:id' element={<InsidePost/>} component={InsidePost} />
        <Route path='/games' element={<GameCategory/>} component={GameCategory} />.
        <Route path='/learning' element={<LearningCategory/>} component={LearningCategory} />
        <Route path='/tag/:slug' element={<InsideTag/>} component={InsideTag} />
        <Route path='/market' element={<Market/>} component={Market} />
        <Route path='/news' element={<News/>} component={News} />
        <Route path='/posts/results/:title' element={<Results/>} component={Results}/>
        <Route path='/about-us' element={<About/>} component={About}/>
        <Route path='/market/coin/:id' element={<InsideCoin/>} component={InsideCoin}/>
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-post/:id"
          element={
            <ProtectedRoute>
              <UpdatePost/>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
