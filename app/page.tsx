export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="font-serif text-5xl md:text-6xl font-normal tracking-tight">
          Estructuras de <span className="text-gradient-amber">Datos</span>
        </h1>
        <p className="text-ink-soft text-lg leading-relaxed">
          Aprende estructuras de datos en C++ paso a paso, con visualizaciones
          interactivas y código real ejecutado línea a línea.
        </p>
        <hr className="divider-gradient w-32 mx-auto" />
        <p className="font-mono text-sm text-ink-mute">
          // Si ves esto bien formateado, la estética está lista.
        </p>
      </div>
    </main>
  );
}