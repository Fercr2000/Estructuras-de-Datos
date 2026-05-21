export type AccessType = "directo" | "secuencial" | "clave";
export type InternalStructure = "lineal" | "no-lineal";
export type MemoryManagement = "estatica" | "dinamica";
export type Dimensionality = "1d" | "multi";

export interface StructureEntry {
  slug: string;
  name: string;
  implemented: boolean;
  access: AccessType;
  internal: InternalStructure;
  memory: MemoryManagement;
  dimensionality: Dimensionality;
}

export const structures: StructureEntry[] = [
  { slug: "vector", name: "Vector", implemented: false, access: "directo", internal: "lineal", memory: "estatica", dimensionality: "1d" },
  { slug: "vector-dinamico", name: "Vector dinámico", implemented: false, access: "directo", internal: "lineal", memory: "dinamica", dimensionality: "1d" },
  { slug: "matriz", name: "Matriz", implemented: false, access: "directo", internal: "lineal", memory: "estatica", dimensionality: "multi" },
  { slug: "pila", name: "Pila", implemented: false, access: "directo", internal: "lineal", memory: "dinamica", dimensionality: "1d" },
  { slug: "cola", name: "Cola", implemented: false, access: "directo", internal: "lineal", memory: "dinamica", dimensionality: "1d" },
  { slug: "lista", name: "Lista enlazada", implemented: false, access: "secuencial", internal: "lineal", memory: "dinamica", dimensionality: "1d" },
  { slug: "matriz-dispersa", name: "Matriz dispersa", implemented: false, access: "secuencial", internal: "lineal", memory: "dinamica", dimensionality: "multi" },
  { slug: "arbol", name: "Árbol", implemented: false, access: "clave", internal: "no-lineal", memory: "dinamica", dimensionality: "1d" },
  { slug: "avl", name: "Árbol AVL", implemented: false, access: "clave", internal: "no-lineal", memory: "dinamica", dimensionality: "1d" },
  { slug: "hash", name: "Tabla hash", implemented: false, access: "clave", internal: "no-lineal", memory: "dinamica", dimensionality: "1d" },
  { slug: "heap", name: "Heap", implemented: false, access: "clave", internal: "no-lineal", memory: "dinamica", dimensionality: "1d" },
  { slug: "quadtree", name: "Quadtree", implemented: false, access: "clave", internal: "no-lineal", memory: "dinamica", dimensionality: "multi" },
  { slug: "grafo", name: "Grafo", implemented: false, access: "clave", internal: "no-lineal", memory: "dinamica", dimensionality: "multi" },
];