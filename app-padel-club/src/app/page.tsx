import Calendar from '../components/Calendario/Calendario';
import Filtro from '../components/Calendario/Filtro';

import Header from '../components/ui/Header';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col p-5 bg-zinc-50 font-sans">
      <Header />
      <Filtro />
      <Calendar />
    </div>
  );
}
