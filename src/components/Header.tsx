type Props = {};

const Header = ({}: Props) => {
  return (
    <header className="relative bg-gray-100">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-2xl font-bold">Logo</div>

        <nav className="flex space-x-6">
          <a
            href="#services"
            className="text-gray-600 hover:text-gray-900 font-bold"
          >
            Nos services
          </a>
          <a href="#blog" className="text-gray-600 hover:text-gray-900">
            Blog
          </a>
          <a href="#about" className="text-gray-600 hover:text-gray-900">
            À Propos
          </a>
          <a href="#contact" className="text-gray-600 hover:text-gray-900">
            Nous contacter
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <a href="#login" className="text-gray-600 hover:text-gray-900">
            Se connecter
          </a>
          <div className="border border-l border-slate-900 h-8 w-0"></div>
          <button className="px-4 py-2 bg-white border border-gray-400 rounded hover:bg-gray-200">
            S'inscrire
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
