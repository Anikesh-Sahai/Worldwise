import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BckButton() {

    const navigate = useNavigate()

    return <Button
        type="back"
        onclick={(e) => {
            e.preventDefault();
            navigate(-1);
        }}
    >
        &larr; Back
    </Button>
}

export default BckButton