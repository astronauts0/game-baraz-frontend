import React from "react";
import {
  ArrowUpRight,
  Search,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { BudgetScenario } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const ITEMS_PER_PAGE = 5;

interface HistoryTabProps {
  portfolioStats: any;
  searchTerm: string;
  handleSearchChange: (val: string) => void;
  displayedScenarios: BudgetScenario[];
  filteredScenarios: BudgetScenario[];
  handleEditScenario: (s: BudgetScenario) => void;
  setDeleteId: (id: string) => void;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({
  portfolioStats,
  searchTerm,
  handleSearchChange,
  displayedScenarios,
  filteredScenarios,
  handleEditScenario,
  setDeleteId,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {portfolioStats && (
        <Card className="bg-slate-950 overflow-hidden relative border-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <CardContent>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1">
                Total Portfolio Value
              </p>
              <h3 className="text-3xl font-serif font-bold">
                Rs {portfolioStats.totalProjProfit.toLocaleString()}
              </h3>
              <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                <ArrowUpRight size={12} /> {portfolioStats.winRate.toFixed(0)}%
                Success Rate
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 font-medium">Invested</p>
              <p className="text-lg font-bold">
                Rs {portfolioStats.totalInvestment.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="flex flex-col">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4">
          <div>
            <CardTitle className="text-lg font-bold uppercase tracking-tight">
              SAVED SCENARIOS
            </CardTitle>
            <CardDescription className="text-sm mt-1">
              Manage your financial models.
            </CardDescription>
          </div>

          <div className="relative w-full sm:w-auto">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={14}
            />
            <Input
              type="text"
              placeholder="Search plans..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 w-full sm:w-64"
            />
          </div>
        </CardHeader>

        <CardContent className="p-0 flex-1 overflow-x-auto min-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6 text-xs font-bold uppercase tracking-wider h-12">
                  Plan Details
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider h-12">
                  Investment
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider h-12">
                  Profitability
                </TableHead>
                <TableHead className="text-right pr-6 text-xs font-bold uppercase tracking-wider h-12">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedScenarios.length > 0 ? (
                displayedScenarios.map((s) => (
                  <TableRow key={s.id} className="group transition-colors">
                    <TableCell className="py-4 pl-6">
                      <div className="font-bold text-sm">{s.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 font-medium">
                        {s.date}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-sm font-medium">
                      Rs {(s.costPrice + s.miscCosts).toLocaleString()}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-bold ${s.netProfit >= 0 ? "text-emerald-600" : "text-red-600"}`}
                        >
                          Rs {s.netProfit.toLocaleString()}
                        </span>
                        <span
                          className={`text-[10px] font-bold ${s.netProfit >= 0 ? "text-emerald-500" : "text-red-500"}`}
                        >
                          {s.margin.toFixed(1)}% Margin
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditScenario(s)}
                          className="h-8 w-8 hover:text-primary hover:border-primary/50"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setDeleteId(s.id)}
                          className="h-8 w-8 hover:text-destructive hover:border-destructive/50"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-12 text-center text-muted-foreground h-[300px]"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-3">
                        <Search size={24} className="opacity-50" />
                      </div>
                      <p className="font-bold text-sm">No plans found</p>
                      <p className="text-xs mt-1">Try adjusting your search</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        {filteredScenarios.length > 0 && (
          <div className="border-t px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/30">
            <p className="text-xs text-muted-foreground font-medium">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredScenarios.length)}{" "}
              of {filteredScenarios.length} plans
            </p>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8"
              >
                <ChevronLeft size={16} />
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "ghost"}
                      size="icon"
                      onClick={() => handlePageChange(page)}
                      className="h-8 w-8 text-xs font-bold"
                    >
                      {page}
                    </Button>
                  ),
                )}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 w-8"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
