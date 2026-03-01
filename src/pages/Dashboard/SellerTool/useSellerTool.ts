import { useState, useMemo } from "react";
import type { BudgetScenario, TabType } from "@/types";

export const PLATFORM_FEE_PERCENT = 8;
export const ITEMS_PER_PAGE = 5;
export const CHART_COLORS = [
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#3b82f6",
  "#ec4899",
  "#6366f1",
];

const initialScenarios: BudgetScenario[] = [
  {
    id: "1",
    name: "Reaver Vandal Plan",
    costPrice: 2000,
    listingPrice: 3400,
    platformFee: 272,
    miscCosts: 0,
    netProfit: 1128,
    margin: 33.1,
    date: "Oct 24, 2023",
  },
  {
    id: "2",
    name: "Fortnite OG Account",
    costPrice: 15000,
    listingPrice: 22000,
    platformFee: 1760,
    miscCosts: 500,
    netProfit: 4740,
    margin: 21.5,
    date: "Oct 22, 2023",
  },
  {
    id: "3",
    name: "CS:GO Knife Flip",
    costPrice: 8000,
    listingPrice: 9500,
    platformFee: 760,
    miscCosts: 0,
    netProfit: 740,
    margin: 7.8,
    date: "Oct 20, 2023",
  },
  {
    id: "4",
    name: "Apex Legends Heirloom",
    costPrice: 12000,
    listingPrice: 15000,
    platformFee: 1200,
    miscCosts: 200,
    netProfit: 1600,
    margin: 10.6,
    date: "Oct 18, 2023",
  },
  {
    id: "5",
    name: "Valorant Points Bundle",
    costPrice: 4000,
    listingPrice: 5000,
    platformFee: 400,
    miscCosts: 0,
    netProfit: 600,
    margin: 12.0,
    date: "Oct 15, 2023",
  },
  {
    id: "6",
    name: "Minecraft Account",
    costPrice: 1000,
    listingPrice: 2500,
    platformFee: 200,
    miscCosts: 0,
    netProfit: 1300,
    margin: 52.0,
    date: "Oct 10, 2023",
  },
  {
    id: "7",
    name: "Roblox Dominus Plan",
    costPrice: 45000,
    listingPrice: 60000,
    platformFee: 4800,
    miscCosts: 1000,
    netProfit: 9200,
    margin: 15.3,
    date: "Oct 08, 2023",
  },
  {
    id: "8",
    name: "Steam Deck 512GB",
    costPrice: 35000,
    listingPrice: 42000,
    platformFee: 3360,
    miscCosts: 500,
    netProfit: 3140,
    margin: 7.5,
    date: "Oct 05, 2023",
  },
  {
    id: "9",
    name: "Rare Pokémon Card",
    costPrice: 5000,
    listingPrice: 15000,
    platformFee: 1200,
    miscCosts: 100,
    netProfit: 8700,
    margin: 58.0,
    date: "Sep 30, 2023",
  },
];

