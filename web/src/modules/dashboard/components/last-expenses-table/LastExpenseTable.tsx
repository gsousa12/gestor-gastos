import { useMobileDetect } from "@common/hooks/useMobileDetect";
import {
  convertCentsToReal,
  formatDateAndHoursToPTBR,
} from "@common/utils/functions";

interface LastExpensesData {
  id: number;
  supplierName: string;
  description: string | null;
  amount: number;
  date: string;
}

interface LastExpenseTableProps {
  expenses: LastExpensesData[];
}

export const LastExpenseTable = ({ expenses }: LastExpenseTableProps) => {
  const isMobile = useMobileDetect();

  return (
    <div
      className={`bg-gray-50 p-5  hover:shadow-lg border 
      border-gray-200 shadow-sm shadow-gray-300 rounded-md ${
        isMobile ? "p-2" : "p-4"
      } w-full max-w-[100%]`}
    >
      <h3
        className={`${
          isMobile ? "text-xs font-semibold mb-2" : "text-sm font-semibold mb-3"
        } text-gray-700`}
      >
        Últimas despesas cadastradas
      </h3>
      <table className="w-full text-left">
        <thead>
          <tr
            className={`${
              isMobile ? "text-[10px]" : "text-xs"
            } text-gray-500 font-semibold border-b`}
          >
            <th className={`${isMobile ? "py-1" : "py-2 pl-2"}`}>
              Informações
            </th>
            <th className={`${isMobile ? "py-1" : "py-2"} text-center`}>
              Valor
            </th>
            <th
              className={`${isMobile ? "py-1 pr-1" : "py-2 pr-2"} text-center`}
            >
              Data
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className={`${
                  isMobile ? "py-4" : "py-6"
                } text-center text-gray-400 text-xs`}
              >
                Nenhuma despesa recente.
              </td>
            </tr>
          )}
          {expenses.map((exp) => (
            <tr
              key={exp.id}
              className={`border-b last:border-b-0 hover:bg-slate-50 transition ${
                isMobile ? "text-[11px]" : "text-sm"
              }`}
            >
              <td className={`${isMobile ? "py-2 pl-1" : "py-3 pl-2"}`}>
                <div
                  className={`font-medium text-gray-800 truncate ${
                    isMobile ? "text-[10px]" : ""
                  }`}
                >
                  {exp.supplierName}
                </div>
                {isMobile ? (
                  <></>
                ) : (
                  <div
                    className={`text-[10px] text-gray-500 truncate ${
                      isMobile ? "" : "text-xs"
                    }`}
                  >
                    {exp.description}
                  </div>
                )}
              </td>
              <td
                className={`${
                  isMobile ? "py-2 text-[8px]" : "py-3 text-[12px]"
                } text-center font-semibold text-red-600 whitespace-nowrap`}
              >
                {`R$ ${convertCentsToReal(exp.amount)}`}
              </td>
              <td
                className={`${
                  isMobile ? "py-2 pr-1 text-[8px]" : "py-3 pr-2 text-[13px]"
                } text-center  text-gray-800 whitespace-nowrap`}
              >
                {formatDateAndHoursToPTBR(exp.date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
