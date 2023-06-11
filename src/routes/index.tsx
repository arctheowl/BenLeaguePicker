import { A } from "solid-start";
import { SortableVerticalListExample } from "~/components/Drag";

export default function Home() {
  const onSubmit = async () => {
    console.log("submit");
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
