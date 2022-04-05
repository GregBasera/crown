import HeadInject from "../components/shared/HeadInject";
import TextInput from "../components/home/TextInput";
import Button from "../components/home/Button";

export default function Home() {
  return (
    <HeadInject>
      <div className="grid place-content-center h-screen bg-gradient-to-b from-purple-200 to-white">
        <div className="block rounded-md p-5 bg-purple-300">
          <h1 className="text-6xl text-center font-bold mb-5">Welcome!</h1>

          {/* form */}
          <TextInput label="Judge #" type="number" id={"iden"} />
          <TextInput label="Token" type="text" id={"token"} />
          <Button btText="Proceed" />
        </div>
      </div>
    </HeadInject>
  );
}
