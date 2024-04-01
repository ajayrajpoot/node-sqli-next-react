// this pase conver into react page
import React  from 'react';
import { Link  } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const Header: React.FC = () => {

  const scrollToForm = (s:string) => {
    if (typeof document !== 'undefined') {
      if(s=='frm') {

        const element = document.getElementById('pstatus');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else if(s=='ps') {

        const element = document.getElementById('sStatus');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };
 
  
  return (
    <> 
     <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/">
            {/* <a className="navbar-brand"> */}
              <img
                src="https://melbet.com.in/wp-content/uploads/2021/10/cropped-melbet-app.png"
                className="img-fluid"
                width={500}
                height={300}
                style={{ width: '40%' }}
                alt="Logo"
              />
            {/* </a> */}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav align-items-center">
              
              {/* <li className="nav-item">
                <button onClick={() => scrollToForm('frm')} className="btn btn-primary mx-lg-2 my-lg-0 my-2" > Payment  </button>
              </li>
              <li className="nav-item">
                <button onClick={() => scrollToForm('ps')} className="btn btn-danger mx-lg-2 my-lg-0 my-2" >  Payment Status  </button>
              </li> */}
              
            <li className="nav-item">
              <button  onClick={() => scrollToForm('frm')} className="btn btn-primary mx-lg-2 my-lg-0 my-2"><a href="#pstatus"  className="nav-link"> Payment</a></button>
            </li>
            <li className="nav-item">
              <button onClick={() => scrollToForm('ps')} className="btn btn-danger mx-lg-2 my-lg-0 my-2"><a href="#" className="nav-link">Payment Status</a></button>
            </li>
            <li className="nav-item">
              <button   className="btn btn-danger mx-lg-2 my-lg-0 my-2"><Link to="/login" className="nav-link">Login</Link></button>
            </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    </>)
}

export default Header;

 