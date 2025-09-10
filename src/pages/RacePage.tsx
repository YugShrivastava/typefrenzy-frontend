import { useParams } from "react-router-dom";

function RacePage() {
    const { roomId } = useParams();
    console.log(roomId);

    return <div>Room id: {roomId}</div>;
}

export default RacePage;
