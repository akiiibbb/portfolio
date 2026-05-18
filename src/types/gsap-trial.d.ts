declare module "gsap-trial/SplitText" {
  export interface SplitTextVars {
    type?: string;
    linesClass?: string;
  }

  export class SplitText {
    constructor(target: string | Element | Element[] | string[], vars?: SplitTextVars);
    chars: Element[];
    words: Element[];
    lines: Element[];
    revert(): void;
  }
}
