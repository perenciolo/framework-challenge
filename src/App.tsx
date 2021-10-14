import { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import classNames from 'classnames';

import { LoadAlbums } from './features/albums';
import { LoadPosts } from './features/posts';
import { LoadTodos } from './features/todos';

import './App.scss';
import classes from './app.module.scss';

function App() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  return (
    <Router>
      <div className="box">
        <Switch>
          <Route path="/posts" component={LoadPosts} />
          <Route path="/albums" component={LoadAlbums} />
          <Route path="/" component={LoadTodos} />
        </Switch>
        <button className={classes.menuBox} onClick={() => setIsOpenMenu((current) => !current)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={classes.menu}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
        <nav
          className={classNames(classes.navigationBox, {
            [classes.isOpen]: isOpenMenu,
          })}
        >
          <ul className={classes.navigation}>
            <li className={classes.navigationItem}>
              <Link to="/todos">Todos</Link>
            </li>
            <li className={classes.navigationItem}>
              <Link to="/albums">Albums</Link>
            </li>
            <li className={classes.navigationItem}>
              <Link to="/posts">Posts</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;
