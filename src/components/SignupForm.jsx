import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


const SignupForm = () => {
  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignup((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
     name: signup.username,
      email: signup.email,
      password: signup.password,
    });

    if (error) {
      throw new Error(error.message);
    } else {
      console.log(signup);

      setSignup({
        username: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <>
      <AnimatePresence>
        <motion.form
          className="flex flex-col md:w-1/2 items-center m-auto mt-50 rounded-2xl shadow-2xl p-2 gap-2"
          initial={{ opacity: 1, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            value={signup.username}
            placeholder="enter a username..."
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            value={signup.email}
            placeholder="enter email..."
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            name="password"
            value={signup.password}
            placeholder="enter password..."
            onChange={handleChange}
            required
          />
          <motion.button
            type="submit"
            className="btn btn-primary "
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Signup
          </motion.button>
        </motion.form>
      </AnimatePresence>
    </>
  );
};

export default SignupForm;
