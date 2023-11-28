import SearchUserSign from "../components/GetUserSign";
import Navbar from "../components/NavBar";
import { useParams } from "react-router-dom";

const GetSign = () => {
  const  {newUserId}  = useParams();

  return (
    <>
      <Navbar />
      <div className="p-4 flex flex-col justify-center items-center">
        <h2 className="text-2xl py-4">Lugar, fecha y hora de tu nacimiento</h2>
        <p className="px-2">
          Es para determinar en que posición estaba el sol el día en que
          naciste.
        </p>
      </div>
      <SearchUserSign newUserId={newUserId} className="py-4 my-10" />
    </>
  );
};

export default GetSign;
