import React from "react";
import { useDebounce } from "use-debounce";
import { useWhyDidYouUpdate } from "./useWhyDidYouUpdate";

export const MyComponent = () => {
  const [filter, setFilter] = React.useState("");

  const [debounceFilter] = useDebounce(filter, 500);

  const [originalUserCollection, setOriginalUserCollection] = React.useState([
    { name: "María" },
    { name: "Paco" },
    { name: "Pepe" },
    { name: "Penelope" },
    { name: "Juan" },
    { name: "Javier" },
    { name: "Ana" },
    { name: "Belen" },
  ]);
  const [userCollection, setUserCollection] = React.useState([]);

  React.useEffect(() => {
    setUserCollection(
      originalUserCollection.filter((item) => item.name.includes(filter, 0))
    );
  }, [debounceFilter]);

  useWhyDidYouUpdate("MyComponent", userCollection);

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul>
        {userCollection.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
