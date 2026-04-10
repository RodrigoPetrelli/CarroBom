import { Routes, Route, Link } from 'react-router-dom';
import ListPage   from './pages/ListPage';
import FormPage   from './pages/FormPage';
import DetailPage from './pages/DetailPage';
import AboutPage  from './pages/AboutPage';
import Footer     from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">Carro<span>Bom</span></Link>
        <nav className="nav">
          <Link to="/sobre" className="nav-link">Sobre</Link>
          <Link to="/novo" className="btn-novo">+ Novo Carro</Link>
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route path="/"           element={<ListPage />}   />
          <Route path="/novo"       element={<FormPage />}   />
          <Route path="/editar/:id" element={<FormPage />}   />
          <Route path="/carros/:id" element={<DetailPage />} />
          <Route path="/sobre"      element={<AboutPage />}  />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
