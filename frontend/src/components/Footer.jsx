// components/Footer.jsx
function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-10">
      <aside>
        <p className="font-bold text-lg font-fantasy text-primary">
          Réservation de Salle
        </p>
        <p className="text-base-content/60">
          © {new Date().getFullYear()} La Plateforme_ - Tous droits réservés
        </p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a className="link link-hover link-accent">À propos</a>
          <a className="link link-hover link-accent">Contact</a>
          <a className="link link-hover link-accent">Mentions légales</a>
        </div>
      </nav>
    </footer>
  );
}
export default Footer;
