import type { ComponentType } from "react";
import type { CaseDemoProps } from "./types";
import { FileConverterDemo } from "./FileConverterDemo";
import { GravityDLDemo } from "./GravityDLDemo";
import { AudiobookDemo } from "./AudiobookDemo";

export const caseDemos: Record<string, ComponentType<CaseDemoProps>> = {
  "file-converter": FileConverterDemo,
  gravitydl: GravityDLDemo,
  audiobook: AudiobookDemo,
};
