import React, { useEffect, useState, useMemo } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

type Props = {
  /** tanggal posting, misal: "2025-10-22" atau Date object */
  postDate?: string | Date;
  /** jumlah hari sampai expired (default: 4) */
  daysToAdd?: number;
};

export default function Informations({ postDate, daysToAdd = 4 }: Props) {
  const { expiresAt, initialExpired } = useMemo(() => {
    const now = new Date();
    const posted = postDate ? new Date(postDate) : now;
    const expiresAt = new Date(posted);
    expiresAt.setDate(expiresAt.getDate() + daysToAdd);
    const initialExpired = now > expiresAt;
    return { expiresAt, initialExpired };
  }, [postDate, daysToAdd]);

  const [isExpired, setIsExpired] = useState(initialExpired);

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = expiresAt.getTime() - now;

      if (distance <= 0) {
        setIsExpired(true);
        return;
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  if (isExpired) return null;

  return (
    <Alert
      variant="default"
      className="fixed z-60 mx-auto lg:right-4 lg:bottom-4 right-2 bottom-2 w-fit"
    >
      <CheckCircle2Icon />
      <div>
        <AlertTitle>An astronaut landed to our atmosphere!</AlertTitle>
        <AlertDescription className="flex flex-col items-start gap-1">
          <p>
            Let's check out latest message{" "}
            <a className="text-blue-500 dark:text-blue-400" href="/blog">
              here
            </a>
            .
          </p>
        </AlertDescription>
      </div>
    </Alert>
  );
}
