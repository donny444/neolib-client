import { useEffect, useState, JSX } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

export default function Books(): JSX.Element {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/server/books/", {
            headers: {
              "Access-Control-Allow-Origin": "*",
            }
          }
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>All Books in the Library</h1>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
}
