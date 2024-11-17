import useResultLogic from "../hooks/useResultLogic";
import Card from "./ui/Card";

const Result = (): JSX.Element => {
  const warikanPlan = useResultLogic();

  return (
    <Card logo="💰" title="割り勘方法">
      <div className="space-y-2">
        {warikanPlan.length > 0 ? (
          warikanPlan.map((transfer) => (
            <div
              key={`${transfer.from}-${transfer.to}-${transfer.amount}`}
              className="p-2 bg-green-100 rounded"
            >
              {transfer.from}さんが{transfer.to}さんに
              {transfer.amount}円を支払う
            </div>
          ))
        ) : (
          <div className="text-gray-500">まだ精算する内容がありません</div>
        )}
      </div>
    </Card>
  );
};

export default Result;
