import useWarikanStore from "../store/useWarikanStore";
import { Expense } from "../types";

type MemberCalculation = {
  [key: string]: number;
};

// 各メンバーが支払った個人総額を算出
const calculateTotalPaidByMember = (members: string[], expenses: Expense[]) => {
  const totalPaidByMember: MemberCalculation = {};

  members.forEach((member) => (totalPaidByMember[member] = 0));
  expenses.forEach((expense) => {
    totalPaidByMember[expense.paidBy] += expense.amount;
  });

  return totalPaidByMember;
};

// 全員の総額を算出
const calculateTotal = (totalPaidByMember: MemberCalculation) => {
  return Object.values(totalPaidByMember).reduce((a, b) => a + b, 0);
};

// １人あたりが本来支払うべき金額（割り勘）を算出
const calculateTotalPerMember = (total: number, members: string[]) => {
  return total / members.length;
};

// それぞれのメンバーの過払い額 or 不足額を算出
const calculateDifferences = (
  members: string[],
  totalPaidByMember: MemberCalculation,
  totalPerMember: number
) => {
  const differences: MemberCalculation = {};
  members.forEach((member) => {
    differences[member] = totalPaidByMember[member] - totalPerMember;
  });
  return differences;
};

// 各メンバーの過不足を相殺し、最適な精算方法を算出します。
const calculateWarikanPlan = (differences: MemberCalculation) => {
  const warikanPlan: { from: string; to: string; amount: number }[] = [];

  const overpaidMembers = Object.keys(differences).filter(
    (member) => differences[member] > 0
  );
  const underpaidMembers = Object.keys(differences).filter(
    (member) => differences[member] < 0
  );

  while (overpaidMembers.length > 0 && underpaidMembers.length > 0) {
    const receiver = overpaidMembers[0];
    const payer = underpaidMembers[0];
    const amount = Math.min(differences[receiver], -differences[payer]);

    if (amount > 0) {
      warikanPlan.push({
        from: payer,
        to: receiver,
        amount: Math.round(amount),
      });
      differences[receiver] -= amount;
      differences[payer] += amount;
    }

    if (differences[receiver] === 0) overpaidMembers.shift();
    if (differences[payer] === 0) underpaidMembers.shift();
  }

  return warikanPlan;
};

/**
 * 割り勘を行うための最適な精算方法を求めます。
 *
 * @remarks
 * このフックでは、以下の処理が行われます：
 * 1. 各メンバーが支払った個人総額を算出
 * 2. 全員の総額を算出
 * 3. １人あたりが本来支払うべき金額（割り勘）を算出
 * 4. それぞれのメンバーの過払い額または不足額を算出
 * 5. 各メンバーの過不足を比較して相殺
 */
const useResultLogic = () => {
  const members = useWarikanStore((state) => state.members);
  const expenses = useWarikanStore((state) => state.expenses);

  if (members.length === 0 || expenses.length === 0) {
    return [];
  }

  const totalPaidByMember = calculateTotalPaidByMember(members, expenses);
  const total = calculateTotal(totalPaidByMember);
  const totalPerMember = calculateTotalPerMember(total, members);
  const differences = calculateDifferences(
    members,
    totalPaidByMember,
    totalPerMember
  );

  return calculateWarikanPlan(differences);
};

export default useResultLogic;
