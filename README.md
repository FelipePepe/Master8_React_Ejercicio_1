
# React and Hook useState & useEffect.

This is a example de states in React.

This programa have a inputbox and a list of members. The inputbox filter the value on the list of members.

We use the hooks useDebounce, this hook optimize the searchs, only call the function when timeout is over.


```bash
npm install use-debounce --save;
```

##### Code
_Type of members list_.
```typescript
export interface MemberEntity {
    name: string;
}
```

_Members list_.

```typescript
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
```

We initialize the states and the hook.

```typescript
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
```

**Let's explain this code**
```typescript
  const [filter, setFilter] = React.useState("");
```
We initialize the filter setter value to empty, the value that the default inputbox has when the component is loaded.

```typescript
 const [debounceFilter] = useDebounce(filter, 500);
```
The hook value is configured useDebounce, wait 500 milliseconds once the filter variable has stopped changing its value, later it will be seen, but filter is updated every time the inputbox changes its value.

In order to filter on a fixed list within the code, we are going to use 2 _typed lists_, one with the filtered value and the other with the original value that **will not be modified at any time**.

```typescript
 const [userOriginalCollection, setUserOriginalCollection] = React.useState<
    MemberEntity[]
  >(Members);

  const [userCollection, setUserCollection] = React.useState<MemberEntity[]>(
    Members
  );
```
These 2 typed lists are initialized with the value of the list Members.


We have reached the seed of the entire program, filtering the members according to the value typed in the inputbox.
```typescript
 React.useEffect(() => {
    setUserCollection(
      userOriginalCollection.filter((item) => item.name.includes(filter, 0))
    );
  }, [debounceFilter]);
```
The User Collection list will contain all the elements that contain the content of the inputbox.


```typescript
	<input value={filter} onChange={(e) => setFilter(e.target.value)} />
```
It remains to be seen how through tsx the inputbox is configured and its value is assigned to the filter variable.

```typescript
 <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul>
        {userCollection.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
```
To list the elements of the list, the map function is used to iterate between the elements of the list and it is added in each iteration to an html element of list &lt;li&gt; passing it a key and the name of the member user.