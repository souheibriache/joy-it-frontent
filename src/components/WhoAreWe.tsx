import whoareweImage from "../assets/who-are-we.png";
type Props = {};

const WhoAreWe = ({}: Props) => {
  return (
    <div className="container mx-auto h-[80vh] flex items-center justify-center">
      <div className="w-1/2 h-1/2 bg-purple bg-opacity-50 rounded-tl-[50px] relative">
        <div className="bg-white rounded-[20px] w-2/3 p-16 flex flex-col gap-5 shadow-black/50 shadow-lg b bottom-0 -translate-x-[30px] translate-y-[20px] absolute">
          <h1 className="font-bold text-3xl text-purple">
            Qui somme-nous JoyIt ?
          </h1>
          <p>
            JoyIt est une plateforme dédiée aux entreprises qui souhaitent
            améliorer le bien-être et la cohésion de leurs équipes. Grâce à un
            abonnement mensuel, accédez à des crédits pour réserver et planifier
            des activités, snacks, et services adaptés à vos besoins. Simple,
            flexible, et clé en main !
          </p>
        </div>

        <img
          src={whoareweImage}
          className="absolute h-[50vh] rounded-full rounded-bl-none right-0 top-0 translate-x-1/4 -translate-y-1/4"
        />
      </div>
    </div>
  );
};

export default WhoAreWe;
