import HeaderLogo from "../assets/header-logo.png";
type Props = {};

const Header = ({}: Props) => {
  return (
    <header className="relative bg-white shadow-lg h-[100px]">
      <div className="flex flex-row h-full items-center justify-between container mx-auto">
        <img src={HeaderLogo} className="h-1/2 w-auto" />

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
          <button className="px-4 py-2 bg-white border border-gray-400 rounded hover:bg-gray-200">
            S'inscrire
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
