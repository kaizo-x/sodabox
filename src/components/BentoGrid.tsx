'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import BentoTile from '@/components/BentoTile';
import ProjectModal from '@/components/ProjectModal';
import { MINI_PROJECTS } from '@/lib/projects';
import { useSound } from '@/lib/sound-context';
import type { MiniProject } from '@/types';

export default function BentoGrid() {
  const { playPop } = useSound();
  const [activeProject, setActiveProject] = useState<MiniProject | null>(null);

  const openProject = useCallback(
    (project: MiniProject) => {
      setActiveProject(project);
      playPop();
    },
    [playPop],
  );

  const closeProject = useCallback(() => setActiveProject(null), []);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-flow-row-dense md:grid-cols-4 md:auto-rows-[14rem]">
        {MINI_PROJECTS.map((project) => (
          <BentoTile key={project.id} project={project} onOpen={openProject} />
        ))}
      </div>

      <AnimatePresence>
        {activeProject ? (
          <ProjectModal project={activeProject} onClose={closeProject} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
