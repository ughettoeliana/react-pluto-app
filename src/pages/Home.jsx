/* eslint-disable react-refresh/only-export-components */
import mobileApp from "../assets/app-pluto.png";
import avatarAli from "../assets/avatar-ali.png";
import avatarRichard from "../assets/avatar-richard.png";
import avatarShanai from "../assets/avatar-shanai.png";
import fullPlutoLogo from "../assets/full-logo-pluto.svg";
import googlePlayLogo from "../assets/google-play-store.png";
import appleStoreLogo from "../assets/app-store-download.png";
import BaseButton from "../components/BaseButton";
import Navbar from "../components/NavBar";


function App() {
  return (
    <>
    <Navbar/>
      <section id="hero">
        <div className="container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row">
          <div className="flex flex-col mb-32 space-y-12 md:w-1/2">
            <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
              PLUTO transforma tu destino
            </h1>
            <p className="max-w-sm text-center text-lightGrey md:text-left">
              Explorá tu destino con Pluto. ¡Donde las estrellas te guían hacia
              el futuro!
            </p>
            <div className="flex justify-center md:justify-start">
              <BaseButton
                btnText="Descarga la App"
                className="bg-indigo-500 hover:bg-indigo-600 "
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <img src={mobileApp} alt="" />
          </div>
        </div>
      </section>

      <section id="features">
        <div className="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row">
          <div className="flex flex-col space-y-12 md:w-1/2">
            <h2 className="max-w-md text-4xl font-bold text-center md:text-left">
              ¿Porque elegir PLUTO?
            </h2>
            <p className="max-w-sm text-center text-lightGrey md:text-left">
              PLUTO te brinda no solo acceder a una aplicación de astrología,
              sino sumergirte en un viaje celestial personalizado y
              enriquecedor, respaldado por contenido de calidad y un equipo
              apasionado.
            </p>
          </div>

          <div className="flex flex-col space-y-8 md:w-1/2">
            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              <div className="rounded-l-full bg-lightBlue md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 rounded-full md:py-1 bg-indigo-500">
                    01
                  </div>
                  <h3 className="text-base text-black font-bold md:mb-4 md:hidden">
                    Carta Natal
                  </h3>
                </div>
              </div>

              <div>
                <h3 className="hidden mb-4 text-lg font-bold md:block">
                  Carta Natal
                </h3>
                <p className="text-lightGrey">
                  Información personalizada y profunda sobre los diversos rasgos
                  de tu personalidad y un desglose informativo de los ciclos
                  notables que puedes estar experimentando en cualquier momento:
                  pasado, presente y futuro.
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              <div className="rounded-l-full bg-lightBlue md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 rounded-full bg-indigo-500 md:py-1">
                    02
                  </div>
                  <h3 className="text-base font-bold text-black md:mb-4 md:hidden">
                    Vínculos
                  </h3>
                </div>
              </div>

              <div>
                <h3 className="hidden mb-4 text-lg font-bold md:block">
                  Vínculos
                </h3>
                <p className="text-lightGrey">
                  Explorá tu compatibilidad única con amigos e intereses
                  románticos. Obtené información valiosa sobre tus relaciones
                  más importantes o las de tus figuras públicas favoritas.
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              <div className="rounded-l-full bg-lightBlue md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 rounded-full md:py-1 bg-indigo-500">
                    03
                  </div>
                  <h3 className="text-base text-black font-bold md:mb-4 md:hidden">
                    Chat con Astrólogos
                  </h3>
                </div>
              </div>

              <div>
                <h3 className="hidden mb-4 text-lg font-bold md:block">
                  Chat con Astrólogos
                </h3>
                <p className="text-lightGrey">
                  Te ofrecemos un espacio exclusivo para chatear con astrólogos
                  profesionales que están aquí para responder a todas tus
                  preguntas astrológicas. Imagina tener acceso directo a valiosa
                  sabiduría astrológica en la palma de tu mano, listo para
                  guiarte en tu viaje cósmico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials">
        <div className="max-w-6xl px-5 mx-auto mt-32 text-center">
          <h2 className="text-4xl font-bold text-center">
            ¿Que dicen de PLUTO?
          </h2>
          <div className="flex flex-col mt-24 md:flex-row md:space-x-6">
            <div className="flex flex-col items-center p-6 space-y-6 rounded-lg bg-darkGrey md:w-1/3">
              <img src={avatarShanai} className="w-16 -mt-14" alt="" />
              <h5 className="text-lg font-bold">Shanai Jackson</h5>
              <p className="text-sm text-lightGrey">
                “Pluto es mi guía diaria hacia la astrología. Me encanta la
                precisión de las predicciones y cómo va más allá de lo básico.
                ¡Descubrir mi carta astral con Pluto fue revelador!
                Definitivamente, mi app astrológica favorita.”
              </p>
            </div>

            <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-darkGrey md:flex md:w-1/3">
              <img src={avatarAli} className="w-16 -mt-14" alt="" />
              <h5 className="text-lg font-bold">Ali Bravo</h5>
              <p className="text-sm text-lightGrey">
                “Pluto es mi rincón celestial. La diversidad de contenidos,
                desde la astrología tradicional hasta la védica, me permite
                explorar a fondo. Además, la interfaz es súper amigable. Pluto
                ha elevado mi comprensión astrológica y se ha convertido en mi
                compañero diario. ¡Increíble!”
              </p>
            </div>

            <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-darkGrey md:flex md:w-1/3">
              <img src={avatarRichard} className="w-16 -mt-14" alt="" />
              <h5 className="text-lg font-bold">Richard Watts</h5>
              <p className="text-sm text-lightGrey">
                “Como entusiasta de la astrología, siempre buscaba contenido en
                español de calidad. Pluto superó mis expectativas. La función de
                chat con astrólogos es increíble. Recibir orientación
                personalizada ha marcado la diferencia.”
              </p>
            </div>
          </div>
          <div className="my-16">
            {/* <BaseButton
              btnText={"Descarga la App"}
              className="bg-indigo-500 hover:bg-indigo-600 "
            /> */}
          </div>
        </div>
      </section>

      <section id="downloadApp" className="bg-blue">
        <div className="container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0 md:w-auto">
          <div>
            <h2 className="text-3xl font-bold text-center md:text-4xl md:max-w-xl">
              ¡Descarga la App ahora y comienza tu viaje astrológico!
            </h2>
            <div className="flex items-center justify-center py-5">
              <img src={fullPlutoLogo} alt="" className="object-cover h-40" />
            </div>
          </div>
          <div className="">
            <a>
              <img src={appleStoreLogo} className="h-16" />
            </a>
            <a>
              <img src={googlePlayLogo} className="h-16" />
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-veryDarkBlue">
        <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
          <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start">
            <div className="mx-auto my-6 text-center md:hidden">
              Copyright &copy; 2022, All Rights Reserved
            </div>
          </div>
          <div className="flex justify-around space-x-32">
            <div className="flex flex-col space-y-3 text-white">
              <a href="#" className="hover:text-indigo-500">
                Nosotros
              </a>
              <a href="#" className="hover:text-indigo-500">
                Aprende Astrologia
              </a>
              <a href="#" className="hover:text-indigo-500">
                Opiniones
              </a>
              <a href="#" className="hover:text-indigo-500">
                Contactanos
              </a>
            </div>
            <div className="flex flex-col space-y-3 text-white">
              <a href="#" className="hover:text-indigo-500">
                Comunidad
              </a>
              <a href="#" className="hover:text-indigo-500">
                Politica de Privacidad
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            Copyright &copy; 2022, All Rights Reserved
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
