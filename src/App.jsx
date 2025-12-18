import { useQuery } from "@tanstack/react-query"
import { supabase } from "@supabase/supabase-js";
import Todo from './components/Todo';
import './App.css'

function App() {

    const getList = async () => {
      const {  error } = await supabase
        .from("list")
        .select('*');
      if (error) {
        alert(error.message);
      }
    };
  

  const {data, isLoading, error} = useQuery({queryKey: ['list'], queryFn: getList} );

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error ocurred: {error.message}</p>

  return (
    <>
    <Todo  />
    <ul>
      
    </ul>
    </>
  )
}

export default App
