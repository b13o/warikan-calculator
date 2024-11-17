import ExpenseList from "./components/ExpenseList";
import MemberList from "./components/MemberList";
import Result from "./components/Result";

function App(): JSX.Element {
  return (
    <>
      <div className="min-h-screen pt-16 pb-8 space-y-8 px-16 bg-gradient-to-br from-slate-50 to-sky-200">
        {/* Header */}
        <div className="space-y-8">
          <h1 className="text-5xl font-bold">Warikan Culculator</h1>
          <p className="text-gray-700">
            メンバーと、立て替えた記録を記入してください。
            <br />
            自動で最適な精算方法を算出します！
          </p>
        </div>
        <div className="flex space-x-8 justify-center">
          <MemberList />
          <ExpenseList />
          <Result />
        </div>
      </div>
    </>
  );
}

export default App;
