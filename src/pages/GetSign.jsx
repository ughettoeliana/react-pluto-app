import SearchUserSign from "../components/GetUserSign";
import Navbar from "../components/NavBar";

const GetSign = () => {
  return (
    <>
    <Navbar/>
      <h2 className="text-2xl text-center py-4">Completa el formulario para continuar con el registro</h2>
      <SearchUserSign className="py-4"/>
    </>
  );
};

export default GetSign;
