import LoginForm from "../components/LoginForm";

const Home = ({ session }) => {
  return <>{!session && <LoginForm />}</>;
};

export default Home;
