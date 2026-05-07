import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Thoughts } from './components/Thoughts';
import { LifeLog } from './components/LifeLog';
import { Footer } from './components/Footer';
import { Snowfall } from './components/Snowfall';

export default function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-[#070b14] to-slate-950 text-slate-200">
      {/* 与 overflow 层兄弟，画在渐变之上且不被横向 overflow 裁剪 */}
      <Snowfall />
      <div className="relative z-10 min-h-screen overflow-x-hidden">
        <Header />
        <main>
          <Hero />
          <Portfolio />
          <LifeLog />
          <Thoughts />
        </main>
        <Footer />
      </div>
    </div>
  );
}
