import React from "react";
import { useDebounce } from "use-debounce";
import { MemberEntity } from "./model";

const Members: MemberEntity[] = [
  { name: "María" },
  { name: "Paco" },
  { name: "Pepe" },
  { name: "Penelope" },
  { name: "Juan" },
  { name: "Javier" },
  { name: "Ana" },
  { name: "Belen" },
];

export const MyComponent: React.FC = () => {
  const [filter, setFilter] = React.useState("");

  const [debounceFilter] = useDebounce(filter, 500);

  const [userOriginalCollection, setUserOriginalCollection] = React.useState<
    MemberEntity[]
  >(Members);

  const [userCollection, setUserCollection] = React.useState<MemberEntity[]>(
    Members
  );

  React.useEffect(() => {
    setUserCollection(Members);
  }, []);

  React.useEffect(() => {
    setUserCollection(
      userOriginalCollection.filter((item) => item.name.includes(filter, 0))
    );
  }, [debounceFilter]);

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
