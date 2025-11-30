"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  MapPin,
  Phone,
  Upload,
  X,
  Check,
  MessageSquare,
  FileText,
  Briefcase
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const requestTypes = [
  {
    id: "devis",
    label: "Demande de devis",
    icon: FileText,
    description: "Obtenez une estimation pour votre projet",
  },
  {
    id: "contact",
    label: "Contact simple",
    icon: MessageSquare,
    description: "Posez-nous vos questions",
  },
  {
    id: "partenariat",
    label: "Partenariat",
    icon: Briefcase,
    description: "Collaborons ensemble",
  },
];

const pricingOptions = [
  { id: "starter", label: "Starter - 2 990 EUR", value: "starter" },
  { id: "pro", label: "Pro - 5 990 EUR", value: "pro" },
  { id: "enterprise", label: "Enterprise - Sur mesure", value: "enterprise" },
  { id: "custom", label: "Projet personnalise", value: "custom" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    requestType: "devis",
    name: "",
    email: "",
    phone: "",
    company: "",
    pricingOption: "",
    message: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const formDataToSend = new FormData();

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append files
      files.forEach((file) => {
        formDataToSend.append("files", file);
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Erreur d'envoi", {
          description: errorData.error || "Une erreur est survenue lors de l'envoi du formulaire."
        });
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
        return;
      }

      setStatus("success");
      toast.success("Message envoyé !", {
        description: "Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais."
      });

      setFormData({
        requestType: "devis",
        name: "",
        email: "",
        phone: "",
        company: "",
        pricingOption: "",
        message: "",
      });
      setFiles([]);

      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus("error");
      toast.error("Erreur de connexion", {
        description: "Impossible de se connecter au serveur. Veuillez réessayer."
      });
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="h-screen overflow-hidden bg-white dark:bg-[#030303] transition-colors pt-20 flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#A543F1]/10 via-white dark:via-[#030303] to-[#c5cbf9]/10 border-b border-gray-200 dark:border-white/[0.08] flex-shrink-0">
        <div className="container mx-auto px-4 py-4 max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/80 mb-2 font-[family-name:var(--font-heading)]">
              Contactez-nous
            </h1>
            <p className="text-sm text-gray-600 dark:text-white/60 max-w-2xl mx-auto">
              Vous avez un projet en tete ? Parlons-en ! Notre equipe vous repondra sous 24h.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 max-w-7xl flex-1 overflow-hidden">
        <div className="grid lg:grid-cols-3 gap-4 h-full">
          {/* Contact Form - Takes 2 columns */}
          <div className="lg:col-span-2 overflow-auto">
            <div className="bg-gray-50 dark:bg-white/[0.02] p-4 rounded-2xl border border-gray-200 dark:border-white/[0.08]">
              <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
                Envoyez-nous un message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Request Type Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white/70">
                    Type de demande
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {requestTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, requestType: type.id })}
                          className={`p-3 rounded-lg border-2 transition-all text-left ${
                            formData.requestType === type.id
                              ? "border-[#A543F1] bg-[#A543F1]/10"
                              : "border-gray-200 dark:border-white/[0.08] hover:border-[#A543F1]/50"
                          }`}
                        >
                          <Icon className={`w-4 h-4 mb-1 ${
                            formData.requestType === type.id
                              ? "text-[#A543F1]"
                              : "text-gray-400"
                          }`} />
                          <div className="font-medium text-xs text-gray-900 dark:text-white">
                            {type.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-white/70">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-white/70">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean@entreprise.com"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700 dark:text-white/70">
                      Telephone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2 text-gray-700 dark:text-white/70">
                      Entreprise
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Votre entreprise"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Pricing Option - Only shown for devis */}
                {formData.requestType === "devis" && (
                  <div>
                    <label htmlFor="pricingOption" className="block text-sm font-medium mb-2 text-gray-700 dark:text-white/70">
                      Formule souhaitee
                    </label>
                    <select
                      id="pricingOption"
                      name="pricingOption"
                      value={formData.pricingOption}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A543F1] transition-colors"
                    >
                      <option value="">Selectionnez une formule</option>
                      {pricingOptions.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-white/70">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={
                      formData.requestType === "devis"
                        ? "Decrivez votre projet en detail..."
                        : "Votre message..."
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#A543F1] transition-colors"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white/70">
                    Documents (optionnel)
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 dark:border-white/[0.08] rounded-lg cursor-pointer hover:border-[#A543F1] hover:bg-[#A543F1]/5 transition-all">
                      <div className="text-center">
                        <Upload className="w-6 h-6 mx-auto mb-1 text-gray-400" />
                        <span className="text-xs text-gray-600 dark:text-white/60">
                          Cliquez pour ajouter des fichiers
                        </span>
                        <span className="text-xs text-gray-400 dark:text-white/40 block mt-0.5">
                          PDF, DOC, PNG, JPG (Max 10MB)
                        </span>
                      </div>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        className="hidden"
                      />
                    </label>

                    {/* File List */}
                    {files.length > 0 && (
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-white dark:bg-white/[0.02] rounded-lg border border-gray-200 dark:border-white/[0.08]"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <FileText className="w-4 h-4 text-[#A543F1] flex-shrink-0" />
                              <span className="text-sm text-gray-700 dark:text-white/70 truncate">
                                {file.name}
                              </span>
                              <span className="text-xs text-gray-400 flex-shrink-0">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="ml-2 p-1 hover:bg-red-100 dark:hover:bg-red-500/20 rounded transition-colors"
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#A543F1] hover:bg-[#A543F1]/90 text-white py-3 text-sm font-medium"
                >
                  {status === "loading" && (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Envoi en cours...
                    </>
                  )}
                  {status === "success" && (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Message envoye !
                    </>
                  )}
                  {status === "error" && (
                    <>
                      <X className="w-5 h-5 mr-2" />
                      Erreur - Reessayer
                    </>
                  )}
                  {status === "idle" && "Envoyer le message"}
                </Button>

                {errorMessage && (
                  <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errorMessage}
                    </p>
                  </div>
                )}

                {status === "success" && (
                  <div className="p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg">
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Votre message a ete envoye avec succes ! Nous vous repondrons dans les plus brefs delais.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-3 overflow-auto">
            {/* Contact Cards */}
            <div className="bg-gray-50 dark:bg-white/[0.02] p-3 rounded-2xl border border-gray-200 dark:border-white/[0.08]">
              <h3 className="text-sm font-bold mb-2 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
                Informations
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#A543F1]/10 text-[#A543F1] flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                      Adresse
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-white/60">
                      Clermont-Ferrand, Auvergne
                      <br />
                      France
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#A543F1]/10 text-[#A543F1] flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                      Email
                    </h4>
                    <a
                      href="mailto:contact@krealabs.fr"
                      className="text-sm text-gray-600 dark:text-white/60 hover:text-[#A543F1] transition-colors"
                    >
                      contact@krealabs.fr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#A543F1]/10 text-[#A543F1] flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                      Telephone
                    </h4>
                    <a
                      href="tel:+33123456789"
                      className="text-sm text-gray-600 dark:text-white/60 hover:text-[#A543F1] transition-colors"
                    >
                      +33 1 23 45 67 89
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gray-50 dark:bg-white/[0.02] p-3 rounded-2xl border border-gray-200 dark:border-white/[0.08]">
              <h3 className="text-sm font-bold mb-2 text-gray-900 dark:text-white font-[family-name:var(--font-heading)]">
                Horaires
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="font-medium text-gray-900 dark:text-white">9h - 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi - Dimanche</span>
                  <span className="font-medium text-gray-900 dark:text-white">Ferme</span>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-[#A543F1] to-[#c5cbf9] p-3 rounded-2xl text-white">
              <h3 className="text-sm font-bold mb-1 font-[family-name:var(--font-heading)]">
                Reponse rapide garantie
              </h3>
              <p className="text-xs text-white/90 mb-3">
                Nous nous engageons a repondre a toutes les demandes sous 24h.
              </p>
              <div className="flex items-center gap-2 text-xs">
                <Check className="w-4 h-4" />
                <span>Reponse sous 24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
