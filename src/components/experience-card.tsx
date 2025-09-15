import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Briefcase } from "lucide-react";

interface RoleProps {
  role: string;
  start: string;
  end: string;
  tasks: string[];
}

interface ExperienceCardProps {
  id: string;
  data: {
    company: string;
    roles: RoleProps[];
  };
}

export default function ExperienceCard({
  experiences,
}: {
  experiences: ExperienceCardProps[];
}) {
  return (
    <div className="space-y-3">
      {experiences.map(({ data }) => (
        <div key={data.company} className="screen-line-after">
          {/* Company Heading */}
          <h2 className="text-lg font-bold">{data.company}</h2>

          {/* Accordion per role */}
          <Accordion type="single" collapsible>
            {data.roles.map((job, jdx) => (
              <AccordionItem key={job.role} value={`role-${data.company}-${jdx}`}>
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-muted p-2">
                      <Briefcase size={14} />
                    </div>
                    <div>
                      <p className="font-medium">{job.role}</p>
                      <p className="text-muted-foreground text-sm">
                        {job.start} - {job.end}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-decimal pl-16">
                    {job.tasks.map((task, tdx) => (
                      <li key={tdx} className="py-1">
                        {task}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
