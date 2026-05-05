import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ListCheck } from "lucide-react";

interface ProjectCardProps {
  id: string;
  data: {
    title: string;
    slug: string;
    github: string;
    description: string;
    features: string[];
    technologies: string[];
  };
}

export default function ProjectCard({
  projects,
}: {
  projects: ProjectCardProps[];
}) {
  return (
    <div className="space-y-3">
      {projects.map(({ data }) => (
        <div key={data.title} className="screen-line-after">
          {/* Company Heading */}
          <h2 className="text-lg font-bold">{data.title}</h2>

          {/* Accordion per role */}
          <Accordion type="single" collapsible>
            <AccordionItem value={data.slug} className="group">
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-muted p-2 transition-colors group-data-[state=open]:bg-stone-300 dark:group-data-[state=open]:bg-stone-950">
                    <ListCheck size={14} />
                  </div>
                  <div>
                    <p className="font-medium">Details</p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <p className="text-md mb-3">{data.description}</p>
                {/* Features */}
                <ul className="list-decimal pl-6 mb-3">
                  {data.features.map((feature, idx) => (
                    <li key={idx} className="py-1">
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {data.technologies.map((tech, idx) => (
                    <Badge key={idx}>{tech}</Badge>
                  ))}
                </div>

                {/* Github */}
                <a
                  href={data.github}
                  className="block mt-3 text-sm underline"
                  target="_blank"
                >
                  View Repository
                </a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
