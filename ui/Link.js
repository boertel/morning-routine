import Link from "next/link";
import cn from "classnames";

export default function MyLink({ href, className, target, ...props }) {
  let external = false;
  let _target = target;
  if (href.startsWith("http")) {
    _target = "_blank";
    external = true;
  }
  return (
    <Link href={href} passHref={external}>
      <a target={_target} className={cn("text-primary hover:underline", className)} {...props} />
    </Link>
  );
}
