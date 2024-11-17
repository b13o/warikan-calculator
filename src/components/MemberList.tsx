import Card from "./ui/Card";
import Button from "./ui/Button";
import { Plus } from "lucide-react";
import useWarikanStore from "../store/useWarikanStore";

const MemberList = (): JSX.Element => {
  // const { members, inputMember, updateInputMember, addMember } =
  //   useWarikanStore();
  const members = useWarikanStore((state) => state.members);
  const inputMember = useWarikanStore((state) => state.inputMember);
  const updateInputMember = useWarikanStore((state) => state.updateInputMember);
  const addMember = useWarikanStore((state) => state.addMember);

  return (
    <Card logo="👥" title="メンバーを追加">
      <div className="flex gap-2">
        <input
          placeholder="名前を入力"
          value={inputMember}
          onChange={(e) => updateInputMember(e.target.value)}
          className="h-10 px-2 border rounded flex-1"
        />
        <Button onClick={addMember}>
          <Plus className="w-4 h-4 mr-1" />
          追加
        </Button>
      </div>
      <div className="flex gap-2">
        {members.map((member) => (
          <div key={member} className="px-3 py-1 bg-blue-100 rounded-full">
            {member}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MemberList;
