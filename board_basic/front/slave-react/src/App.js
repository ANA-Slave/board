import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import PostList from './routes/PostList';
import PostDetail from './routes/PostDetail';
import WritePost from './routes/WritePost';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/list' element={<PostList />} />
          <Route path='/list/:id' element={<PostDetail />} />
          <Route path='/write' element={<WritePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
