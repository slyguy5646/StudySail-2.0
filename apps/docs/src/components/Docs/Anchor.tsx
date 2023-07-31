
import { cn } from "@/lib/utils";

function A({
  href,
  target,
  children,
  className,
}: {
  href: string;
  target?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={cn("text-cyan-500 hover:text-cyan-600", className)} href={href} target={target}>
      {children}
    </a>
  );
}

export default A;
