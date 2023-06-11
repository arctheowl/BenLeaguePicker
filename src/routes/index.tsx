import { A } from "solid-start";
import { SortableVerticalListExample } from "~/components/Drag";
import * as fsPromise from "fs/promises";

export default function Home() {
  const onSubmit = async () => {
    console.log("submit");
    const myConfig: any = {
      age: 22,
      name: "Omari",
      password: "potpurri",
      permissions: ["read"],
    };
    const json = JSON.stringify(myConfig);
    await fsPromise.writeFile("~/config.json", json);
  };

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <SortableVerticalListExample />
      <button onClick={onSubmit}>Submit</button>
      <p class="my-4">
        <span>Home</span>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>{" "}
      </p>
    </main>
  );
}
