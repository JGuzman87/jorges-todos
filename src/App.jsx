import { useQuery } from "@tanstack/react-query"
import { supabase } from "./lib/supabaseClient";
import Todo from './components/Todo';
import './App.css'

function App() {

    const getList = async () => {
      const { data,  error } = await supabase
        .from("list")
        .select('*');
      if (error) {
        throw new Error("Error fetching data");
      }
      return data;
    };
  

  const {data, isLoading, error} = useQuery({queryKey: ['list'], queryFn: getList} );

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error ocurred: {error.message}</p>

  return (
    <>
    <Todo  />
    <ul>
      {data.map(list => <li key={list.id}>{list.name}</li>)}
    </ul>
    </>
  )
}

export default App
