import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface NewsletterFormProps {
  onSubmit?: (email: string) => Promise<void> | void;
  className?: string;
  title?: string;
  description?: string;
}

export default function NewsletterForm({
  onSubmit,
  className,
  title = "Atelier Previews",
  description = "Join our private registry for exclusive previews of upcoming exhibitions and bespoke collections.",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        // Fallback mock API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={cn("space-y-6 max-w-sm", className)}>
      <div className="space-y-2">
        <h3 className="font-serif text-lg md:text-xl font-light text-[#EAE5D9] tracking-wide">
          {title}
        </h3>
        <p className="font-sans text-xs text-[#9E9B95] leading-relaxed font-light text-balance">
          {description}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="p-4 bg-[#161513] border border-[#2C2B29] rounded-sm space-y-1.5"
          >
            <p className="font-serif text-sm text-[#EAE5D9] font-light">
              Inclusion Confirmed
            </p>
            <p className="font-sans text-[11px] text-[#9E9B95] font-light leading-relaxed">
              We have added you to our private correspondence list. Expect a welcoming preview in your inbox shortly.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-[#2C2B29] py-3 text-sm text-[#EAE5D9] placeholder-[#5C574F] focus:outline-none focus:border-[#EAE5D9] transition-colors duration-500 font-light font-sans disabled:opacity-50"
                aria-label="Email address for newsletter subscription"
              />
              
              {/* Subtle underline hover helper */}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#EAE5D9] transition-all duration-500 group-hover:w-full" />
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className={cn(
                  "relative w-full overflow-hidden border border-[#2C2B29] py-3 text-xs uppercase tracking-[0.25em] font-sans font-light transition-all duration-500",
                  status === "loading"
                    ? "bg-transparent text-[#9E9B95] cursor-default"
                    : "bg-[#EAE5D9] text-[#1A1A1A] hover:bg-transparent hover:text-[#EAE5D9] hover:border-[#EAE5D9]"
                )}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {status === "loading" ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-3 w-3 text-[#9E9B95]"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Verifying Request
                    </>
                  ) : (
                    "Inquire Inclusion"
                  )}
                </span>
              </button>
              
              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-[11px] font-light font-sans pt-1"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
