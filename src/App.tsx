import React from 'react';
import './App.css';

function App() {
  return (
    <div className='app-wrapper'>
        <header className='header'>
            <img src="https://www.formabasket.com/wa-data/public/shop/products/33/61/6133/images/14785/14785.970.jpg" alt=""/>
        </header>
        <nav className='nav'>
            <div>
                <a>Profile</a>
            </div>
            <div>
                <a>Messages</a>
            </div>
            <div>
                <a>News</a>
            </div>
            <div>
                <a>Music</a>
            </div>
            <div>
                <a>Settings</a>
            </div>
        </nav>
        <div className='content'>
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWTNABIQRWeG_2QrZG-bg5g61ZgBytCh923w&usqp=CAU" alt=""/>
            </div>
            avatar+description
            <div>
                My posts
                <div>
                    New post
                </div>
                <div>
                    Post 1
                </div>
                <div>
                    Post 2
                </div>
                <img src="https://media.istockphoto.com/photos/abstract-curved-shapes-picture-id1340367001?b=1&k=20&m=1340367001&s=170667a&w=0&h=rEDszAkp7zRWyHBRPcIwFecc0QlbZNhc0sM62rjAa3U=" alt=""/>
            </div>
        </div>
    </div>
  );
}

export default App;
