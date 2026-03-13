import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Lock,
  ShieldCheck,
  Mail,
  User,
  MessageSquare,
  ClipboardList,
  Rocket,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { contactFormSchema } from "@/validations";
import RotateBox from "@/components/shared/RotateBox";
import AnimatedArrow from "@/components/shared/AnimatedArrow";
import SelectPrimary from "@/components/shared/Form/SelectPrimary";

const subjectOptions = [
  { value: "General Support", label: "General Support" },
  {
    value: "Transaction Dispute (Escrow)",
    label: "Transaction Dispute (Escrow)",
  },
  {
    value: "Report Fraud / Suspicious Activity",
    label: "Report Fraud / Suspicious Activity",
  },
  { value: "Partnership Proposal", label: "Partnership Proposal" },
  { value: "Legal / Compliance", label: "Legal / Compliance" },
];

const ContactForm: React.FC = () => {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "General Support",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    console.log(values);
    // Handle form submission
  };

  return (
    <div className="lg:col-span-7 ">
      <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-primary border border-slate-100 relative overflow-hidden">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4 group">
            <RotateBox className="bg-slate-900 text-white">
              <Lock className="w-5 h-5" />
            </RotateBox>
            <div>
              <h3 className="font-display font-black text-xl">
                Secure Transmission
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Endpoint Encryption Active
                </span>
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="text-right">
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest block mb-0.5">
                Status
              </span>
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Online
              </span>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest pl-1 text-black/70">
                      Identification / Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <User size={16} />
                        </div>
                        <Input
                          placeholder="John Wick"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-bold text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest pl-1 text-black/70">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <Mail size={16} />
                        </div>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-bold text-[10px]" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-widest pl-1">
                    Inquiry Vector
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <ClipboardList size={16} />
                      </div>
                      <SelectPrimary
                        value={field.value}
                        onChange={field.onChange}
                        options={subjectOptions}
                        placeholder="Select a subject"
                        SelectTriggerClass="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="font-bold text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-widest pl-1">
                    Intel Brief / Message
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <div className="absolute left-4 top-4">
                        <MessageSquare size={16} />
                      </div>
                      <Textarea
                        className="pl-10"
                        placeholder="Describe your situation in detail..."
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="font-bold text-[10px]" />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button type="submit" size="lg" className="w-full group">
                Initiate Protocol
                <AnimatedArrow direction="topRight" iconClassName="text-white">
                  <Rocket className="text-white" />
                </AnimatedArrow>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
