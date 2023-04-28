import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { Home, Auth, Post, User, Personal, Search, StoryEdit, PostEdit } from './pages'
import AuthRoute from './utils/CustomRoutes/authRoute';
import ProtectedRoute from './utils/CustomRoutes/protectedRoute';
import PostSnackBar from './components/PostSnackBar/PostSnackBar';
import useSocket from './utils/hooks/useSocket';
const App = () => {
  useSocket()
  return (
    <Router>
      <Navbar/>
      <PostSnackBar/>
      <div style={{marginTop: '20px'}}>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/posts"/>} />
          <Route exact path="/posts" component={Home} />
          <Route exact path="/search" component={Search} />
          <AuthRoute exact path="/auth" component={Auth} />
          <Route exact path="/posts/:postId" component={Post} />
          <ProtectedRoute exact path="/user" component={User} />
          <Route exact path="/stories/:storyId/edit" component={StoryEdit} />
          <Route exact path="/posts/:postId/edit" component={PostEdit} />
          <Route exact path="/users/:userId" component={Personal} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
