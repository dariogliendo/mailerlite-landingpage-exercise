export interface Content {
  id: number;
  type: string;
  text?: string;
  src?: string;
  alt?: string; 
  pendingConfiguration: boolean
}

export type DynamicColorOptions = "green" | "red"