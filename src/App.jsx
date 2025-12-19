import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "./lib/supabaseClient";
import Todo from "./components/Todo";
import "./App.css";

function App() {


  const getList = async () => {
    console.log("FETCHING FROM SERVER");

    const { data, error } = await supabase.from("list").select("*");
    if (error) {
      throw new Error("Error fetching data");
    }
    return data;
  };



  const deleteList = async (id) => {
    console.log(id)
    const { data, error } = await supabase
      .from("list")
      .delete()
      .eq("id", id)
      .select()
      ;

    if (error) {
      throw new Error("unable to delete list");
    }
    console.log(data)
    return data;
  };

  

  const { data, isLoading, error } = useQuery({
    queryKey: ["list"],
    queryFn: getList,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error ocurred: {error.message}</p>;

  return (
    <div className="flex flex-col gap-2">
      <Todo />
      <ul className="flex flex-col gap-2 w-md">
        {data.map((list) => (
          <motion.li
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            key={list.id}
            className="flex justify-between bg-red-200 text-start p-2"
          >
            {list.name}
            <button className="btn w-fit" onClick={() => deleteList(list.id)}>
              Delete
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default App;
