// import React from 'react';
// import '../stylesheet/index.css';
// const profile = process.env.PUBLIC_URL + '/images/books2.jpg';

// export default function Home() {
//     return <div className="container">
//         <div className="motto"><h1>Tutoring Initiative Network for Diligent Education and Resources</h1>
//         </div>
//         <div className="background">

//         </div>

//         </div>;
// }

import React from 'react';
import '../stylesheet/index.css';
const profile = process.env.PUBLIC_URL + '/images/books2.jpg';

export default function Home() {
    const backgroundStyle = {
        backgroundImage: `url(${profile})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        height: '100vh', // Adjust this value as needed
    };

    return (
        <div className="container">
            <div className="motto">
                <h1>Tutoring Initiative Network for Diligent Education and Resources</h1>
            </div>
            <div className="background" style={backgroundStyle}>
                {/* Content for the background */}
            </div>
        </div>
    );
}