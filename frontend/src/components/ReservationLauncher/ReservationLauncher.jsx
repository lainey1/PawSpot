import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ReservationLauncher() {
  const { spotId } = useParams();
  const spot = useSelector((store) => store.spots[spotId]);
  console.log(spot);

  return <h2>Reducer</h2>;
}

export default ReservationLauncher;
