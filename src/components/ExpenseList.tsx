import useWarikanStore from "../store/useWarikanStore";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { Trash2 } from "lucide-react";

const ExpenseList = (): JSX.Element => {
  const members = useWarikanStore((state) => state.members);
  const expenses = useWarikanStore((state) => state.expenses);
  const inputExpense = useWarikanStore((state) => state.inputExpense);
  const updateInputExpense = useWarikanStore(
    (state) => state.updateInputExpense
  );
  const addExpense = useWarikanStore((state) => state.addExpense);
  const removeExpense = useWarikanStore((state) => state.removeExpense);

  return (
    <Card logo="✏️" title="支払い記録">
      {/* フォーム */}
      <select
        className="p-2 border rounded w-full"
        value={inputExpense.paidBy}
        onChange={(e) =>
          updateInputExpense({ ...inputExpense, paidBy: e.target.value })
        }
      >
        <option value="">支払った人</option>
        {members.map(
          (member) =>
            member && (
              <option key={member} value={member}>
                {member}
              </option>
            )
        )}
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input
          placeholder="内容"
          value={inputExpense.description}
          onChange={(e) =>
            updateInputExpense({ ...inputExpense, description: e.target.value })
          }
          className="h-10 px-2 border rounded"
        />
        <input
          type="number"
          min={0}
          placeholder="金額"
          value={inputExpense.amount || ""}
          onChange={(e) =>
            updateInputExpense({
              ...inputExpense,
              amount: e.target.valueAsNumber,
            })
          }
          className="h-10 px-2 border rounded"
        />
      </div>
      <Button onClick={addExpense} className="w-full">
        記録する
      </Button>

      {/* 支払い一覧 */}
      <div className="space-y-2">
        {expenses.map((expense) => (
          <div
            key={expense.description}
            className="flex justify-between items-center p-2 bg-gray-50 rounded"
          >
            <span>
              {expense.paidBy}が{expense.description}で{expense.amount}
              円支払い
            </span>
            <Button onClick={() => removeExpense(expense.description)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ExpenseList;
