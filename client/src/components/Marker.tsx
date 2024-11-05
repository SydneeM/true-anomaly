import satIcon from "./sat-removebg.png"

interface MarkerProps {
  key: number;
  lat: number;
  lng: number;
  markerId: string;
  onClick: () => void
}

const Marker = (props: MarkerProps) => {
  return (
    <img src={satIcon} className="sat-icon" onClick={props.onClick}/>
  );
};

export default Marker;