import { useEffect, useState } from "react";

type animal = {
  id: number;
  type: string;
  age: number;
  name: string;
};

function Animal({ type, age, name }: animal) {
  return (
    <div className="text-xl my-4 w-1/2 mx-auto text-left border p-4 rounded-2xl hover:bg-gray-500">
      <p>{type}</p>
      <p>{name}</p>
      <p>{age} years old</p>
    </div>
  );
}

function App() {
  const { animals, search } = useAnimal();

  return (
    <div className="flex flex-col mx-auto w-1/2 text-center my-10">
      <h1 className="text-6xl">Animal Farm</h1>
      <input
        type="text"
        placeholder="Search here"
        className="border-gray-500 border rounded-lg p-4 m-6 text-2xl"
        onChange={(e) => search(e.target.value)}
      />

      <p className="text-2xl m-4 text-left">Animals Count: {animals?.length}</p>

      <div>
        {animals.map((animal) => (
          <Animal key={animal.id} {...animal} />
        ))}
      </div>

      {animals.length === 0 && "No animals found"}
    </div>
  );
}

function useAnimal() {
  const [animals, setAnimals] = useState<animal[]>([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem("lastQuery") || "";
    search(lastQuery);
  }, []);

  const search = async (q: string) => {
    const response = await fetch(
      "http://localhost:8080?" + new URLSearchParams({ q })
    );
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem("lastQuery", q);
  };

  return { animals, search };
}

export default App;
