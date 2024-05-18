import { useState } from 'react';

function App() {
  const [image, setImage] = useState("");
  const [text, setText] = useState("");

  async function query(data) {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: JSON.stringify({ inputs: data }), 
        }
      );
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
    } catch (error) {
      console.error("Error fetching the image:", error);
    }
  }

  return (
    <>
      <div className='flex justify-center items-center flex-col mt-16'>
        <h1 className='text-5xl text-yellow-900 font-extrabold italic mb-5'>Image Generation App</h1>
        <div className='flex '>
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            className=' border-[1px] border-black w-[400px] h-[50px] px-3 outline-none rounded-xl'
          />
          <button
            onClick={() => query(text)}
            className="bg-blue-700 text-white ml-3 font-medium w-44 hover:bg-blue-500 rounded-xl "
          >
            Generate
          </button>
        </div>
        
      </div>
      <div className=' flex justify-center items-center mt-10'>
        {image && <img className='h-[400px] w-[400px] rounded-2xl shadow-2xl' src={image} alt="Generated" />}
      </div>
    </>
  );
}

export default App;
