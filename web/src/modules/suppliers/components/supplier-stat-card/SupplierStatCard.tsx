import { Card, CardContent } from "@/common/components/ui/card";

export const StatCard = ({ icon: Icon, label, value }: any) => (
  <Card className="flex-1 border-gray-200 shadow-sm">
    <CardContent className="flex items-center gap-2 py-3">
      <Icon className="w-6 h-6 text-sky-500" />
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-base font-semibold text-gray-800">{value}</div>
      </div>
    </CardContent>
  </Card>
);
