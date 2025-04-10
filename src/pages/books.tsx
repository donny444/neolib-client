import { useEffect, useState, JSX } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

export default function Books(): JSX.Element {
  const [data, setData] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/server/books/", {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
            params: {
              category: category,
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
  }, [category]);

  return (
    <div>
      <h1>All Books in the Library</h1>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">All</option>
        <option value="fiction">Fiction</option>
        <option value="nonfiction">Non-Fiction</option>
        <option value="literature">Literature</option>
        <option value="business">Business</option>
        <option value="others">Others</option>
      </select>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
}
