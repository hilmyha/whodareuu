import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListCheck, Github } from "lucide-react";

interface ProjectCardProps {
  id: string;
  data: {
    title: string;
    url: string;
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
      {projects.slice().reverse().map(({ data }) => (
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

                <div className="flex items-center gap-2 mt-8">
                  {/* Github */}
                  <Button variant={"outline"} size={"sm"} asChild>
                    <a
                      href={data.github}
                      target="_blank"
                    >
                      <Github size={24} />
                      View Repository
                    </a>
                  </Button>

                  {data.url != "" ? (
                    <Button variant={"secondary"} size={"sm"} asChild>
                      <a
                        href={data.url}
                        className="relative"
                        target="_blank"
                      >
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                        </span>
                        Project Showcase
                      </a>
                    </Button>
                  ) : null}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
