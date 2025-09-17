import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { FC } from "react";
import React from "react";

interface BreadcrumbsProps {
  pathname: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ pathname }) => {
  const segments = pathname.split("/").filter(Boolean);

  const formatSegment = (segment: string) =>
    segment
      .replace(/-/g, " ") // ganti strip dengan spasi
      .replace(/\b\w/g, (c) => c.toUpperCase()); // kapitalisasi tiap kata

  return (
    <Breadcrumb className="w-fit">
      <BreadcrumbList className="flex flex-wrap items-center gap-0">
        {/* Home selalu ada */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator className="mx-1" />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>
                    {formatSegment(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
