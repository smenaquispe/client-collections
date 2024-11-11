import { useState } from "react";
import { UserTable } from "./components/UserTable";
import { PostTable } from "./components/PostTable"; // Asegúrate de importar PostTable
import { Action } from "./components/Action";
import { Option } from "./components/Option";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeAction, setActiveAction] = useState(null);
  const [showUserTable, setShowUserTable] = useState(true); // Estado para alternar entre UserTable y PostTable

  const options = [
    { label: "Create User", actionName: "Create User", routeAction: "users", formKeys: ["first_name", "last_name", "email", "role", "status", "age"], description: "Create a new user." },
    { label: "Create Post", actionName: "Create Post", routeAction: "posts", formKeys: ["user_id", "title", "content"], description: "Create a new post." },

    { label: "After", actionName: "After by ID", routeAction: "users/after-id", formKeys: ["id"], description: "Returns the user after the id" },
    { label: "Average", actionName: "Average age", routeAction: "users/average-age", formKeys: [], description: "Returns the average age of the users." },
    { label: "Before", actionName: "Before by ID", routeAction: "users/before-id", formKeys: ["id"], description: "Returns the user before the id" },
    { label: "Chunk", actionName: "Chunk users", routeAction: "users/chunk-users", formKeys: ["size"], description: "Returns the users in chunks."},
    { label: "Chunk while", actionName: "Chunk while user age is less than", routeAction: "users/chunk-while-user-age-is-less-than", formKeys: ["age"], description: "Returns the users in chunks while the age is less than the given age." },
    { label: "Contains", actionName: "Contains Email", routeAction: "users/contains-email", formKeys: ["email"], description: "Check if the email exists in the users." },
    { label: "Contains one item", actionName: "Contains only one item", routeAction: "users/contains-only-one-item", formKeys: [], description: "Check if is only one user" },
    { label: "Count", actionName: "Count users", routeAction: "users/count-users", formKeys: [], description: "Returns the number of users." },
    { label: "Count by", actionName: "Count by role", routeAction: "users/count-by-role", formKeys: [], description: "Returns the number of users by role." },
    { label: "Cross Join", actionName: "Cross Join with posts", routeAction: "users/cross-join-with-posts", formKeys: [], description: "Returns the cross join of the users with posts" },
    { label: "DD", actionName: "Make dd", routeAction: "users/make-dd", formKeys: [], description: "Make dd" },
    { label: "Diff", actionName: "Diff With Admins", routeAction: "users/diff-with-admins", formKeys: [], description: "Get user that are not admins" },
    { label: "Diff Assoc", actionName: "Diff Assoc With Admins", routeAction: "users/diff-assoc-with-admins", formKeys: [], description: "Get user that are not admins" },
    { label: "Diff Keys", actionName: "Diff Keys With Admins", routeAction: "users/diff-keys-with-admins", formKeys: [], description: "Get user that are not admins" },
    { label: "Doesnt contain", actionName: "Doesnt contain Email", routeAction: "users/doesnt-contain-email", formKeys: ["email"], description: "Check if the email does not exists in the users." },
    { label: "Dot", actionName: "Dot", routeAction: "users/dot", formKeys: [], description: "Dot" },

    { label: "Dump Users", actionName: "Dump Users", routeAction: "users/dump-users", formKeys: [], description: "Dump all users data." },
    { label: "Duplicates", actionName: "Find Duplicates by Last Name", routeAction: "users/duplicates", formKeys: [], description: "Find duplicate users by last name" },
    { label: "Duplicates Strict", actionName: "Find Duplicates Strict by last name", routeAction: "users/duplicates-strict", formKeys: [], description: "Find duplicate users by last name strictly" },
    { label: "Each", actionName: "Each User Email", routeAction: "users/each", formKeys: [], description: "Give the email of each user" },
    { label: "Ensure", actionName: "Ensure User Exists", routeAction: "users/ensure", formKeys: [], description: "Ensure a user exists." },
    { label: "Every", actionName: "Check Every is Adult", routeAction: "users/every", formKeys: [], description: "Check if every user is adult." },
    { label: "First", actionName: "First User", routeAction: "users/first", formKeys: [], description: "Get the first user." },
    { label: "First or Fail", actionName: "First or Fail", routeAction: "users/first-or-fail", formKeys: [], description: "Get the first user or fail." },
    { label: "First Where", actionName: "First Where Last Name", routeAction: "users/first-where", formKeys: ["last_name"], description: "Get the first user with the same last name" },
    { label: "Flat Map", actionName: "Flat Map Users", routeAction: "users/flat-map", formKeys: [], description: "Apply a flat map transformation on users." },
    { label: "Flatten", actionName: "Flatten Attributes", routeAction: "users/flatten", formKeys: [], description: "Flatten user attributes." },
    { label: "Flip", actionName: "Flip Attributes", routeAction: "users/flip", formKeys: [], description: "Flip the keys and values of user attributes." },
    { label: "Forget", actionName: "Forget User", routeAction: "users/forget", formKeys: ["key"], description: "Forget a specific user by key." },
    { label: "For Page", actionName: "Paginate Users", routeAction: "users/for-page", formKeys: ["page", "size"], description: "Paginate the users collection." },
    { label: "Get", actionName: "Get User Attribute", routeAction: "users/get", formKeys: ["key"], description: "Get a specific user attribute by key." },
    { label: "Group By", actionName: "Group Users By", routeAction: "users/group-by", formKeys: ["attribute"], description: "Group users by a specific attribute." },
    { label: "Has", actionName: "Has Attribute", routeAction: "users/has", formKeys: ["key"], description: "Check if a user has a specific attribute." },
    { label: "Implode", actionName: "Implode Users", routeAction: "users/implode", formKeys: ["attribute"], description: "Implode users' attributes into a string." },
    { label: "Intersect", actionName: "Intersect Users", routeAction: "users/intersect", formKeys: ["ids"], description: "Get users present in both collections." },
    { label: "Intersect Assoc", actionName: "Intersect Assoc Users", routeAction: "users/intersect-assoc", formKeys: [], description: "Get associative intersection of users." },
    { label: "Is Empty", actionName: "Is Empty Collection", routeAction: "users/is-empty", formKeys: [], description: "Check if the users collection is empty." },
    { 
      label: "Is Not Empty", 
      actionName: "Check if Collection is Not Empty", 
      routeAction: "users/is-not-empty", 
      formKeys: [], 
      description: "Check if the users collection is not empty." 
  },
  { 
      label: "Join", 
      actionName: "Join Collection", 
      routeAction: "users/join", 
      formKeys: ["separator"], 
      description: "Join user names with a specified separator." 
  },
  { 
      label: "Key By", 
      actionName: "Key Collection By Email", 
      routeAction: "users/key-by", 
      formKeys: [], 
      description: "Re-key the collection using the user's email as the key." 
  },
  { 
      label: "Keys", 
      actionName: "Get Keys of Collection", 
      routeAction: "users/keys", 
      formKeys: [], 
      description: "Get all keys in the users collection." 
  },
  { 
      label: "Last", 
      actionName: "Get Last User by Condition", 
      routeAction: "users/last", 
      formKeys: ["email"], 
      description: "Get the last user in the collection matching the provided email." 
  },
  { 
      label: "Lazy", 
      actionName: "Lazy Load Collection", 
      routeAction: "users/lazy", 
      formKeys: [], 
      description: "Process the user collection lazily." 
  },
  { 
      label: "Macro", 
      actionName: "Use Macro on Collection", 
      routeAction: "users/macro", 
      formKeys: [], 
      description: "Get user names using a custom macro." 
  },
  { 
      label: "Make", 
      actionName: "Make Collection", 
      routeAction: "users/make", 
      formKeys: [], 
      description: "Make a new collection from users." 
  },
  { 
      label: "Map", 
      actionName: "Map Collection to Uppercase Names", 
      routeAction: "users/map", 
      formKeys: [], 
      description: "Map each user's name to uppercase in the collection." 
  },
  { 
      label: "Map Into", 
      actionName: "Map Collection Into User Class", 
      routeAction: "users/map-into", 
      formKeys: [], 
      description: "Map each item in the collection into a User class instance." 
  },
  { 
      label: "Map Spread", 
      actionName: "Map Collection with Spread", 
      routeAction: "users/map-spread", 
      formKeys: [], 
      description: "Map collection elements with name and email spread." 
  },
  { 
      label: "Map To Groups", 
      actionName: "Group Users by Role", 
      routeAction: "users/map-to-groups", 
      formKeys: [], 
      description: "Group users by role in the collection." 
  },
  { 
      label: "Map With Keys", 
      actionName: "Map Collection with Keys", 
      routeAction: "users/map-with-keys", 
      formKeys: [], 
      description: "Map the collection with user IDs as keys." 
  },
  { 
      label: "Max", 
      actionName: "Get Max User Age", 
      routeAction: "users/max", 
      formKeys: [], 
      description: "Find the maximum user Age in the collection." 
  },
  { 
      label: "Median", 
      actionName: "Get Median User Age", 
      routeAction: "users/median", 
      formKeys: [], 
      description: "Get the median user Age in the collection." 
  },
  { 
    label: "Merge", 
    actionName: "Merge Collections", 
    routeAction: "users/merge", 
    formKeys: ["additional_data"], 
    description: "Merge the user collection with additional data." 
},
{ 
    label: "Merge Recursive", 
    actionName: "Merge Collections Recursively", 
    routeAction: "users/merge-recursive", 
    formKeys: ["additional_data"], 
    description: "Recursively merge the user collection with additional data." 
},
{ 
    label: "Min", 
    actionName: "Get Min User ID", 
    routeAction: "users/min", 
    formKeys: [], 
    description: "Get the minimum user ID from the collection." 
},
{ 
    label: "Mode", 
    actionName: "Get Mode of User Role", 
    routeAction: "users/mode", 
    formKeys: [], 
    description: "Get the most frequent role in the users collection." 
},
{ 
    label: "Multiply", 
    actionName: "Multiply User IDs", 
    routeAction: "users/multiply", 
    formKeys: ["multiplier"], 
    description: "Multiply the user IDs by a given multiplier." 
},
{ 
    label: "Nth", 
    actionName: "Get Nth User", 
    routeAction: "users/nth", 
    formKeys: ["index"], 
    description: "Get the Nth user from the collection based on the index." 
},
{ 
    label: "Only", 
    actionName: "Get Only Specific Fields", 
    routeAction: "users/only", 
    formKeys: ["keys"], 
    description: "Retrieve only the specified keys from the user collection." 
},
{ 
    label: "Pad", 
    actionName: "Pad User Collection", 
    routeAction: "users/pad", 
    formKeys: ["size", "value"], 
    description: "Pad the user collection to a specific size with a given value." 
},
{ 
    label: "Partition", 
    actionName: "Partition Users by Role", 
    routeAction: "users/partition", 
    formKeys: ["condition"], 
    description: "Partition the user collection based on a specified condition." 
},
{ 
    label: "Percentage", 
    actionName: "Get Role Percentage", 
    routeAction: "users/percentage", 
    formKeys: ["key"], 
    description: "Calculate the percentage of users with a specific role in the collection." 
},
{ 
    label: "Pipe", 
    actionName: "Pipe Collection", 
    routeAction: "users/pipe", 
    formKeys: [], 
    description: "Apply a pipe to transform the collection, extracting user names." 
},
{ 
    label: "Pipe Into", 
    actionName: "Pipe Into User Class", 
    routeAction: "users/pipe-into", 
    formKeys: [], 
    description: "Apply a pipe and convert the collection items into User class instances." 
},
{ 
    label: "Pipe Through", 
    actionName: "Pipe Through Collection", 
    routeAction: "users/pipe-through", 
    formKeys: [], 
    description: "Apply multiple pipes in sequence to transform the collection." 
},
{ 
    label: "Pluck", 
    actionName: "Pluck User Names", 
    routeAction: "users/pluck", 
    formKeys: ["key"], 
    description: "Pluck the specified key (e.g., 'name') from the user collection." 
},
{ 
    label: "Pop", 
    actionName: "Pop Last User", 
    routeAction: "users/pop", 
    formKeys: [], 
    description: "Remove and return the last user in the collection." 
},
    { label: "Append Attribute", actionName: "Append Attribute", routeAction: "users/append-attribute", formKeys: [], description: "Append an attribute to all users. In this case the attribute is 'FullName'." },
  ];

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      {/* Sección izquierda */}
      <div className="w-1/3 p-4 bg-white rounded-lg shadow-md mr-4 overflow-y-auto">
        {activeAction ? (
          <>
            {/* Botón de retroceso */}
            <button
              onClick={() => setActiveAction(null)}
              className="mb-4 text-blue-600 underline"
            >
              ⟵ Back to Options
            </button>
            {/* Componente Action personalizado */}
            <Action
              actionName={activeAction.actionName}
              routeAction={activeAction.routeAction}
              formKeys={activeAction.formKeys}
              description={activeAction.description}
              setResult={setResult}
              setError={setError}
              setLoading={setLoading}
            />
          </>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Options</h2>
            {options.map((option, index) => (
              <Option
                key={index}
                label={option.label}
                onClick={() => setActiveAction(option)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sección derecha: Selector y tablas */}
      <div className="flex flex-col w-2/3">
        {/* Interruptor para alternar entre UserTable y PostTable */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowUserTable(!showUserTable)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
          >
            {showUserTable ? "Show Post Table" : "Show User Table"}
          </button>
        </div>

        {/* Condicional para mostrar UserTable o PostTable */}
        <div className="flex-grow p-4 bg-white rounded-lg shadow-md mb-4 overflow-y-auto">
          {showUserTable ? <UserTable result={result} /> : <PostTable result={result} />}
        </div>

        {/* Result con scroll */}
        <div className="h-2/3 p-4 bg-white rounded-lg shadow-md overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">Result</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error.message}</p>
          ) : result ? (
            <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;