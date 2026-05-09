export default function Integration() {
  return (
    <section className="py-24 px-6 w-full relative z-10 bg-brand-black flex flex-col items-center">
      
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Change one line of code.
        </h2>
        <p className="text-zinc-400 text-lg">No heavy SDKs. Just point your existing OpenAI client to the ARKA proxy.</p>
      </div>

      {/* The Fake Code Window */}
      <div className="w-full max-w-3xl rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-2xl">
        
        {/* Window Header */}
        <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <p className="ml-4 text-xs font-mono text-zinc-500">app/api/chat/route.ts</p>
        </div>

        {/* Code Content */}
        <div className="p-6 overflow-x-auto text-sm md:text-base font-mono leading-relaxed">
          <pre>
            <code>
              <span className="text-purple-400">import</span> <span className="text-blue-400">OpenAI</span> <span className="text-purple-400">from</span> <span className="text-green-300">'openai'</span>;<br /><br />
              <span className="text-zinc-500">{`// 1. Initialize the client`}</span><br />
              <span className="text-purple-400">const</span> <span className="text-blue-400">openai</span> <span className="text-white">=</span> <span className="text-purple-400">new</span> <span className="text-yellow-200">OpenAI</span>({`{`}<br />
              {`  `}apiKey: process.env.<span className="text-blue-300">OPENAI_API_KEY</span>,<br />
              <span className="text-zinc-500 bg-red-500/10 block px-2 -mx-2">{`  // baseURL: 'https://api.openai.com/v1',  <-- Remove this`}</span>
              <span className="text-green-400 bg-green-500/10 block px-2 -mx-2">{`  baseURL: 'https://proxy.arka.com/v1',      <-- Add ARKA`}</span>
              {`}`});<br /><br />
              <span className="text-zinc-500">{`// 2. ARKA automatically intercepts and routes!`}</span><br />
              <span className="text-purple-400">const</span> <span className="text-blue-400">response</span> <span className="text-white">=</span> <span className="text-purple-400">await</span> openai.chat.completions.<span className="text-yellow-200">create</span>({`{`}<br />
              {`  `}model: <span className="text-green-300">'gpt-4'</span>, <span className="text-zinc-500">{`// ARKA will swap to 3.5 if simple enough`}</span><br />
              {`  `}messages: [{`{`} role: <span className="text-green-300">'user'</span>, content: <span className="text-green-300">'Hello!'</span> {`}`}],<br />
              {`}`});
            </code>
          </pre>
        </div>
      </div>

    </section>
  );
}