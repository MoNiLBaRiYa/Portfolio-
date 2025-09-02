'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { SkillCategory } from '@/types/portfolio';

interface SkillTreeNode {
  id: string;
  name: string;
  category?: string;
  children?: SkillTreeNode[];
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface SkillTreeProps {
  skillCategories: SkillCategory[];
}

// Helper function to get skill icon path
const getSkillIconPath = (skillName: string): string => {
  const iconMap: { [key: string]: string } = {
    // Languages
    Python: '/icons/python.svg',
    Java: '/icons/java.svg',
    'C++': '/icons/cpp.svg',
    HTML: '/icons/html.svg',
    CSS: '/icons/css.svg',
    Flask: '/icons/flask.svg',
    MongoDB: '/icons/mongodb.svg',

    // Developer Tools
    'Power BI': '/icons/powerbi.svg',
    'IntelliJ IDEA': '/icons/intellij.svg',
    'VS Code': '/icons/vscode.svg',
    Cursor: '/icons/cursor.svg',
    'Kiro IDE': '/icons/kiro.svg',
    Git: '/icons/git.svg',

    // Core Concepts
    'Data Structure': '/icons/datastructure.svg',
    'Frontend Design': '/icons/frontend.svg',
    'Code Optimization': '/icons/optimization.svg',

    // Soft Skills
    Collaboration: '/icons/collaboration.svg',
    'Critical and Creative Thinking': '/icons/thinking.svg',
    Communication: '/icons/communication.svg',
  };
  return iconMap[skillName] || '';
};

const SkillTree: React.FC<SkillTreeProps> = ({ skillCategories }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const container = svgRef.current.parentElement;
        if (container) {
          const width = container.clientWidth;
          const height = Math.max(400, Math.min(600, width * 0.6));
          setDimensions({ width, height });
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create hierarchical data structure
    const rootData: SkillTreeNode = {
      id: 'root',
      name: 'Technical Skills',
      children: skillCategories.map(category => ({
        id: category.category,
        name: category.category,
        category: category.category,
        children: category.skills.map(skill => ({
          id: skill.name,
          name: skill.name,
          category: category.category,
        })),
      })),
    };

    // Create D3 hierarchy
    const root = d3.hierarchy(rootData);
    const nodes = root.descendants();
    const links = root.links();

    // Set up SVG
    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;

    svg.attr('width', width).attr('height', height);

    // Create container group
    const container = svg.append('g');

    // Set up zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', event => {
        container.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Create force simulation
    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(60));

    // Color scale for categories
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Create links
    const link = container
      .selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    // Create nodes
    const node = container
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer');

    // Add circles for nodes
    node
      .append('circle')
      .attr('r', (d: any) => {
        if (d.depth === 0) return 40; // Root node - larger
        if (d.depth === 1) return 35; // Category nodes - larger
        return 25; // Skill nodes - much larger to fit text
      })
      .attr('fill', (d: any) => {
        if (d.depth === 0) return '#4f46e5'; // Root node - indigo
        if (d.depth === 1) return colorScale(d.data.category || d.data.name); // Category nodes
        return colorScale(d.data.category || ''); // Skill nodes
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('opacity', 0.9);

    // Add icons for skill nodes and text for root/category nodes
    node.each(function (d: any) {
      const nodeGroup = d3.select(this);
      const name = d.data.name;

      if (d.depth === 2) {
        // Skill nodes: Add icon if available, otherwise use text
        const iconPath = getSkillIconPath(name);

        if (iconPath) {
          // Add white background circle for icon visibility
          nodeGroup
            .append('circle')
            .attr('r', 14)
            .attr('fill', '#ffffff')
            .attr('stroke', '#e5e7eb')
            .attr('stroke-width', 1)
            .style('pointer-events', 'none');

          // Add SVG icon
          nodeGroup
            .append('image')
            .attr('href', iconPath)
            .attr('x', -10) // Center the 20x20 icon
            .attr('y', -10)
            .attr('width', 20)
            .attr('height', 20)
            .style('pointer-events', 'none')
            .on('error', function () {
              // Fallback to text if icon fails to load
              d3.select(this).remove();
              // Also remove the white background circle
              nodeGroup.select('circle:last-of-type').remove();
              nodeGroup
                .append('text')
                .text(name.length > 8 ? name.substring(0, 6) + '..' : name)
                .attr('text-anchor', 'middle')
                .attr('dy', 4)
                .attr('font-size', '8px')
                .attr('font-weight', 'normal')
                .attr('fill', '#fff')
                .style('pointer-events', 'none');
            });

          // Add skill name below the icon
          nodeGroup
            .append('text')
            .text(name.length > 10 ? name.substring(0, 8) + '..' : name)
            .attr('text-anchor', 'middle')
            .attr('dy', 35) // Position below the circle
            .attr('font-size', '10px')
            .attr('font-weight', 'normal')
            .attr('fill', '#374151')
            .style('pointer-events', 'none');
        } else {
          // Fallback to text only
          nodeGroup
            .append('text')
            .text(name.length > 8 ? name.substring(0, 6) + '..' : name)
            .attr('text-anchor', 'middle')
            .attr('dy', 4)
            .attr('font-size', '8px')
            .attr('font-weight', 'normal')
            .attr('fill', '#fff')
            .style('pointer-events', 'none');
        }
      } else {
        // Root and category nodes: Use text
        nodeGroup
          .append('text')
          .text(name)
          .attr('text-anchor', 'middle')
          .attr('dy', 4)
          .attr('font-size', (d: any) =>
            d.depth === 0 ? '12px' : d.depth === 1 ? '10px' : '9px'
          )
          .attr('font-weight', (d: any) =>
            d.depth === 0 ? 'bold' : d.depth === 1 ? '600' : 'normal'
          )
          .attr('fill', '#fff')
          .style('pointer-events', 'none');
      }
    });

    // Add hover effects
    node
      .on('mouseover', function (event, d: any) {
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', (d: any) => {
            if (d.depth === 0) return 45;
            if (d.depth === 1) return 40;
            return 30;
          });

        // Highlight connected links
        link.style('stroke-opacity', (l: any) =>
          l.source === d || l.target === d ? 1 : 0.1
        );
      })
      .on('mouseout', function (_event, d: any) {
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('r', (d: any) => {
            if (d.depth === 0) return 40;
            if (d.depth === 1) return 35;
            return 25;
          });

        // Reset link opacity
        link.style('stroke-opacity', 0.6);
      });

    // Add drag behavior
    const drag = d3
      .drag<any, any>()
      .on('start', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d: any) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(drag);

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    // Cleanup function
    return () => {
      simulation.stop();
    };
  }, [skillCategories, dimensions]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6"
    >
      <div className="mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Interactive Skill Tree
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <span className="hidden sm:inline">
            Drag nodes to explore relationships between skills and categories.
            Each color represents a different skill category.
          </span>
          <span className="sm:hidden">
            Tap and drag to explore skill relationships.
          </span>
        </p>
      </div>

      <div className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <svg
          ref={svgRef}
          className="w-full h-auto bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
          style={{ minHeight: '400px' }}
        />
      </div>

      {/* Legend */}
      <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-indigo-500"></div>
          <span className="text-gray-600 dark:text-gray-400">
            <span className="hidden sm:inline">Root (Technical Skills)</span>
            <span className="sm:hidden">Root</span>
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500"></div>
          <span className="text-gray-600 dark:text-gray-400">Categories</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500"></div>
          <span className="text-gray-600 dark:text-gray-400">
            <span className="hidden sm:inline">Skills (with icons)</span>
            <span className="sm:hidden">Skills</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillTree;
