// Footer.tsx
// Pie de página con información y derechos de autor

const Footer = () => {
    return (
      <footer className="bg-blue-700 text-white text-center py-6 mt-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} Inversiones J.A. Todos los derechos
          reservados.
        </p>
      </footer>
    );
  };
  
  export default Footer;
  