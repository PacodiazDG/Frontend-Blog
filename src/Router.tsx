import Index from './Containers';
import Login from './Containers/login';
import Search from './Containers/search';
import Footerweb from './Componets/footer';
import NotFound from './Containers/notfound';
import Writepost from './Containers/witepost/witepost';
import Page from './Containers/page';
import Menu from './Componets/menu';
import ResetScroll from './Componets/resetscroll';
import Drafts from './Containers/drafts';
import My from './Containers/my';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import About from './Containers/about';
import Code403 from './Containers/403';
import {LoginInC} from './Logic/Ahut';
import {useState} from 'react';
import isMobile from 'is-mobile';
import MobileMenu from './Componets/mobilemenu';
import BlogEngine from './Containers/blogengine';

function KRouter() {
  const [usLogin, setLogin] = useState<boolean>(false);
  const value = {usLogin, setLogin};
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ResetScroll/>
      <LoginInC.Provider value={value}>
        {isMobile() && <MobileMenu/>}
        <Menu />
        <Routes>
          <Route exact={true} path="/about" element={<About></About>} />
          <Route exact={true} path="/pages" element={<Page></Page>} />
          <Route exact={true} path="/search" element={<Search></Search>} />
          <Route exact={true} path="/" element={<Index></Index>} />
          <Route exact={true} path="/login" element={<Login></Login>} />
          <Route exact={true} path="/writePost" element={<Writepost></Writepost>} />
          <Route exact={true} path="/403" element={<Code403></Code403>} />
          <Route exact={true} path="/drafts" element={<Drafts></Drafts>} />
          <Route exact={true} path="/my" element={<My></My>} />
          <Route exact={true} path="/blogEngine" element={<BlogEngine></BlogEngine>} />
          <Route exact={true} path="*" element={<NotFound></NotFound>} />
        </Routes>
        <Footerweb/>

      </LoginInC.Provider>
    </Router>
  );
}

export default KRouter;
