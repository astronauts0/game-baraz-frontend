import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { EasePack } from "gsap/EasePack";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin, EasePack);

const GsapWrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default GsapWrapper;
