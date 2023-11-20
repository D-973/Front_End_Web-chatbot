// AboutPage.jsx
import React from 'react';

function AboutPage() {
  const containerStyle = {
    backgroundColor: '#a569bd',
    padding: '10px',
    textAlign: 'center',
  };

  const headingStyle = {
    color: '#fff', // Set text color to white or a contrasting color
  };

  const paragraphStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    lineHeight: '1.6',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px', // Adjust the top margin as needed
    textAlign: 'justify',
  };

  return (
    <div>
      <div style={containerStyle}>
        <h2 style={headingStyle}>About Us</h2>
      </div>
      {/* Add content for your About Us page */}
      <p style={paragraphStyle}>
        Selamat datang di situs web kami!<br />
        Tujuan utama kami dalam membuat web ini adalah memberikan sumber informasi yang bermanfaat kepada user. Kami berkomitmen untuk memberikan pengalaman online yang informatif, interaktif, dan mudah diakses. Web ini dirancang untuk menjadi sumber referensi yang berguna bagi mahasiswa, dosen, dan semua pihak yang terkait. Kami ingin memudahkan akses informasi mengenai beberapa peraturan dan kebijakan di lingkungan kampus. Dengan menggunakan web ini, Anda dapat dengan cepat menemukan informasi tentang peraturan kampus yang berkaitan dengan kehidupan akademis. Kami berharap web ini dapat menjadi panduan yang handal untuk mendukung kesuksesan studi dan kehidupan kampus Anda.<br />
        Tim pengembang web ini terdiri dari Dhea Nanlohy, Angeli Marselin Kolmate, Estefani Palari. Bersama-sama, kami berusaha menciptakan web yang informatif dan mudah digunakan. Kami berkomitmen untuk memberikan pengalaman terbaik kepada pengguna kami.
        <br />
        Jika Anda memiliki pertanyaan lebih lanjut atau ingin berhubungan dengan kami, silakan kirim email ke realemail.unklab.ac.id Kami senang mendengar dari Anda dan siap membantu!
      </p>
    </div>
  );
}

export default AboutPage;
