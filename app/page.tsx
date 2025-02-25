import Image from "next/image";
import KatexSpan from "./components/visualizing/math";

export default function Home() {
  return (
    <div>
      <KatexSpan text={"$$c = \\pm\\sqrt{a^2 + b^2}$$"} />
    </div>
  );
}
