import AuthForm from "components/AuthForm";
import AuthSocial from "components/AuthSocial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHatCowboy } from "@fortawesome/free-solid-svg-icons";
const Authorization = () => {
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faHatCowboy}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <AuthSocial />
    </div>
  );
};

export default Authorization;
