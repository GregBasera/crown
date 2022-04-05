import ListMaker from "../components/server/ListMaker";
import ResultsTable from "../components/server/ResultsTable";
import HeadInject from "../components/shared/HeadInject";
import { cons, juds, cris } from "../components/shared/endpoints";

export default function server() {
  return (
    <HeadInject>
      <div className="min-h-screen p-3 bg-gradient-to-b from-purple-200 to-white">
        <div className="grid items-start grid-cols-4 gap-2">
          <ListMaker title="Contestants" endpoint={cons} />
          <ListMaker title="Judges" endpoint={juds} />
          <ListMaker title="Criteria" endpoint={cris} />
        </div>

        <div className="border rounded-md p-2 mt-2 border-gray-200 bg-white">
          <ResultsTable />
        </div>
      </div>
    </HeadInject>
  );
}