export const useSellerTool = () => {
  const [assetName, setAssetName] = useState("");
  const [costPrice, setCostPrice] = useState<string>("");
  const [listingPrice, setListingPrice] = useState<string>("");
  const [miscCosts, setMiscCosts] = useState<string>("0");

  const [activeTab, setActiveTab] = useState<TabType>("analytics");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [savedScenarios, setSavedScenarios] =
    useState<BudgetScenario[]>(initialScenarios);

  const cp = Number(costPrice) || 0;
  const lp = Number(listingPrice) || 0;
  const misc = Number(miscCosts) || 0;

  const platformFeeAmount = lp * (PLATFORM_FEE_PERCENT / 100);
  const totalDeductions = platformFeeAmount + misc + cp;
  const netProfit = lp - totalDeductions;

  const profitMargin = lp > 0 ? (netProfit / lp) * 100 : 0;
  const roi = cp > 0 ? (netProfit / cp) * 100 : 0;
  const breakEven = (cp + misc) / (1 - PLATFORM_FEE_PERCENT / 100);

  const portfolioStats = useMemo(() => {
    const totalPlans = savedScenarios.length;
    if (totalPlans === 0) return null;

    const totalInvestment = savedScenarios.reduce(
      (sum, s) => sum + s.costPrice + s.miscCosts,
      0,
    );
    const totalProjProfit = savedScenarios.reduce(
      (sum, s) => sum + s.netProfit,
      0,
    );
    const winRate =
      (savedScenarios.filter((s) => s.netProfit > 0).length / totalPlans) * 100;
    const portfolioROI =
      totalInvestment > 0 ? (totalProjProfit / totalInvestment) * 100 : 0;

    return {
      totalPlans,
      totalInvestment,
      totalProjProfit,
      winRate,
      portfolioROI,
    };
  }, [savedScenarios]);

  const barChartData = useMemo(() => {
    return savedScenarios.map((s) => ({
      name: s.name.length > 10 ? s.name.substring(0, 8) + ".." : s.name,
      fullName: s.name,
      Investment: s.costPrice + s.miscCosts,
      Profit: s.netProfit,
    }));
  }, [savedScenarios]);

  const pieChartData = useMemo(() => {
    return savedScenarios
      .filter((s) => s.costPrice + s.miscCosts > 0)
      .map((s) => ({ name: s.name, value: s.costPrice + s.miscCosts }));
  }, [savedScenarios]);

  const filteredScenarios = useMemo(() => {
    return savedScenarios.filter((s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [savedScenarios, searchTerm]);

  const totalPages = Math.ceil(filteredScenarios.length / ITEMS_PER_PAGE);
  const displayedScenarios = filteredScenarios.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSaveOrUpdateScenario = () => {
    if (!assetName || lp === 0) return;

    const scenarioData: BudgetScenario = {
      id: editingId || Math.random().toString(36).substr(2, 9),
      name: assetName,
      costPrice: cp,
      listingPrice: lp,
      platformFee: platformFeeAmount,
      miscCosts: misc,
      netProfit: netProfit,
      margin: profitMargin,
      date: editingId
        ? savedScenarios.find((s) => s.id === editingId)?.date || "Today"
        : new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
    };

    if (editingId) {
      setSavedScenarios((prev) =>
        prev.map((s) => (s.id === editingId ? scenarioData : s)),
      );
      setEditingId(null);
    } else {
      setSavedScenarios((prev) => [scenarioData, ...prev]);
    }

    setAssetName("");
    setCostPrice("");
    setListingPrice("");
    setMiscCosts("0");
    setActiveTab("history");
  };

  const handleEditScenario = (s: BudgetScenario) => {
    setEditingId(s.id);
    setAssetName(s.name);
    setCostPrice(s.costPrice.toString());
    setListingPrice(s.listingPrice.toString());
    setMiscCosts(s.miscCosts.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setAssetName("");
    setCostPrice("");
    setListingPrice("");
    setMiscCosts("0");
  };

  const confirmDelete = () => {
    if (deleteId) {
      setSavedScenarios((prev) => prev.filter((s) => s.id !== deleteId));
      if (editingId === deleteId) handleCancelEdit();
      setDeleteId(null);
    }
  };

  return {
    state: {
      assetName,
      costPrice,
      listingPrice,
      miscCosts,
      activeTab,
      editingId,
      deleteId,
      searchTerm,
      currentPage,
      savedScenarios,
      cp,
      lp,
      misc,
      platformFeeAmount,
      netProfit,
      profitMargin,
      roi,
      breakEven,
      portfolioStats,
      barChartData,
      pieChartData,
      filteredScenarios,
      totalPages,
      displayedScenarios,
    },
    actions: {
      setAssetName,
      setCostPrice,
      setListingPrice,
      setMiscCosts,
      setActiveTab,
      setDeleteId,
      handleSearchChange,
      handlePageChange,
      handleSaveOrUpdateScenario,
      handleEditScenario,
      handleCancelEdit,
      confirmDelete,
    },
  };
};
