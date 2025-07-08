import { ContentTitle } from "@/common/components/content-title/ContentTitle";
import { ContentWrapper } from "@/common/components/wrappers/content-wrapper/ContentWrapper";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import {
  Building,
  Calendar,
  Info,
  Layers2,
  ListChecks,
  ListCollapse,
  Truck,
} from "lucide-react";
import { ComboBox } from "@/common/components/combobox/Combobox";
import { useExpenseCreationPageController } from "./expense-creation-page-controller";
import { cn } from "@/common/lib/utils";
import { ItemFieldsArray } from "../../components/item-fields-array/ItemFieldsArray";
import { FieldPath } from "react-hook-form";
import { CreateExpenseFormValues } from "../../schemas/create-expense-schema";
import { months } from "@/common/utils/constants";

export const ExpenseCreationPage = () => {
  const {
    isPending,
    createExpenseFormData,
    methods,
    onSubmit,
    isValid,
    isSubmitting,
    watch,
    errors,
    setValue,
    trigger,
  } = useExpenseCreationPageController();

  /* ------- loading / error ------- */
  if (isPending) {
    return (
      <ContentWrapper>
        <></>
      </ContentWrapper>
    );
  }
  if (!createExpenseFormData) return null; // Pode colocar um estado de erro se desejar

  /* ------- helpers ------- */
  // helper corrigido dentro do componente
  const validateComboBox = async (
    field: FieldPath<CreateExpenseFormValues> // ✅ campos válidos
  ) => {
    await trigger(field);
  };

  const monthOptions = months // -> [{ value, label }, ...]
    .filter((m) => m.value !== "") // remove "Todos"
    .map((m) => ({ id: m.value as number, name: m.label })); // adequa formato

  /* ------- render ------- */
  return (
    <ContentWrapper>
      <ContentTitle label="Criação de Despesa" />

      {/* FORMULÁRIO */}
      <methods.FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          {/* ============ BLOCOS DE INFORMAÇÕES ============ */}
          <Card className="bg-white shadow-sm border-sky-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sky-700">
                <Info className="w-5 h-5" />
                Informações da Despesa
              </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-4 md:grid-cols-2">
              {/* Fornecedor */}
              <div>
                <ComboBox
                  label="Fornecedor"
                  options={createExpenseFormData.supplierList}
                  value={watch("supplierId")}
                  onChange={(id) => {
                    setValue("supplierId", id, { shouldValidate: true });
                    validateComboBox("supplierId");
                  }}
                  placeholder="Selecione o fornecedor"
                  icon={<Truck className="h-4 w-4" />}
                />
                <p className="min-h-[18px] text-xs text-red-500">
                  {errors.supplierId?.message === "Required"
                    ? "Selecione um fornecedor válido."
                    : errors.supplierId?.message || " "}
                </p>
              </div>

              {/* Subsetor */}
              <div>
                <ComboBox
                  label="Subsetor"
                  options={createExpenseFormData.subSectorList}
                  value={watch("subsectorId")}
                  onChange={(id) => {
                    setValue("subsectorId", id, { shouldValidate: true });
                    validateComboBox("subsectorId");
                  }}
                  placeholder="Selecione o subsetor"
                  icon={<Layers2 className="h-4 w-4" />}
                />
                <p className="min-h-[18px] text-xs text-red-500">
                  {errors.subsectorId?.message === "Required"
                    ? "Selecione um subsetor válido."
                    : errors.subsectorId?.message || " "}
                </p>
              </div>

              {/* Secretaria */}
              <div>
                <ComboBox
                  label="Secretaria"
                  options={createExpenseFormData.secretaryList}
                  value={watch("secretaryId")}
                  onChange={(id) => {
                    setValue("secretaryId", id, { shouldValidate: true });
                    validateComboBox("secretaryId");
                  }}
                  placeholder="Selecione a secretaria"
                  icon={<Building className="h-4 w-4" />}
                />
                <p className="min-h-[18px] text-xs text-red-500">
                  {errors.secretaryId?.message === "Required"
                    ? "Selecione uma secretaria válida."
                    : errors.secretaryId?.message || " "}
                </p>
              </div>

              {/* Descrição */}
              <div className="md:col-span-2">
                <label className="flex items-center text-sm font-semibold text-sky-700 mb-1">
                  Descrição
                </label>
                <input
                  {...methods.register("description")}
                  className="w-full px-4 py-2 border border-sky-100 rounded-lg text-sm focus:ring-2 focus:ring-sky-300 outline-none bg-sky-50 transition"
                  placeholder="Descrição da despesa"
                />
                <p className="min-h-[18px] text-xs text-red-500">
                  {errors.description?.message || " "}
                </p>
              </div>

              {/* Mês */}
              <div>
                <ComboBox
                  label="Mês"
                  options={monthOptions} // ✅ formato correto
                  value={watch("month")} // RHF devolve o número 1-12
                  onChange={(id: number) => {
                    // ComboBox devolve somente o id (número)
                    setValue("month", id, { shouldValidate: true });
                    trigger("month");
                  }}
                  placeholder="Selecione o mês"
                  icon={<Calendar className="h-4 w-4" />}
                />
                <p className="min-h-[18px] text-xs text-red-500">
                  {errors.month?.message || " "}
                </p>
              </div>

              {/* Ano */}
              <div>
                <label className="flex items-center text-sm font-semibold text-sky-700 mb-1">
                  Ano
                </label>
                <input
                  type="number"
                  {...methods.register("year")}
                  className="w-full px-4 py-2 border border-sky-100 rounded-lg text-sm focus:ring-2 focus:ring-sky-300 outline-none bg-sky-50 transition"
                  placeholder="Ano"
                  maxLength={4}
                />
                <p className="min-h-[18px] text-xs text-red-500">
                  {errors.year?.message || " "}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ============ LISTA DE ITENS ============ */}
          <Card className="bg-white shadow-sm border-sky-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sky-700">
                <ListCollapse className="w-5 h-5" />
                Itens da Despesa
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ItemFieldsArray itemList={createExpenseFormData.itemList} />
            </CardContent>
          </Card>

          {/* ============ BOTÃO ============ */}
          <button
            type="submit"
            className={cn(
              "mt-2 self-start px-8 py-3 bg-gradient-to-r from-sky-500 to-sky-400 text-white font-semibold rounded-lg shadow-md hover:from-sky-600 hover:to-sky-500 transition",
              !isValid || isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            )}
            disabled={!isValid || isSubmitting}
          >
            Cadastrar Despesa
          </button>
        </form>
      </methods.FormProvider>
    </ContentWrapper>
  );
};
