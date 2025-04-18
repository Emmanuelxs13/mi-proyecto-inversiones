// Home.tsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        <Navbar />
        <Hero />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
