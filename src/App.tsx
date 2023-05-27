import { useEffect } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import "./styles/app.css";
import axios from "axios";

function App() {
  const url = new URL(window.location.href);
  const path = url.pathname;
  const id = path.split("/").pop();

  async function getFilename(){
    const res = await axios.get(
      `https://localhost:7231/Record/single/${id}`,
    );
    return res.data.originalName;
  }

  useEffect(() => {
  
    if (!id) return;

    const getTransfer = async () => {
 
      const res = await axios.get(
        `https://localhost:7231/Record/download/${id}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", await getFilename());
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    getTransfer();
  }, [id]);

  return (
    <>
      <Header />
      <main>
        <div className="transfer">
          <Card />
        </div>
      </main>
    </>
  );
}

export default App;
