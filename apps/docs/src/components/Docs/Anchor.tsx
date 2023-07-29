
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
    <a className={cn("text-custom-400 hover:text-custom-500", className)} href={href} target={target}>
      {children}
    </a>
  );
}

export default A;
