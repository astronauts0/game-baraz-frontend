import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  CreditCard,
  MoreVertical,
  Edit2,
  Trash2,
  Calendar as CalendarIcon,
  Lock,
  AlertTriangle,
} from "lucide-react";
import type { PaymentMethod } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModalPrimary from "@/components/shared/Modal/ModalPrimary";
import { Card, CardContent } from "@/components/ui/card";

interface WalletPaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
}

export const WalletPaymentMethods: React.FC<WalletPaymentMethodsProps> = ({
  paymentMethods,
  setPaymentMethods,
}) => {
  const [addMethodModalOpen, setAddMethodModalOpen] = useState(false);
  const [methodToDelete, setMethodToDelete] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [newMethodForm, setNewMethodForm] = useState({
    type: "Visa",
    identifier: "",
    expiry: "",
    cvc: "",
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setNewMethodForm({ type: "Visa", identifier: "", expiry: "", cvc: "" });
    setAddMethodModalOpen(true);
  };

  const handleSetDefaultMethod = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((m) => ({ ...m, isDefault: m.id === id })),
    );
  };

  const handleMenuClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleDeleteMethod = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setMethodToDelete(id);
    setActiveMenuId(null);
  };

  const confirmDeleteMethod = () => {
    if (methodToDelete) {
      setPaymentMethods((prev) => prev.filter((m) => m.id !== methodToDelete));
      setMethodToDelete(null);
    }
  };

  const handleEditMethod = (e: React.MouseEvent, method: PaymentMethod) => {
    e.stopPropagation();
    setEditingId(method.id);
    setNewMethodForm({
      type: method.type,
      identifier: method.identifier,
      expiry: method.expiry || "",
      cvc: "",
    });
    setAddMethodModalOpen(true);
    setActiveMenuId(null);
  };

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (newMethodForm.type === "PayPal") {
      setNewMethodForm({ ...newMethodForm, identifier: e.target.value });
    } else {
      const rawValue = e.target.value.replace(/\D/g, "");
      const truncatedValue = rawValue.slice(0, 16);
      const formattedValue = truncatedValue
        .replace(/(\d{4})(?=\d)/g, "$1 ")
        .trim();
      setNewMethodForm({ ...newMethodForm, identifier: formattedValue });
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setNewMethodForm({ ...newMethodForm, expiry: value });
  };

  const handleCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setNewMethodForm({ ...newMethodForm, cvc: value });
  };

  const handleSaveMethod = (e: React.FormEvent) => {
    e.preventDefault();

    const displayExpiry = newMethodForm.expiry || "MM/YY";
    const cleanIdentifier = newMethodForm.identifier || "";
    const label =
      newMethodForm.type === "PayPal"
        ? "PayPal Account"
        : `${newMethodForm.type} ending in ${cleanIdentifier
            .replace(/\s/g, "")
            .slice(-4)}`;
    const subLabel =
      newMethodForm.type === "PayPal"
        ? cleanIdentifier
        : `Expires ${displayExpiry}`;

    if (editingId) {
      setPaymentMethods((prev) =>
        prev.map((m) => {
          if (m.id === editingId) {
            return {
              ...m,
              type: newMethodForm.type as PaymentMethod["type"],
              label,
              subLabel,
              identifier: cleanIdentifier,
              expiry: newMethodForm.expiry,
            };
          }
          return m;
        }),
      );
    } else {
      const newMethod: PaymentMethod = {
        id: `PM-${Date.now()}`,
        type: newMethodForm.type as PaymentMethod["type"],
        label,
        subLabel,
        isDefault: paymentMethods.length === 0,
        identifier: cleanIdentifier,
        expiry: newMethodForm.expiry,
      };
      setPaymentMethods((prev) => [...prev, newMethod]);
    }

    setAddMethodModalOpen(false);
    setEditingId(null);
    setNewMethodForm({ type: "Visa", identifier: "", expiry: "", cvc: "" });
  };

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider">
            Linked Methods
          </h3>
          <Button onClick={openAddModal}>
            <Plus size={14} /> Link New Method
          </Button>
        </div>

        {!paymentMethods || paymentMethods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-slate-200 rounded-xl text-center bg-slate-50/50">
            <div className="p-3 bg-white border border-slate-200 rounded-full mb-3 shadow-sm">
              <CreditCard className="text-slate-400" size={24} />
            </div>
            <h4 className="text-sm font-bold">No payment methods linked</h4>
            <p className="text-xs text-slate-500 mt-1 mb-4 max-w-[250px]">
              Link a Visa, Mastercard, or PayPal account to manage your funds
              and withdrawals.
            </p>
            <Button variant="default" onClick={openAddModal}>
              <Plus size={16} className="mr-2" /> Link New Method
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(paymentMethods || []).map((method) => (
              <div
                key={method.id}
                onClick={() => handleSetDefaultMethod(method.id)}
                className={`border rounded-xl p-4 flex items-center justify-between transition-all cursor-pointer group relative ${
                  method.isDefault
                    ? "border-primary bg-primary/20 shadow-sm ring-1 ring-primary/10"
                    : "border-slate-200 hover:border-primary/20 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-6 rounded text-white flex items-center justify-center text-[8px] font-bold tracking-tighter ${
                      method.type === "PayPal" ? "bg-blue-600" : "bg-slate-800"
                    }`}
                  >
                    {method.type === "PayPal"
                      ? "Pay"
                      : (method.type || "CARD").toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{method.label}</p>
                    <p className="text-xs text-slate-500">{method.subLabel}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      method.isDefault
                        ? "border-primary"
                        : "border-slate-300 group-hover:border-primary"
                    }`}
                  >
                    {method.isDefault && (
                      <div className="w-2 h-2 rounded-full bg-primary animate-in fade-in zoom-in"></div>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      onClick={(e) => handleMenuClick(e, method.id)}
                      className="p-1 hover:bg-slate-200 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {activeMenuId === method.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-xl border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
                      >
                        <button
                          onClick={(e) => handleEditMethod(e, method)}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Edit2 size={12} /> Edit
                        </button>
                        <button
                          onClick={(e) => handleDeleteMethod(e, method.id)}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <ModalPrimary
        isOpen={addMethodModalOpen}
        onClose={() => setAddMethodModalOpen(false)}
        title={editingId ? "Edit Payment Method" : "Link New Payment Method"}
      >
        <form onSubmit={handleSaveMethod} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Method Type
            </label>
            <select
              value={newMethodForm.type}
              onChange={(e) =>
                setNewMethodForm({ ...newMethodForm, type: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              {newMethodForm.type === "PayPal" ? "PayPal Email" : "Card Number"}
            </label>
            <div className="relative">
              <Input
                required
                placeholder={
                  newMethodForm.type === "PayPal"
                    ? "email@example.com"
                    : "0000 0000 0000 0000"
                }
                value={newMethodForm.identifier}
                onChange={handleIdentifierChange}
                maxLength={newMethodForm.type !== "PayPal" ? 19 : undefined}
                className={
                  newMethodForm.type !== "PayPal"
                    ? "font-mono tracking-wide px-3 h-10"
                    : "px-3 h-10"
                }
              />
              {newMethodForm.type !== "PayPal" && (
                <CreditCard
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={16}
                />
              )}
            </div>
          </div>

          {newMethodForm.type !== "PayPal" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Expiry Date
                </label>
                <div className="relative">
                  <Input
                    required
                    placeholder="MM/YY"
                    value={newMethodForm.expiry}
                    onChange={handleExpiryChange}
                    maxLength={5}
                    className="font-mono px-3 h-10"
                  />
                  <CalendarIcon
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  CVC / CVV
                </label>
                <div className="relative">
                  <Input
                    required={!editingId}
                    placeholder="123"
                    value={newMethodForm.cvc}
                    onChange={handleCVCChange}
                    maxLength={4}
                    className="font-mono px-3 h-10"
                    type="text"
                  />
                  <Lock
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="pt-2">
            <Button type="submit" className="w-full">
              {editingId ? "Save Changes" : "Link Method"}
            </Button>
          </div>
        </form>
      </ModalPrimary>

      <ModalPrimary
        isOpen={!!methodToDelete}
        onClose={() => setMethodToDelete(null)}
        title="Delete Payment Method"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
            <div className="p-2 bg-white rounded-full text-red-600 shadow-sm shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-red-900">
                Are you absolutely sure?
              </h4>
              <p className="text-xs text-red-700 mt-1 leading-relaxed">
                This action cannot be undone. This will permanently remove the
                payment method from your wallet.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setMethodToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDeleteMethod}
            >
              Delete Method
            </Button>
          </div>
        </div>
      </ModalPrimary>
    </Card>
  );
};
