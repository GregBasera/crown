import ListMaker from "../components/server/ListMaker";
import ResultsTable from "../components/server/ResultsTable";
import HeadInject from "../components/shared/HeadInject";
import { cons, juds, cris } from "../components/shared/endpoints";
import MiscMaker from "../components/server/MiscMaker";

export default function server() {
  return (
    <HeadInject>
      <div className="min-h-screen p-3 bg-gradient-to-b from-purple-200 to-white">
        <div className="grid items-start grid-cols-4 gap-2">
          <ListMaker title="Contestants" endpoint={cons} />
          <ListMaker title="Judges" endpoint={juds} />
          <ListMaker title="Criteria" endpoint={cris} />
          <MiscMaker title="Miscellaneous" />
        </div>

        <ResultsTable />
      </div>
    </HeadInject>
  );
}
