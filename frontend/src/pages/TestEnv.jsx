import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import Split from "split.js";
import axios from "axios";

export default function TestEnv() {
  const [code, setCode] = useState("// Some comment");
  const [results, setResults] = useState(null);

  useEffect(() => {
    Split(["#activity", "#description"], {
      sizes: [50, 50],
      direction: "horizontal",
      gutterSize: 5,
    });
  }, []);

  function handleEditorCode(value, event) {
    setCode(value);
  }

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:3000/api/codes/", {
      code: code,
    });

    const results = res.data.results;
    setResults(results);
  };

  return (
    <div className="flex">
      <div className="flex flex-col" id="activity">
        <div className="toolbar w-full h-[50px] bg-gray-400 flex items-center justify-end px-4">
          <button className="submitbtn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <Editor
          height="400px"
          width="100%"
          defaultLanguage="javascript"
          defaultValue={code}
          theme="vs-dark"
          onChange={handleEditorCode}
        />
        <div className="test-area w-full h-32 bg-blue-300">
          <h1>
            Memory consumed :{" "}
            {results != null ? results.memory : "Nothing here"}
          </h1>
          <h1>
            Status consumed :{" "}
            {results != null ? results.status.description : "Nothing here"}
          </h1>
        </div>
      </div>
      <div className="bg-blue-500" id="description">
        Test
      </div>
    </div>
  );
}
