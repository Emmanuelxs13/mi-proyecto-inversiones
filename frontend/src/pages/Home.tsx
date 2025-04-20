// Home.tsx
import Navbar from "../components/Navbar";
import Hero from "../components/Dashboard";
import Footer from "../components/Footer";
import Beneficios  from "../components/Beneficios";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        <Navbar />
        <Hero />
        <Beneficios />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
