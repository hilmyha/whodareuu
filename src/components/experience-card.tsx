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
  company: string;
  roles: RoleProps[];
}

export default function ExperienceCard({
  experiences,
}: {
  experiences: ExperienceCardProps[];
}) {
  return (
    <div className="space-y-3">
      {experiences.map((companyItem, idx) => (
        <div key={idx} className="screen-line-after">
          {/* Company Heading */}
          <h2 className="text-lg font-bold">{companyItem.company}</h2>

          {/* Accordion per role */}
          <Accordion type="single" collapsible>
            {companyItem.roles.map((job, jdx) => (
              <AccordionItem key={jdx} value={`role-${idx}-${jdx}`}>
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
