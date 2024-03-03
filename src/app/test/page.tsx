import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Test() {

    const notify = () => toast("Hello coders it was easy!");

  return (
    <div className="App">
       <ToastContainer />
      <h1>Lets use react-toastify</h1>

      <button onClick={notify}>Click me!</button>
    </div>
  );
}