'use client';

import React, { useState, useReducer } from 'react';
import Link from 'next/link';
import {
  BLUEPRINT_CATALOG,
  INITIAL_BLUEPRINTS_STATE,
  blueprintsReducer,
  type BlueprintCategory,
  type BlueprintItem,
} from '@/lib/state/blueprints-machine';
import { BlueprintDrawer } from './BlueprintDrawer';
import { trackClientEvent } from '../TelemetryTracker';

interface CategoryTabConfig {
  readonly id: BlueprintCategory;
  readonly label: string;
}

const CATEGORY_TABS: readonly CategoryTabConfig[] = [
  { id: 'ALL', label: 'ALL' },
  { id: 'AI AGENTS', label: 'AI AGENTS' },
  { id: 'SAAS & PORTALS', label: 'SAAS & PORTALS' },
  { id: 'SYSTEMS', label: 'SYSTEMS' },
];

/**
 * Custom Technical SVGs for the Blueprint Index rows
 */
function SaasIsometricIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 100 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-12 block select-none" aria-hidden="true">
      {/* Bottom Layer */}
      <polygon points="50,22 84,33 50,44 16,33" fill="#F4F4F6" stroke="#D1D3DC" strokeWidth="1" />
      {/* Middle Glowing Orange Layer */}
      <polygon points="50,14 84,25 50,36 16,25" fill="#FFEFEA" stroke="#C83E1B" strokeWidth="1.3" />
      {/* Top Layer */}
      <polygon points="50,6 84,17 50,28 16,17" fill="#FFFFFF" stroke="#9EA2B0" strokeWidth="1" />
      <circle cx="50" cy="17" r="2.5" fill="#C83E1B" />
    </svg>
  );
}

function EventSpineIsometricIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 100 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-12 block select-none" aria-hidden="true">
      {/* Central Orange Cube */}
      <polygon points="50,8 64,15 50,22 36,15" fill="#C83E1B" fillOpacity="0.85" stroke="#C83E1B" strokeWidth="1" />
      <polygon points="36,15 50,22 50,32 36,25" fill="#A83215" stroke="#C83E1B" strokeWidth="1" />
      <polygon points="50,22 64,15 64,25 50,32" fill="#D94E29" stroke="#C83E1B" strokeWidth="1" />

      {/* Satellite Node Left */}
      <polygon points="22,26 32,31 22,36 12,31" fill="#FFFFFF" stroke="#9EA2B0" strokeWidth="1" />
      <polygon points="12,31 22,36 22,43 12,38" fill="#F4F4F6" stroke="#9EA2B0" strokeWidth="1" />
      <polygon points="22,36 32,31 32,38 22,43" fill="#E5E7EB" stroke="#9EA2B0" strokeWidth="1" />
      <line x1="36" y1="23" x2="22" y2="28" stroke="#C83E1B" strokeWidth="1" strokeDasharray="2 2" />

      {/* Satellite Node Right */}
      <polygon points="78,26 88,31 78,36 68,31" fill="#FFFFFF" stroke="#9EA2B0" strokeWidth="1" />
      <polygon points="68,31 78,36 78,43 68,38" fill="#F4F4F6" stroke="#9EA2B0" strokeWidth="1" />
      <polygon points="78,36 88,31 88,38 78,43" fill="#E5E7EB" stroke="#9EA2B0" strokeWidth="1" />
      <line x1="64" y1="23" x2="78" y2="28" stroke="#C83E1B" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

function AiTriageIsometricIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 100 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-12 block select-none" aria-hidden="true">
      <polygon points="50,8 80,18 50,28 20,18" fill="#FFFFFF" stroke="#9EA2B0" strokeWidth="1" />
      <polygon points="50,18 80,28 50,38 20,28" fill="#FFEFEA" stroke="#C83E1B" strokeWidth="1.4" />
      <polygon points="50,28 80,38 50,46 20,38" fill="#F4F4F6" stroke="#D1D3DC" strokeWidth="1" />
      <circle cx="50" cy="28" r="2.5" fill="#C83E1B" />
    </svg>
  );
}

/**
 * 1. AI Agents Architecture Canvas (ZONE 1 -> ZONE 2 -> ZONE 3 + HUMAN REVIEW LOOP)
 */
function AiTriageArchitectureCanvas({
  selectedNode,
  setSelectedNode,
}: {
  readonly selectedNode: string | null;
  readonly setSelectedNode: (id: string | null) => void;
}): React.ReactElement {
  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-7 flex flex-col justify-between relative select-none">
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wbGridAi" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#222634" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wbGridAi)" />
        </svg>
      </div>

      {/* DESKTOP RESPONSIVE SVG CANVAS */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <svg
          viewBox="0 0 880 430"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto max-h-[460px] block font-sans"
          aria-label="Governed AI Support & Ops Triage Architecture Diagram"
        >
          <defs>
            {/* Orange core glow filter */}
            <filter id="glowOrange" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#C83E1B" floodOpacity="0.4" />
            </filter>
            {/* Arrow marker */}
            <marker id="arrowOrange" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 6 4 L 0 7 z" fill="#C83E1B" />
            </marker>
            <marker id="arrowGrey" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 6 4 L 0 7 z" fill="#5A5D6A" />
            </marker>
          </defs>

          {/* =========================================================================
              ZONE LABELS (TOP)
             ========================================================================= */}
          {/* Zone 1 Label */}
          <g transform="translate(18, 22)">
            <rect x="0" y="2" width="2.5" height="11" fill="#C83E1B" />
            <text x="8" y="11" fill="#9FA3B0" fontSize="10.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.08em">
              INPUT / CONTEXT
            </text>
          </g>

          {/* Zone 2 Label */}
          <g transform="translate(240, 22)">
            <rect x="0" y="2" width="2.5" height="11" fill="#C83E1B" />
            <text x="8" y="11" fill="#9FA3B0" fontSize="10.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.08em">
              ORCHESTRATION / GOVERNANCE
            </text>
          </g>

          {/* Zone 3 Label */}
          <g transform="translate(685, 22)">
            <rect x="0" y="2" width="2.5" height="11" fill="#C83E1B" />
            <text x="8" y="11" fill="#9FA3B0" fontSize="10.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.08em">
              ACTIONS / OUTPUTS
            </text>
          </g>

          {/* =========================================================================
              ZONE 01: INPUT NODES (Left column x=18, width=175)
             ========================================================================= */}
          {/* IN-01: Support Request */}
          <g
            className="cursor-pointer transition-transform duration-200"
            onClick={() => setSelectedNode('IN-01')}
            onMouseEnter={() => setSelectedNode('IN-01')}
          >
            <rect
              x="18"
              y="58"
              width="170"
              height="48"
              rx="5"
              fill={selectedNode === 'IN-01' ? '#1B1E28' : '#12141B'}
              stroke={selectedNode === 'IN-01' ? '#C83E1B' : '#262934'}
              strokeWidth="1.2"
            />
            {/* Icon: Message Bubble */}
            <circle cx="38" cy="82" r="12" fill="#1C1F2B" />
            <path d="M 32 78 C 32 75.8 33.8 74 36 74 L 40 74 C 42.2 74 44 75.8 44 78 L 44 83 C 44 85.2 42.2 87 40 87 L 35 87 L 32 89 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <circle cx="36" cy="80.5" r="0.75" fill="#FFFFFF" />
            <circle cx="38" cy="80.5" r="0.75" fill="#FFFFFF" />
            <circle cx="40" cy="80.5" r="0.75" fill="#FFFFFF" />
            <text x="56" y="80" fill="#FFFFFF" fontSize="11" fontWeight="600">
              Support request
            </text>
            <text x="56" y="93" fill="#6B7082" fontSize="9" fontFamily="monospace">
              Tier-1 incoming issue
            </text>
            <text x="174" y="73" fill="#8E92A2" fontSize="8.5" fontFamily="monospace" textAnchor="end">
              IN-01
            </text>
          </g>

          {/* IN-02: Knowledge Base */}
          <g
            className="cursor-pointer transition-transform duration-200"
            onClick={() => setSelectedNode('IN-02')}
            onMouseEnter={() => setSelectedNode('IN-02')}
          >
            <rect
              x="18"
              y="126"
              width="170"
              height="48"
              rx="5"
              fill={selectedNode === 'IN-02' ? '#1B1E28' : '#12141B'}
              stroke={selectedNode === 'IN-02' ? '#C83E1B' : '#262934'}
              strokeWidth="1.2"
            />
            {/* Icon: Database */}
            <circle cx="38" cy="150" r="12" fill="#1C1F2B" />
            <ellipse cx="38" cy="145" rx="6" ry="2.2" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <path d="M 32 145 V 153 C 32 154.5 34.7 155.5 38 155.5 C 41.3 155.5 44 154.5 44 153 V 145" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <path d="M 32 149 C 32 150.5 34.7 151.5 38 151.5 C 41.3 151.5 44 150.5 44 149" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="56" y="148" fill="#FFFFFF" fontSize="11" fontWeight="600">
              Knowledge base
            </text>
            <text x="56" y="161" fill="#6B7082" fontSize="9" fontFamily="monospace">
              Docs &amp; runbooks
            </text>
            <text x="174" y="141" fill="#8E92A2" fontSize="8.5" fontFamily="monospace" textAnchor="end">
              IN-02
            </text>
          </g>

          {/* IN-03: System Alert */}
          <g
            className="cursor-pointer transition-transform duration-200"
            onClick={() => setSelectedNode('IN-03')}
            onMouseEnter={() => setSelectedNode('IN-03')}
          >
            <rect
              x="18"
              y="194"
              width="170"
              height="48"
              rx="5"
              fill={selectedNode === 'IN-03' ? '#1B1E28' : '#12141B'}
              stroke={selectedNode === 'IN-03' ? '#C83E1B' : '#262934'}
              strokeWidth="1.2"
            />
            {/* Icon: Alert Bell */}
            <circle cx="38" cy="218" r="12" fill="#1C1F2B" />
            <path d="M 38 211 C 35.8 211 34 212.8 34 215 C 34 219 32 220 32 221 H 44 C 44 220 42 219 42 215 C 42 212.8 40.2 211 38 211 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <circle cx="38" cy="223" r="1" fill="#FFFFFF" />
            <text x="56" y="216" fill="#FFFFFF" fontSize="11" fontWeight="600">
              System alert
            </text>
            <text x="56" y="229" fill="#6B7082" fontSize="9" fontFamily="monospace">
              Telemetry trigger
            </text>
            <text x="174" y="209" fill="#8E92A2" fontSize="8.5" fontFamily="monospace" textAnchor="end">
              IN-03
            </text>
          </g>

          {/* Connectors from Zone 1 to Zone 2 */}
          <path d="M 188 82 H 214 Q 226 82 226 98 V 140 Q 226 150 238 150 H 240" fill="none" stroke="#3A3E4E" strokeWidth="1.2" />
          <path d="M 188 150 H 240" fill="none" stroke="#C83E1B" strokeWidth="1.4" markerEnd="url(#arrowOrange)" />
          <path d="M 188 218 H 214 Q 226 218 226 202 V 160 Q 226 150 238 150 H 240" fill="none" stroke="#3A3E4E" strokeWidth="1.2" />

          {/* =========================================================================
              ZONE 02: ORCHESTRATOR CONTAINER (x=240, y=52, width=415, height=205)
             ========================================================================= */}
          <g>
            {/* Outer Glowing Orange Container */}
            <rect
              x="240"
              y="52"
              width="415"
              height="205"
              rx="10"
              fill="#14161E"
              stroke="#C83E1B"
              strokeWidth="1.5"
              filter="url(#glowOrange)"
            />
            <rect
              x="240"
              y="52"
              width="415"
              height="205"
              rx="10"
              fill="#13151D"
              stroke="#C83E1B"
              strokeWidth="1.4"
            />

            {/* Container Header Lockup */}
            <g transform="translate(370, 72)">
              {/* Robot/Agent Icon */}
              <circle cx="10" cy="1" r="8.5" fill="#241B1A" stroke="#C83E1B" strokeWidth="1" />
              <rect x="5.5" y="-3.5" width="9" height="7" rx="1.5" fill="#C83E1B" />
              <circle cx="8" cy="0" r="1" fill="#FFFFFF" />
              <circle cx="12" cy="0" r="1" fill="#FFFFFF" />
              <line x1="10" y1="-3.5" x2="10" y2="-6" stroke="#C83E1B" strokeWidth="1" />
              <circle cx="10" cy="-6.5" r="1" fill="#C83E1B" />
              <text x="26" y="4" fill="#FFFFFF" fontSize="12" fontWeight="bold" letterSpacing="0.06em">
                AGENT ORCHESTRATOR
              </text>
            </g>

            {/* MOD-01: Hybrid Retrieval */}
            <g
              className="cursor-pointer"
              onClick={() => setSelectedNode('MOD-01')}
              onMouseEnter={() => setSelectedNode('MOD-01')}
            >
              <rect
                x="256"
                y="98"
                width="84"
                height="136"
                rx="6"
                fill={selectedNode === 'MOD-01' ? '#1F2332' : '#181A23'}
                stroke={selectedNode === 'MOD-01' ? '#C83E1B' : '#2A2E3E'}
                strokeWidth="1.2"
              />
              <circle cx="298" cy="130" r="16" fill="#13151D" stroke="#3A3E50" strokeWidth="1" />
              {/* Search Icon */}
              <circle cx="296" cy="128" r="5" fill="none" stroke="#FFFFFF" strokeWidth="1.3" />
              <line x1="300" y1="132" x2="305" y2="137" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
              <text x="298" y="166" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">
                Hybrid
              </text>
              <text x="298" y="179" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">
                retrieval
              </text>
              <text x="298" y="214" fill="#8E92A2" fontSize="9" fontFamily="monospace" textAnchor="middle">
                MOD-01
              </text>
            </g>

            {/* Arrow MOD-01 -> MOD-02 */}
            <line x1="340" y1="166" x2="354" y2="166" stroke="#C83E1B" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />

            {/* MOD-02: Context Assembly */}
            <g
              className="cursor-pointer"
              onClick={() => setSelectedNode('MOD-02')}
              onMouseEnter={() => setSelectedNode('MOD-02')}
            >
              <rect
                x="355"
                y="98"
                width="84"
                height="136"
                rx="6"
                fill={selectedNode === 'MOD-02' ? '#1F2332' : '#181A23'}
                stroke={selectedNode === 'MOD-02' ? '#C83E1B' : '#2A2E3E'}
                strokeWidth="1.2"
              />
              <circle cx="397" cy="130" r="16" fill="#13151D" stroke="#3A3E50" strokeWidth="1" />
              {/* Stack Layers Icon */}
              <polygon points="397,122 405,126 397,130 389,126" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
              <polygon points="397,126 405,130 397,134 389,130" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
              <polygon points="397,130 405,134 397,138 389,134" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
              <text x="397" y="166" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">
                Context
              </text>
              <text x="397" y="179" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">
                assembly
              </text>
              <text x="397" y="214" fill="#8E92A2" fontSize="9" fontFamily="monospace" textAnchor="middle">
                MOD-02
              </text>
            </g>

            {/* Arrow MOD-02 -> MOD-03 */}
            <line x1="439" y1="166" x2="453" y2="166" stroke="#C83E1B" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />

            {/* MOD-03: Confidence Gate */}
            <g
              className="cursor-pointer"
              onClick={() => setSelectedNode('MOD-03')}
              onMouseEnter={() => setSelectedNode('MOD-03')}
            >
              <rect
                x="454"
                y="98"
                width="84"
                height="136"
                rx="6"
                fill={selectedNode === 'MOD-03' ? '#1F2332' : '#181A23'}
                stroke={selectedNode === 'MOD-03' ? '#C83E1B' : '#2A2E3E'}
                strokeWidth="1.2"
              />
              <circle cx="496" cy="130" r="16" fill="#13151D" stroke="#3A3E50" strokeWidth="1" />
              {/* Shield with Checkmark */}
              <path d="M 496 123 L 503 126 V 132 C 503 136 496 139 496 139 C 496 139 489 136 489 132 V 126 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
              <path d="M 493 130.5 L 495.5 133 L 499.5 128" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
              <text x="496" y="166" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">
                Confidence
              </text>
              <text x="496" y="179" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">
                gate
              </text>
              <text x="496" y="214" fill="#8E92A2" fontSize="9" fontFamily="monospace" textAnchor="middle">
                MOD-03
              </text>
            </g>

            {/* Arrow MOD-03 -> MOD-04 */}
            <line x1="538" y1="166" x2="552" y2="166" stroke="#C83E1B" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />

            {/* MOD-04: Schema Validation */}
            <g
              className="cursor-pointer"
              onClick={() => setSelectedNode('MOD-04')}
              onMouseEnter={() => setSelectedNode('MOD-04')}
            >
              <rect
                x="553"
                y="98"
                width="84"
                height="136"
                rx="6"
                fill={selectedNode === 'MOD-04' ? '#1F2332' : '#181A23'}
                stroke={selectedNode === 'MOD-04' ? '#C83E1B' : '#2A2E3E'}
                strokeWidth="1.2"
              />
              <circle cx="595" cy="130" r="16" fill="#13151D" stroke="#3A3E50" strokeWidth="1" />
              {/* Code Brackets </> Icon */}
              <path d="M 590 127 L 587 130 L 590 133" fill="none" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M 600 127 L 603 130 L 600 133" fill="none" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="596" y1="125" x2="594" y2="135" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
              <text x="595" y="166" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">
                Schema
              </text>
              <text x="595" y="179" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">
                validation
              </text>
              <text x="595" y="214" fill="#8E92A2" fontSize="9" fontFamily="monospace" textAnchor="middle">
                MOD-04
              </text>
            </g>
          </g>

          {/* =========================================================================
              BOTTOM FEEDBACK LOOP: HUMAN REVIEW (REV-01)
             ========================================================================= */}
          {/* Connector down from Orchestrator/Confidence Gate to Review */}
          <path d="M 496 257 V 286 H 472" fill="none" stroke="#686C7D" strokeWidth="1.2" strokeDasharray="3 3" />

          {/* REVIEW Badge */}
          <g transform="translate(432, 278)">
            <rect x="0" y="0" width="46" height="18" rx="3" fill="#1F2330" stroke="#3F4356" strokeWidth="1" />
            <text x="23" y="12" fill="#9FA3B0" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              REVIEW
            </text>
          </g>

          <path d="M 455 296 V 324 H 488" fill="none" stroke="#686C7D" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#arrowGrey)" />

          {/* REV-01: Human Review Component */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedNode('REV-01')}
            onMouseEnter={() => setSelectedNode('REV-01')}
          >
            <rect
              x="488"
              y="306"
              width="135"
              height="44"
              rx="6"
              fill={selectedNode === 'REV-01' ? '#222534' : '#14161F'}
              stroke={selectedNode === 'REV-01' ? '#C83E1B' : '#3E4254'}
              strokeWidth="1.2"
            />
            {/* Person Icon */}
            <circle cx="508" cy="324" r="5" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <path d="M 500 335 C 500 331.5 503.5 330 508 330 C 512.5 330 516 331.5 516 335" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="526" y="327" fill="#FFFFFF" fontSize="11" fontWeight="600">
              Human Review
            </text>
            <text x="526" y="340" fill="#8E92A2" fontSize="8.5" fontFamily="monospace">
              REV-01
            </text>
          </g>

          {/* Connector from Human Review up through FEEDBACK loop back to Orchestrator */}
          <path d="M 623 328 H 654 V 296" fill="none" stroke="#C83E1B" strokeWidth="1.2" strokeDasharray="3 3" />

          {/* FEEDBACK Badge */}
          <g transform="translate(631, 278)">
            <rect x="0" y="0" width="54" height="18" rx="3" fill="#1F2330" stroke="#C83E1B" strokeWidth="1" />
            <text x="27" y="12" fill="#C83E1B" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              FEEDBACK
            </text>
          </g>

          <path d="M 658 278 V 257" fill="none" stroke="#C83E1B" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#arrowOrange)" />

          {/* =========================================================================
              ZONE 03: OUTPUT NODES (Right column x=690, width=175)
             ========================================================================= */}
          {/* Main output pipe branching from Orchestrator */}
          <path d="M 655 166 H 672" fill="none" stroke="#C83E1B" strokeWidth="1.5" />
          <path d="M 672 166 V 82 Q 672 82 678 82 H 690" fill="none" stroke="#C83E1B" strokeWidth="1.4" markerEnd="url(#arrowOrange)" />
          <path d="M 672 166 H 690" fill="none" stroke="#C83E1B" strokeWidth="1.4" markerEnd="url(#arrowOrange)" />
          <path d="M 672 166 V 230 Q 672 230 678 230 H 690" fill="none" stroke="#C83E1B" strokeWidth="1.4" markerEnd="url(#arrowOrange)" />

          {/* OUT-01: Suggested Response */}
          <g
            className="cursor-pointer transition-transform duration-200"
            onClick={() => setSelectedNode('OUT-01')}
            onMouseEnter={() => setSelectedNode('OUT-01')}
          >
            <rect
              x="690"
              y="58"
              width="172"
              height="50"
              rx="5"
              fill={selectedNode === 'OUT-01' ? '#1B1E28' : '#12141B'}
              stroke={selectedNode === 'OUT-01' ? '#C83E1B' : '#262934'}
              strokeWidth="1.2"
            />
            {/* Document Icon */}
            <circle cx="710" cy="83" r="12" fill="#1C1F2B" />
            <rect x="704" y="76" width="12" height="14" rx="1.5" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <line x1="707" y1="80" x2="713" y2="80" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="707" y1="83" x2="713" y2="83" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="707" y1="86" x2="711" y2="86" stroke="#FFFFFF" strokeWidth="1" />
            <text x="728" y="79" fill="#FFFFFF" fontSize="11" fontWeight="600">
              Suggested
            </text>
            <text x="728" y="92" fill="#FFFFFF" fontSize="11" fontWeight="600">
              response
            </text>
            <text x="852" y="73" fill="#8E92A2" fontSize="8.5" fontFamily="monospace" textAnchor="end">
              OUT-01
            </text>
          </g>

          {/* OUT-02: Create / Update Ticket */}
          <g
            className="cursor-pointer transition-transform duration-200"
            onClick={() => setSelectedNode('OUT-02')}
            onMouseEnter={() => setSelectedNode('OUT-02')}
          >
            <rect
              x="690"
              y="141"
              width="172"
              height="50"
              rx="5"
              fill={selectedNode === 'OUT-02' ? '#1B1E28' : '#12141B'}
              stroke={selectedNode === 'OUT-02' ? '#C83E1B' : '#262934'}
              strokeWidth="1.2"
            />
            {/* Ticket / Coupon Icon */}
            <circle cx="710" cy="166" r="12" fill="#1C1F2B" />
            <rect x="703" y="160" width="14" height="12" rx="1.5" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <line x1="708" y1="160" x2="708" y2="172" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="1.5 1.5" />
            <text x="728" y="162" fill="#FFFFFF" fontSize="11" fontWeight="600">
              Create / update
            </text>
            <text x="728" y="175" fill="#FFFFFF" fontSize="11" fontWeight="600">
              ticket
            </text>
            <text x="852" y="156" fill="#8E92A2" fontSize="8.5" fontFamily="monospace" textAnchor="end">
              OUT-02
            </text>
          </g>

          {/* OUT-03: Human Escalation (Distinctive highlight) */}
          <g
            className="cursor-pointer transition-transform duration-200"
            onClick={() => setSelectedNode('OUT-03')}
            onMouseEnter={() => setSelectedNode('OUT-03')}
          >
            <rect
              x="690"
              y="205"
              width="172"
              height="50"
              rx="5"
              fill={selectedNode === 'OUT-03' ? '#221919' : '#16141A'}
              stroke={selectedNode === 'OUT-03' ? '#FF5533' : '#C83E1B'}
              strokeWidth="1.3"
            />
            {/* Support Agent Icon */}
            <circle cx="710" cy="230" r="12" fill="#291815" stroke="#C83E1B" strokeWidth="1" />
            <circle cx="710" cy="226" r="4" fill="none" stroke="#FF8A65" strokeWidth="1.2" />
            <path d="M 704 235 C 704 232 706.5 231 710 231 C 713.5 231 716 232 716 235" fill="none" stroke="#FF8A65" strokeWidth="1.2" />
            <text x="728" y="226" fill="#FFFFFF" fontSize="11" fontWeight="600">
              Human
            </text>
            <text x="728" y="239" fill="#FF8A65" fontSize="11" fontWeight="600">
              escalation
            </text>
            <text x="852" y="220" fill="#FF8A65" fontSize="8.5" fontFamily="monospace" textAnchor="end">
              OUT-03
            </text>
          </g>
        </svg>
      </div>

      {/* Selected Node Tooltip Bar (Interactive) */}
      <div className="mt-2 pt-2.5 border-t border-[#1C1F2B] flex items-center justify-between text-[11px] font-mono text-[#8E92A2]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
          <span>
            {selectedNode === 'IN-01' && 'IN-01: Ingress support ticket, user chat, or ops email stream with tenant auth metadata.'}
            {selectedNode === 'IN-02' && 'IN-02: Dense markdown knowledge documents, engineering runbooks, and indexed API specs.'}
            {selectedNode === 'IN-03' && 'IN-03: Datadog / OpenTelemetry automated threshold breach payload requiring triage.'}
            {selectedNode === 'MOD-01' && 'MOD-01: Single-query Reciprocal Rank Fusion (HNSW vector <=> distance combined with BM25 text rank).'}
            {selectedNode === 'MOD-02' && 'MOD-02: Structured context synthesis grounding retrieved chunks with strict attribution spans.'}
            {selectedNode === 'MOD-03' && 'MOD-03: Deterministic confidence threshold gate (score >= 0.82) gating autonomous resolution.'}
            {selectedNode === 'MOD-04' && 'MOD-04: Strict Pydantic JSON schema check rejecting malformed or unverified responses.'}
            {selectedNode === 'REV-01' && 'REV-01: Human engineer in the loop validating boundary cases and streaming telemetry feedback.'}
            {selectedNode === 'OUT-01' && 'OUT-01: Verified response draft dispatched to customer support channel with citations.'}
            {selectedNode === 'OUT-02' && 'OUT-02: Direct mutation in Jira / Linear / Zendesk with structured triage labels.'}
            {selectedNode === 'OUT-03' && 'OUT-03: Immediate Slack #ops-escalation ping with full context traces and runbook recommendations.'}
            {!selectedNode && 'Click or hover any node in the canvas to inspect its architectural specification.'}
          </span>
        </div>
        <span className="text-[#4E5264] text-[10px] hidden sm:inline">LIVE SPECIFICATION</span>
      </div>
    </div>
  );
}

/**
 * 2. SaaS & Portals Architecture Canvas (Dedicated, genuinely different diagram)
 */
function SaasPortalArchitectureCanvas({
  selectedNode,
  setSelectedNode,
}: {
  readonly selectedNode: string | null;
  readonly setSelectedNode: (id: string | null) => void;
}): React.ReactElement {
  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-7 flex flex-col justify-between relative select-none">
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wbGridSaas" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#222634" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wbGridSaas)" />
        </svg>
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <svg
          viewBox="0 0 880 430"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto max-h-[460px] block font-sans"
          aria-label="Multi-Tenant SaaS Portal Architecture Diagram"
        >
          <defs>
            <filter id="glowSaas" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#C83E1B" floodOpacity="0.4" />
            </filter>
            <marker id="arrowSaasOrange" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 6 4 L 0 7 z" fill="#C83E1B" />
            </marker>
          </defs>

          {/* Zone Labels */}
          <g transform="translate(18, 22)">
            <rect x="0" y="2" width="2.5" height="11" fill="#C83E1B" />
            <text x="8" y="11" fill="#9FA3B0" fontSize="10.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.08em">
              CLIENT INGRESS &amp; IDENTITY
            </text>
          </g>
          <g transform="translate(240, 22)">
            <rect x="0" y="2" width="2.5" height="11" fill="#C83E1B" />
            <text x="8" y="11" fill="#9FA3B0" fontSize="10.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.08em">
              MULTI-TENANT ENGINE &amp; RLS
            </text>
          </g>
          <g transform="translate(685, 22)">
            <rect x="0" y="2" width="2.5" height="11" fill="#C83E1B" />
            <text x="8" y="11" fill="#9FA3B0" fontSize="10.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.08em">
              ISOLATED TENANT DATA
            </text>
          </g>

          {/* Ingress Nodes */}
          {/* IN-01: Custom Domain */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SAAS-IN-01')}>
            <rect x="18" y="58" width="170" height="48" rx="5" fill="#12141B" stroke="#262934" strokeWidth="1.2" />
            <circle cx="38" cy="82" r="12" fill="#1C1F2B" />
            <circle cx="38" cy="82" r="6" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="56" y="80" fill="#FFFFFF" fontSize="11" fontWeight="600">Custom domains</text>
            <text x="56" y="93" fill="#6B7082" fontSize="9" fontFamily="monospace">Edge SSL termination</text>
            <text x="174" y="73" fill="#8E92A2" fontSize="8.5" fontFamily="monospace" textAnchor="end">IN-01</text>
          </g>

          {/* IN-02: Cryptographic Nonce */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SAAS-IN-02')}>
            <rect x="18" y="126" width="170" height="48" rx="5" fill="#12141B" stroke="#262934" strokeWidth="1.2" />
            <circle cx="38" cy="150" r="12" fill="#1C1F2B" />
            <path d="M 33 147 L 38 143 L 43 147 V 153 L 38 157 L 33 153 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="56" y="148" fill="#FFFFFF" fontSize="11" fontWeight="600">Edge CSP nonce</text>
            <text x="56" y="161" fill="#6B7082" fontSize="9" fontFamily="monospace">Strict XSS mitigation</text>
            <text x="174" y="141" fill="#8E92A2" fontSize="8.5" fontFamily="monospace" textAnchor="end">IN-02</text>
          </g>

          {/* IN-03: Session JWT */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SAAS-IN-03')}>
            <rect x="18" y="194" width="170" height="48" rx="5" fill="#12141B" stroke="#262934" strokeWidth="1.2" />
            <circle cx="38" cy="218" r="12" fill="#1C1F2B" />
            <rect x="33" y="213" width="10" height="10" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="56" y="216" fill="#FFFFFF" fontSize="11" fontWeight="600">Tenant session JWT</text>
            <text x="56" y="229" fill="#6B7082" fontSize="9" fontFamily="monospace">Org &amp; role claims</text>
            <text x="174" y="209" fill="#8E92A2" fontSize="8.5" fontFamily="monospace" textAnchor="end">IN-03</text>
          </g>

          {/* Connectors */}
          <path d="M 188 82 H 214 Q 226 82 226 98 V 140 Q 226 150 238 150 H 240" fill="none" stroke="#3A3E4E" strokeWidth="1.2" />
          <path d="M 188 150 H 240" fill="none" stroke="#C83E1B" strokeWidth="1.4" markerEnd="url(#arrowSaasOrange)" />
          <path d="M 188 218 H 214 Q 226 218 226 202 V 160 Q 226 150 238 150 H 240" fill="none" stroke="#3A3E4E" strokeWidth="1.2" />

          {/* Center Engine */}
          <rect x="240" y="52" width="415" height="205" rx="10" fill="#14161E" stroke="#C83E1B" strokeWidth="1.5" filter="url(#glowSaas)" />
          <g transform="translate(355, 72)">
            <rect x="0" y="-3" width="16" height="12" rx="2" fill="#C83E1B" />
            <text x="24" y="5" fill="#FFFFFF" fontSize="12" fontWeight="bold" letterSpacing="0.06em">
              MULTI-TENANT APPLICATION ENGINE
            </text>
          </g>

          {/* MOD-01: Tenant Resolver */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SAAS-MOD-01')}>
            <rect x="256" y="98" width="84" height="136" rx="6" fill="#181A23" stroke="#2A2E3E" strokeWidth="1.2" />
            <circle cx="298" cy="130" r="16" fill="#13151D" stroke="#3A3E50" strokeWidth="1" />
            <circle cx="298" cy="130" r="6" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="298" y="166" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">Tenant</text>
            <text x="298" y="179" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">resolver</text>
            <text x="298" y="214" fill="#8E92A2" fontSize="9" fontFamily="monospace" textAnchor="middle">MOD-01</text>
          </g>
          <line x1="340" y1="166" x2="354" y2="166" stroke="#C83E1B" strokeWidth="1.5" markerEnd="url(#arrowSaasOrange)" />

          {/* MOD-02: PostgreSQL RLS */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SAAS-MOD-02')}>
            <rect x="355" y="98" width="84" height="136" rx="6" fill="#181A23" stroke="#2A2E3E" strokeWidth="1.2" />
            <circle cx="397" cy="130" r="16" fill="#13151D" stroke="#3A3E50" strokeWidth="1" />
            <path d="M 397 123 L 404 126 V 132 C 404 136 397 139 397 139 C 397 139 390 136 390 132 V 126 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="397" y="166" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">Row-Level</text>
            <text x="397" y="179" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">Security</text>
            <text x="397" y="214" fill="#8E92A2" fontSize="9" fontFamily="monospace" textAnchor="middle">MOD-02</text>
          </g>
          <line x1="439" y1="166" x2="453" y2="166" stroke="#C83E1B" strokeWidth="1.5" markerEnd="url(#arrowSaasOrange)" />

          {/* MOD-03: RSC Streaming */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SAAS-MOD-03')}>
            <rect x="454" y="98" width="84" height="136" rx="6" fill="#181A23" stroke="#2A2E3E" strokeWidth="1.2" />
            <circle cx="496" cy="130" r="16" fill="#13151D" stroke="#3A3E50" strokeWidth="1" />
            <polygon points="496,122 504,126 496,130 488,126" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <polygon points="496,126 504,130 496,134 488,130" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="496" y="166" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">React Server</text>
            <text x="496" y="179" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">Components</text>
            <text x="496" y="214" fill="#8E92A2" fontSize="9" fontFamily="monospace" textAnchor="middle">MOD-03</text>
          </g>
          <line x1="538" y1="166" x2="552" y2="166" stroke="#C83E1B" strokeWidth="1.5" markerEnd="url(#arrowSaasOrange)" />

          {/* MOD-04: Metering */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SAAS-MOD-04')}>
            <rect x="553" y="98" width="84" height="136" rx="6" fill="#181A23" stroke="#2A2E3E" strokeWidth="1.2" />
            <circle cx="595" cy="130" r="16" fill="#13151D" stroke="#3A3E50" strokeWidth="1" />
            <rect x="589" y="125" width="12" height="10" rx="1" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <line x1="589" y1="129" x2="601" y2="129" stroke="#FFFFFF" strokeWidth="1" />
            <text x="595" y="166" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">Quota &amp;</text>
            <text x="595" y="179" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">metering</text>
            <text x="595" y="214" fill="#8E92A2" fontSize="9" fontFamily="monospace" textAnchor="middle">MOD-04</text>
          </g>

          {/* Bottom Loop */}
          <path d="M 496 257 V 286 H 472" fill="none" stroke="#686C7D" strokeWidth="1.2" strokeDasharray="3 3" />
          <g transform="translate(432, 278)">
            <rect x="0" y="0" width="46" height="18" rx="3" fill="#1F2330" stroke="#3F4356" strokeWidth="1" />
            <text x="23" y="12" fill="#9FA3B0" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">AUDIT</text>
          </g>
          <path d="M 455 296 V 324 H 488" fill="none" stroke="#686C7D" strokeWidth="1.2" strokeDasharray="3 3" />
          <g transform="translate(488, 306)">
            <rect x="0" y="0" width="145" height="44" rx="6" fill="#14161F" stroke="#3E4254" strokeWidth="1.2" />
            <text x="14" y="22" fill="#FFFFFF" fontSize="11" fontWeight="600">Audit &amp; Compliance</text>
            <text x="14" y="35" fill="#8E92A2" fontSize="8.5" fontFamily="monospace">SOC2 / HIPAA Ledger</text>
          </g>
          <path d="M 633 328 H 654 V 296" fill="none" stroke="#C83E1B" strokeWidth="1.2" strokeDasharray="3 3" />
          <g transform="translate(631, 278)">
            <rect x="0" y="0" width="60" height="18" rx="3" fill="#1F2330" stroke="#C83E1B" strokeWidth="1" />
            <text x="30" y="12" fill="#C83E1B" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">TELEMETRY</text>
          </g>
          <path d="M 661 278 V 257" fill="none" stroke="#C83E1B" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#arrowSaasOrange)" />

          {/* Right Outputs */}
          <path d="M 655 166 H 672" fill="none" stroke="#C83E1B" strokeWidth="1.5" />
          <path d="M 672 166 V 82 Q 672 82 678 82 H 690" fill="none" stroke="#C83E1B" strokeWidth="1.4" markerEnd="url(#arrowSaasOrange)" />
          <path d="M 672 166 H 690" fill="none" stroke="#C83E1B" strokeWidth="1.4" markerEnd="url(#arrowSaasOrange)" />
          <path d="M 672 166 V 230 Q 672 230 678 230 H 690" fill="none" stroke="#C83E1B" strokeWidth="1.4" markerEnd="url(#arrowSaasOrange)" />

          {/* OUT-01: Isolated Tenant Schemas */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SAAS-OUT-01')}>
            <rect x="690" y="58" width="172" height="50" rx="5" fill="#12141B" stroke="#262934" strokeWidth="1.2" />
            <circle cx="710" cy="83" r="12" fill="#1C1F2B" />
            <ellipse cx="710" cy="80" rx="5" ry="2" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <path d="M 705 80 V 86 C 705 87.5 707 88.5 710 88.5 C 713 88.5 715 87.5 715 86 V 80" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="728" y="79" fill="#FFFFFF" fontSize="11" fontWeight="600">Isolated tenant</text>
            <text x="728" y="92" fill="#FFFFFF" fontSize="11" fontWeight="600">PostgreSQL schemas</text>
            <text x="852" y="73" fill="#8E92A2" fontSize="8.5" fontFamily="monospace" textAnchor="end">OUT-01</text>
          </g>

          {/* OUT-02: S3 Buckets */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SAAS-OUT-02')}>
            <rect x="690" y="141" width="172" height="50" rx="5" fill="#12141B" stroke="#262934" strokeWidth="1.2" />
            <circle cx="710" cy="166" r="12" fill="#1C1F2B" />
            <rect x="704" y="161" width="12" height="10" rx="1.5" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="728" y="162" fill="#FFFFFF" fontSize="11" fontWeight="600">Encrypted object</text>
            <text x="728" y="175" fill="#FFFFFF" fontSize="11" fontWeight="600">storage buckets</text>
            <text x="852" y="156" fill="#8E92A2" fontSize="8.5" fontFamily="monospace" textAnchor="end">OUT-02</text>
          </g>

          {/* OUT-03: Webhook Dispatch */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SAAS-OUT-03')}>
            <rect x="690" y="205" width="172" height="50" rx="5" fill="#16141A" stroke="#C83E1B" strokeWidth="1.3" />
            <circle cx="710" cy="230" r="12" fill="#291815" stroke="#C83E1B" strokeWidth="1" />
            <path d="M 705 230 L 715 230 M 711 226 L 715 230 L 711 234" fill="none" stroke="#FF8A65" strokeWidth="1.2" />
            <text x="728" y="226" fill="#FFFFFF" fontSize="11" fontWeight="600">Tenant webhook</text>
            <text x="728" y="239" fill="#FF8A65" fontSize="11" fontWeight="600">event dispatch</text>
            <text x="852" y="220" fill="#FF8A65" fontSize="8.5" fontFamily="monospace" textAnchor="end">OUT-03</text>
          </g>
        </svg>
      </div>

      <div className="mt-2 pt-2.5 border-t border-[#1C1F2B] flex items-center justify-between text-[11px] font-mono text-[#8E92A2]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
          <span>
            {selectedNode?.startsWith('SAAS-')
              ? `Inspecting SaaS Module [${selectedNode}]: Hardware RLS separation guarantees zero cross-tenant data exposure.`
              : 'Multi-Tenant Architecture: Hardware-enforced tenant boundaries with sub-second Next.js 15 streaming.'}
          </span>
        </div>
        <span className="text-[#4E5264] text-[10px] hidden sm:inline">MULTI-TENANT SPEC</span>
      </div>
    </div>
  );
}

/**
 * 3. Systems Architecture Canvas (Dedicated, genuinely different diagram)
 */
function EventSpineArchitectureCanvas({
  selectedNode,
  setSelectedNode,
}: {
  readonly selectedNode: string | null;
  readonly setSelectedNode: (id: string | null) => void;
}): React.ReactElement {
  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-7 flex flex-col justify-between relative select-none">
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wbGridSys" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#222634" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wbGridSys)" />
        </svg>
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <svg
          viewBox="0 0 880 430"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto max-h-[460px] block font-sans"
          aria-label="Event-Driven Sync & Observability Spine Architecture Diagram"
        >
          <defs>
            <filter id="glowSys" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#C83E1B" floodOpacity="0.4" />
            </filter>
            <marker id="arrowSysOrange" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 6 4 L 0 7 z" fill="#C83E1B" />
            </marker>
          </defs>

          {/* Zone Labels */}
          <g transform="translate(18, 22)">
            <rect x="0" y="2" width="2.5" height="11" fill="#C83E1B" />
            <text x="8" y="11" fill="#9FA3B0" fontSize="10.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.08em">
              EVENT PRODUCERS
            </text>
          </g>
          <g transform="translate(240, 22)">
            <rect x="0" y="2" width="2.5" height="11" fill="#C83E1B" />
            <text x="8" y="11" fill="#9FA3B0" fontSize="10.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.08em">
              DISTRIBUTED EVENT SPINE
            </text>
          </g>
          <g transform="translate(685, 22)">
            <rect x="0" y="2" width="2.5" height="11" fill="#C83E1B" />
            <text x="8" y="11" fill="#9FA3B0" fontSize="10.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.08em">
              CONSUMERS &amp; TELEMETRY
            </text>
          </g>

          {/* Producers */}
          {/* IN-01: API Webhook */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SYS-IN-01')}>
            <rect x="18" y="58" width="170" height="48" rx="5" fill="#12141B" stroke="#262934" strokeWidth="1.2" />
            <circle cx="38" cy="82" r="12" fill="#1C1F2B" />
            <path d="M 33 82 L 43 82 M 39 78 L 43 82 L 39 86" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="56" y="80" fill="#FFFFFF" fontSize="11" fontWeight="600">Edge webhooks</text>
            <text x="56" y="93" fill="#6B7082" fontSize="9" fontFamily="monospace">Sub-15ms ingress</text>
            <text x="174" y="73" fill="#8E92A2" fontSize="8.5" fontFamily="monospace" textAnchor="end">IN-01</text>
          </g>

          {/* IN-02: CDC Streams */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SYS-IN-02')}>
            <rect x="18" y="126" width="170" height="48" rx="5" fill="#12141B" stroke="#262934" strokeWidth="1.2" />
            <circle cx="38" cy="150" r="12" fill="#1C1F2B" />
            <line x1="33" y1="147" x2="43" y2="147" stroke="#FFFFFF" strokeWidth="1.2" />
            <line x1="33" y1="150" x2="43" y2="150" stroke="#FFFFFF" strokeWidth="1.2" />
            <line x1="33" y1="153" x2="43" y2="153" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="56" y="148" fill="#FFFFFF" fontSize="11" fontWeight="600">CDC write logs</text>
            <text x="56" y="161" fill="#6B7082" fontSize="9" fontFamily="monospace">Postgres WAL stream</text>
            <text x="174" y="141" fill="#8E92A2" fontSize="8.5" fontFamily="monospace" textAnchor="end">IN-02</text>
          </g>

          {/* IN-03: Cron Triggers */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SYS-IN-03')}>
            <rect x="18" y="194" width="170" height="48" rx="5" fill="#12141B" stroke="#262934" strokeWidth="1.2" />
            <circle cx="38" cy="218" r="12" fill="#1C1F2B" />
            <circle cx="38" cy="218" r="6" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <line x1="38" y1="214" x2="38" y2="218" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="38" y1="218" x2="41" y2="218" stroke="#FFFFFF" strokeWidth="1" />
            <text x="56" y="216" fill="#FFFFFF" fontSize="11" fontWeight="600">Scheduled crons</text>
            <text x="56" y="229" fill="#6B7082" fontSize="9" fontFamily="monospace">Partitioned batches</text>
            <text x="174" y="209" fill="#8E92A2" fontSize="8.5" fontFamily="monospace" textAnchor="end">IN-03</text>
          </g>

          {/* Connectors */}
          <path d="M 188 82 H 214 Q 226 82 226 98 V 140 Q 226 150 238 150 H 240" fill="none" stroke="#3A3E4E" strokeWidth="1.2" />
          <path d="M 188 150 H 240" fill="none" stroke="#C83E1B" strokeWidth="1.4" markerEnd="url(#arrowSysOrange)" />
          <path d="M 188 218 H 214 Q 226 218 226 202 V 160 Q 226 150 238 150 H 240" fill="none" stroke="#3A3E4E" strokeWidth="1.2" />

          {/* Center Engine */}
          <rect x="240" y="52" width="415" height="205" rx="10" fill="#14161E" stroke="#C83E1B" strokeWidth="1.5" filter="url(#glowSys)" />
          <g transform="translate(370, 72)">
            <polygon points="10,0 16,3.5 10,7 4,3.5" fill="#C83E1B" />
            <text x="24" y="5" fill="#FFFFFF" fontSize="12" fontWeight="bold" letterSpacing="0.06em">
              DISTRIBUTED EVENT SPINE
            </text>
          </g>

          {/* MOD-01: Ingress HMAC & Dedupe */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SYS-MOD-01')}>
            <rect x="256" y="98" width="84" height="136" rx="6" fill="#181A23" stroke="#2A2E3E" strokeWidth="1.2" />
            <circle cx="298" cy="130" r="16" fill="#13151D" stroke="#3A3E50" strokeWidth="1" />
            <path d="M 294 130 L 297 133 L 303 127" stroke="#FFFFFF" strokeWidth="1.3" />
            <text x="298" y="166" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">HMAC &amp;</text>
            <text x="298" y="179" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">dedupe</text>
            <text x="298" y="214" fill="#8E92A2" fontSize="9" fontFamily="monospace" textAnchor="middle">MOD-01</text>
          </g>
          <line x1="340" y1="166" x2="354" y2="166" stroke="#C83E1B" strokeWidth="1.5" markerEnd="url(#arrowSysOrange)" />

          {/* MOD-02: Redis Streams */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SYS-MOD-02')}>
            <rect x="355" y="98" width="84" height="136" rx="6" fill="#181A23" stroke="#2A2E3E" strokeWidth="1.2" />
            <circle cx="397" cy="130" r="16" fill="#13151D" stroke="#3A3E50" strokeWidth="1" />
            <rect x="391" y="125" width="12" height="10" rx="1.5" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
            <line x1="395" y1="125" x2="395" y2="135" stroke="#FFFFFF" strokeWidth="1" />
            <text x="397" y="166" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">Redis /</text>
            <text x="397" y="179" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">Kafka streams</text>
            <text x="397" y="214" fill="#8E92A2" fontSize="9" fontFamily="monospace" textAnchor="middle">MOD-02</text>
          </g>
          <line x1="439" y1="166" x2="453" y2="166" stroke="#C83E1B" strokeWidth="1.5" markerEnd="url(#arrowSysOrange)" />

          {/* MOD-03: Consumer Groups */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SYS-MOD-03')}>
            <rect x="454" y="98" width="84" height="136" rx="6" fill="#181A23" stroke="#2A2E3E" strokeWidth="1.2" />
            <circle cx="496" cy="130" r="16" fill="#13151D" stroke="#3A3E50" strokeWidth="1" />
            <circle cx="493" cy="128" r="3" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="500" cy="132" r="3" stroke="#FFFFFF" strokeWidth="1" />
            <text x="496" y="166" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">Consumer</text>
            <text x="496" y="179" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">workers</text>
            <text x="496" y="214" fill="#8E92A2" fontSize="9" fontFamily="monospace" textAnchor="middle">MOD-03</text>
          </g>
          <line x1="538" y1="166" x2="552" y2="166" stroke="#C83E1B" strokeWidth="1.5" markerEnd="url(#arrowSysOrange)" />

          {/* MOD-04: Idempotent Sink */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SYS-MOD-04')}>
            <rect x="553" y="98" width="84" height="136" rx="6" fill="#181A23" stroke="#2A2E3E" strokeWidth="1.2" />
            <circle cx="595" cy="130" r="16" fill="#13151D" stroke="#3A3E50" strokeWidth="1" />
            <path d="M 590 130 L 595 135 L 600 125" stroke="#FFFFFF" strokeWidth="1.3" />
            <text x="595" y="166" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">Idempotent</text>
            <text x="595" y="179" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle">sink gate</text>
            <text x="595" y="214" fill="#8E92A2" fontSize="9" fontFamily="monospace" textAnchor="middle">MOD-04</text>
          </g>

          {/* Bottom DLQ Loop */}
          <path d="M 496 257 V 286 H 472" fill="none" stroke="#686C7D" strokeWidth="1.2" strokeDasharray="3 3" />
          <g transform="translate(432, 278)">
            <rect x="0" y="0" width="46" height="18" rx="3" fill="#1F2330" stroke="#3F4356" strokeWidth="1" />
            <text x="23" y="12" fill="#9FA3B0" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">RETRY</text>
          </g>
          <path d="M 455 296 V 324 H 488" fill="none" stroke="#686C7D" strokeWidth="1.2" strokeDasharray="3 3" />
          <g transform="translate(488, 306)">
            <rect x="0" y="0" width="145" height="44" rx="6" fill="#14161F" stroke="#3E4254" strokeWidth="1.2" />
            <text x="14" y="22" fill="#FFFFFF" fontSize="11" fontWeight="600">DLQ Replay Worker</text>
            <text x="14" y="35" fill="#8E92A2" fontSize="8.5" fontFamily="monospace">Jittered Backoff</text>
          </g>
          <path d="M 633 328 H 654 V 296" fill="none" stroke="#C83E1B" strokeWidth="1.2" strokeDasharray="3 3" />
          <g transform="translate(631, 278)">
            <rect x="0" y="0" width="60" height="18" rx="3" fill="#1F2330" stroke="#C83E1B" strokeWidth="1" />
            <text x="30" y="12" fill="#C83E1B" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">RE-INGEST</text>
          </g>
          <path d="M 661 278 V 257" fill="none" stroke="#C83E1B" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#arrowSysOrange)" />

          {/* Outputs */}
          <path d="M 655 166 H 672" fill="none" stroke="#C83E1B" strokeWidth="1.5" />
          <path d="M 672 166 V 82 Q 672 82 678 82 H 690" fill="none" stroke="#C83E1B" strokeWidth="1.4" markerEnd="url(#arrowSysOrange)" />
          <path d="M 672 166 H 690" fill="none" stroke="#C83E1B" strokeWidth="1.4" markerEnd="url(#arrowSysOrange)" />
          <path d="M 672 166 V 230 Q 672 230 678 230 H 690" fill="none" stroke="#C83E1B" strokeWidth="1.4" markerEnd="url(#arrowSysOrange)" />

          {/* OUT-01: State Sync */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SYS-OUT-01')}>
            <rect x="690" y="58" width="172" height="50" rx="5" fill="#12141B" stroke="#262934" strokeWidth="1.2" />
            <circle cx="710" cy="83" r="12" fill="#1C1F2B" />
            <path d="M 705 83 L 715 83 M 710 78 L 715 83 L 710 88" stroke="#FFFFFF" strokeWidth="1.2" />
            <text x="728" y="79" fill="#FFFFFF" fontSize="11" fontWeight="600">Database state</text>
            <text x="728" y="92" fill="#FFFFFF" fontSize="11" fontWeight="600">synchronization</text>
            <text x="852" y="73" fill="#8E92A2" fontSize="8.5" fontFamily="monospace" textAnchor="end">OUT-01</text>
          </g>

          {/* OUT-02: OpenTelemetry Traces */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SYS-OUT-02')}>
            <rect x="690" y="141" width="172" height="50" rx="5" fill="#12141B" stroke="#262934" strokeWidth="1.2" />
            <circle cx="710" cy="166" r="12" fill="#1C1F2B" />
            <line x1="705" y1="166" x2="715" y2="166" stroke="#FFFFFF" strokeWidth="1.2" />
            <circle cx="705" cy="166" r="2" fill="#FFFFFF" />
            <circle cx="715" cy="166" r="2" fill="#FFFFFF" />
            <text x="728" y="162" fill="#FFFFFF" fontSize="11" fontWeight="600">OpenTelemetry</text>
            <text x="728" y="175" fill="#FFFFFF" fontSize="11" fontWeight="600">distributed trace</text>
            <text x="852" y="156" fill="#8E92A2" fontSize="8.5" fontFamily="monospace" textAnchor="end">OUT-02</text>
          </g>

          {/* OUT-03: PagerDuty DLQ Escalation */}
          <g className="cursor-pointer" onClick={() => setSelectedNode('SYS-OUT-03')}>
            <rect x="690" y="205" width="172" height="50" rx="5" fill="#16141A" stroke="#C83E1B" strokeWidth="1.3" />
            <circle cx="710" cy="230" r="12" fill="#291815" stroke="#C83E1B" strokeWidth="1" />
            <circle cx="710" cy="226" r="4" fill="none" stroke="#FF8A65" strokeWidth="1.2" />
            <path d="M 704 235 C 704 232 706.5 231 710 231 C 713.5 231 716 232 716 235" fill="none" stroke="#FF8A65" strokeWidth="1.2" />
            <text x="728" y="226" fill="#FFFFFF" fontSize="11" fontWeight="600">PagerDuty</text>
            <text x="728" y="239" fill="#FF8A65" fontSize="11" fontWeight="600">DLQ incident</text>
            <text x="852" y="220" fill="#FF8A65" fontSize="8.5" fontFamily="monospace" textAnchor="end">OUT-03</text>
          </g>
        </svg>
      </div>

      <div className="mt-2 pt-2.5 border-t border-[#1C1F2B] flex items-center justify-between text-[11px] font-mono text-[#8E92A2]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
          <span>
            {selectedNode?.startsWith('SYS-')
              ? `Inspecting Event Spine Component [${selectedNode}]: High-concurrency worker with zero message loss.`
              : 'Systems Architecture: At-least-once distributed event pipeline with automatic DLQ replay.'}
          </span>
        </div>
        <span className="text-[#4E5264] text-[10px] hidden sm:inline">EVENT SPINE SPEC</span>
      </div>
    </div>
  );
}

export function BlueprintsSection(): React.ReactElement {
  const [state, dispatch] = useReducer(blueprintsReducer, INITIAL_BLUEPRINTS_STATE);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Active flagship blueprint (defaulting to ai-triage, saas-portal, or event-spine depending on selectedCategory)
  const getActiveBlueprint = (): BlueprintItem => {
    if (state.selectedCategory === 'SAAS & PORTALS') {
      return BLUEPRINT_CATALOG.find((b) => b.id === 'saas-portal') ?? BLUEPRINT_CATALOG[1];
    }
    if (state.selectedCategory === 'SYSTEMS') {
      return BLUEPRINT_CATALOG.find((b) => b.id === 'event-spine') ?? BLUEPRINT_CATALOG[2];
    }
    return BLUEPRINT_CATALOG.find((b) => b.id === 'ai-triage') ?? BLUEPRINT_CATALOG[0];
  };

  const activeBlueprint = getActiveBlueprint();

  // The 2 supporting blueprints shown in the Blueprint Index below
  const supportingBlueprints = BLUEPRINT_CATALOG.filter((b) => b.id !== activeBlueprint.id);

  const handleInspect = (id: typeof activeBlueprint.id, title: string) => {
    dispatch({ type: 'OPEN_DRAWER', id });
    trackClientEvent('blueprint_inspect', title, { blueprintId: id });
  };

  const handleSelectBlueprint = (category: BlueprintCategory) => {
    dispatch({ type: 'SELECT_CATEGORY', category });
    setSelectedNode(null);
  };

  return (
    <section
      id="blueprints"
      aria-labelledby="blueprints-heading"
      className="py-14 md:py-20 border-b border-[#E2E2E8] bg-[#FFFFFF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            REGION A: EDITORIAL HEADING AND CATEGORY FILTERS
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-8 border-b border-[#E2E2E8]">
          {/* Left Title & Eyebrow */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#C83E1B]" aria-hidden="true" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#C83E1B]">
                ENGINEERING BLUEPRINTS
              </span>
            </div>

            <h2
              id="blueprints-heading"
              className="font-sans font-extrabold text-[#0A0A0C] text-[34px] sm:text-[42px] lg:text-[46px] leading-[1.06] tracking-[-0.03em]"
            >
              Architecture, Made Observable.
            </h2>
            <p className="font-sans text-[13px] sm:text-[14px] leading-relaxed text-[#5A5D6A] mt-2 max-w-2xl">
              Explore the structure behind intelligent workflows, scalable products and connected systems.
            </p>
          </div>

          {/* Right Category Filters */}
          <div className="flex items-center gap-2 flex-wrap" role="tablist" aria-label="Blueprint categories">
            {CATEGORY_TABS.map((tab) => {
              const isActive = state.selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectBlueprint(tab.id)}
                  className={`px-4 py-1.5 text-xs font-mono font-medium rounded-[3px] transition-all duration-200 ${
                    isActive
                      ? 'bg-[#0C0D10] text-[#FFFFFF] border border-[#0C0D10] shadow-sm'
                      : 'bg-[#FFFFFF] text-[#3F414A] border border-[#E2E2E8] hover:border-[#0C0D10] hover:text-[#0A0A0C]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            REGION B: MAIN ARCHITECTURE WORKBENCH (FULL-WIDTH DARK WORKSPACE)
           ========================================================================= */}
        <div className="w-full bg-[#0C0D10] border border-[#1E212A] rounded-[8px] overflow-hidden shadow-[0_24px_50px_rgba(10,10,12,0.18)]">
          {/* 3A. WORKBENCH TOP HEADER BAR */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-b border-[#1E212A] bg-[#0E1015]">
            {/* Left: Orange icon + Identifier */}
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-[#C83E1B]" stroke="currentColor" strokeWidth="1.5">
                <polygon points="8,1.5 14,4.5 8,7.5 2,4.5" fill="#C83E1B" fillOpacity="0.3" />
                <polygon points="2,4.5 8,7.5 8,14.5 2,11.5" />
                <polygon points="8,7.5 14,4.5 14,11.5 8,14.5" />
              </svg>
              <span className="font-mono text-xs font-bold text-[#C83E1B] tracking-wider uppercase">
                {activeBlueprint.id === 'ai-triage' && 'BLUEPRINT 01 / AI AGENTS'}
                {activeBlueprint.id === 'saas-portal' && 'BLUEPRINT 02 / SAAS & PORTALS'}
                {activeBlueprint.id === 'event-spine' && 'BLUEPRINT 03 / SYSTEMS'}
              </span>
            </div>

            {/* Center: Metadata badges */}
            <div className="hidden md:flex items-center gap-3 font-mono text-[11px] text-[#9FA3B0]">
              <span className="tracking-wider">REFERENCE ARCHITECTURE</span>
              <span className="text-[#3A3E4E]">|</span>
              <span className="tracking-wider">SYSTEM FLOW</span>
            </div>

            {/* Right: Hatch marks + Tag */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-[#3F414A] tracking-widest hidden sm:inline select-none">
                /////////
              </span>
              <div className="font-mono text-[11px] text-[#FFFFFF] bg-[#161820] border border-[#242734] px-2.5 py-0.5 rounded-[2px]">
                {activeBlueprint.id === 'ai-triage' && '[ BP-01 ]'}
                {activeBlueprint.id === 'saas-portal' && '[ BP-02 ]'}
                {activeBlueprint.id === 'event-spine' && '[ BP-03 ]'}
              </div>
            </div>
          </div>

          {/* 3B & 4: MAIN WORKBENCH BODY (LEFT RAIL + RIGHT CANVAS) */}
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* LEFT INFORMATION RAIL (lg:w-[340px] shrink-0) */}
            <div className="w-full lg:w-[340px] bg-[#111318] border-b lg:border-b-0 lg:border-r border-[#1E212A] p-5 sm:p-6 flex flex-col justify-between shrink-0">
              <div>
                <h3 className="font-sans font-bold text-[18px] sm:text-[19px] text-[#FFFFFF] leading-snug">
                  {activeBlueprint.title}
                </h3>
                <p className="font-sans text-[12px] leading-[1.6] text-[#9FA3B0] mt-2.5 mb-6">
                  {activeBlueprint.id === 'ai-triage' &&
                    'A reference architecture for support workflows using grounded retrieval, structured validation and human escalation.'}
                  {activeBlueprint.id === 'saas-portal' &&
                    'A scalable application architecture with cryptographic tenant boundaries, access control and zero-leak data separation.'}
                  {activeBlueprint.id === 'event-spine' &&
                    'A resilient event-driven backbone with edge webhook validation, Redis Streams partitioning, and DLQ replay.'}
                </p>

                {/* THREE COMPACT INFORMATION GROUPS */}
                <div className="space-y-4">
                  {/* GROUP 01 — INPUTS */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-[2px] flex items-center justify-center text-[#C83E1B] shrink-0 mt-0.5">
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polygon points="8,2 14,5 8,8 2,5" />
                        <polygon points="8,6 14,9 8,12 2,9" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-sans font-bold text-[11px] uppercase tracking-wider text-[#FFFFFF]">
                        {activeBlueprint.id === 'ai-triage' ? 'INPUTS' : activeBlueprint.id === 'saas-portal' ? 'INGRESS' : 'PRODUCERS'}
                      </div>
                      <div className="font-sans text-[11.5px] leading-relaxed text-[#9FA3B0]">
                        {activeBlueprint.id === 'ai-triage' && 'support requests, system alerts, knowledge base'}
                        {activeBlueprint.id === 'saas-portal' && 'custom domains, session JWTs, edge CSP nonces'}
                        {activeBlueprint.id === 'event-spine' && 'API webhooks, CDC write logs, cron batch streams'}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#1C1F2B]" />

                  {/* GROUP 02 — GOVERNANCE */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-[2px] flex items-center justify-center text-[#C83E1B] shrink-0 mt-0.5">
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M8 2 L13 4.5 V9 C13 12 8 14 8 14 C8 14 3 12 3 9 V4.5 Z" />
                        <path d="M6 8 L7.5 9.5 L10.5 6.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-sans font-bold text-[11px] uppercase tracking-wider text-[#FFFFFF]">
                        {activeBlueprint.id === 'ai-triage' ? 'GOVERNANCE' : activeBlueprint.id === 'saas-portal' ? 'ENFORCEMENT' : 'ENGINE'}
                      </div>
                      <div className="font-sans text-[11.5px] leading-relaxed text-[#9FA3B0]">
                        {activeBlueprint.id === 'ai-triage' && 'schema validation, confidence checks, human review'}
                        {activeBlueprint.id === 'saas-portal' && 'PostgreSQL RLS, RSC rendering, seat quota metering'}
                        {activeBlueprint.id === 'event-spine' && 'HMAC verification, Redis streams, consumer groups'}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#1C1F2B]" />

                  {/* GROUP 03 — OUTPUTS */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-[2px] flex items-center justify-center text-[#C83E1B] shrink-0 mt-0.5">
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" />
                        <path d="M7 2.5 H13.5 V9 M13 3 L7.5 8.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-sans font-bold text-[11px] uppercase tracking-wider text-[#FFFFFF]">
                        {activeBlueprint.id === 'ai-triage' ? 'OUTPUTS' : activeBlueprint.id === 'saas-portal' ? 'STORAGE' : 'DELIVERY'}
                      </div>
                      <div className="font-sans text-[11.5px] leading-relaxed text-[#9FA3B0]">
                        {activeBlueprint.id === 'ai-triage' && 'suggested resolution, ticket creation, escalation'}
                        {activeBlueprint.id === 'saas-portal' && 'tenant PostgreSQL schemas, encrypted S3, webhooks'}
                        {activeBlueprint.id === 'event-spine' && 'database state sync, OpenTelemetry trace, PagerDuty DLQ'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM ACTIONS (HORIZONTAL SIDE BY SIDE, ZERO OVERFLOW) */}
              <div className="flex items-center gap-2 pt-5 mt-6 border-t border-[#1E212A]">
                <button
                  type="button"
                  onClick={() => handleInspect(activeBlueprint.id, activeBlueprint.title)}
                  className="flex-1 min-w-0 inline-flex items-center justify-center gap-1 bg-[#FFFFFF] hover:bg-[#E2E2E8] text-[#0A0A0C] font-mono text-[10px] sm:text-[10.5px] font-bold py-2.5 px-2 rounded-[3px] transition-colors whitespace-nowrap"
                >
                  <span>INSPECT BLUEPRINT</span>
                  <span aria-hidden="true">→</span>
                </button>
                <Link
                  href={`/blueprints/${activeBlueprint.id}`}
                  className="flex-1 min-w-0 inline-flex items-center justify-center gap-1 bg-transparent hover:bg-[#1C1F2A] border border-[#2A2E3B] hover:border-white text-[#FFFFFF] font-mono text-[10px] sm:text-[10.5px] font-bold py-2.5 px-2 rounded-[3px] transition-colors whitespace-nowrap"
                >
                  <span>VIEW FULL SPEC</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>

            {/* RIGHT ARCHITECTURE CANVAS (flex-1 min-w-0) */}
            <div className="flex-1 min-w-0 bg-[#0C0D10] min-h-[440px] flex flex-col justify-between overflow-x-auto">
              {activeBlueprint.id === 'ai-triage' && (
                <AiTriageArchitectureCanvas selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
              )}
              {activeBlueprint.id === 'saas-portal' && (
                <SaasPortalArchitectureCanvas selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
              )}
              {activeBlueprint.id === 'event-spine' && (
                <EventSpineArchitectureCanvas selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            REGION C: BLUEPRINT INDEX — TWO SUPPORTING SYSTEMS (HORIZONTAL ROWS)
           ========================================================================= */}
        <div className="mt-14">
          {/* Header */}
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#C83E1B] mb-2 flex items-center gap-2">
            <span>::</span>
            <span>BLUEPRINT INDEX</span>
          </div>
          <div className="h-px w-full bg-[#E2E2E8]" aria-hidden="true" />

          {/* Supporting Blueprint Rows */}
          <div className="divide-y divide-[#E2E2E8]">
            {supportingBlueprints.map((bp) => {
              const rowNumber = bp.id === 'ai-triage' ? '01' : bp.id === 'saas-portal' ? '02' : '03';
              const summarySnippet =
                bp.id === 'ai-triage'
                  ? 'Grounded RAG · structured validation · human handoff'
                  : bp.id === 'saas-portal'
                  ? 'Tenant boundaries · access control · application data'
                  : 'Event ingestion · retries · dead-letter handling · observability';

              return (
                <div
                  key={bp.id}
                  className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group transition-colors hover:bg-[#F9F9FB] -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-[4px]"
                >
                  {/* Left: Identifier & Title */}
                  <div className="flex items-center gap-4 md:w-96 shrink-0">
                    <span className="font-mono text-[15px] font-bold text-[#C83E1B]">
                      {rowNumber} <span className="text-[#9FA3B0]">//</span>
                    </span>
                    <h4 className="font-sans font-bold text-[14px] sm:text-[15px] text-[#0A0A0C] tracking-wide uppercase group-hover:text-[#C83E1B] transition-colors">
                      {bp.id === 'ai-triage' && 'GOVERNED SUPPORT & OPS TRIAGE'}
                      {bp.id === 'saas-portal' && 'MULTI-TENANT SAAS PORTAL'}
                      {bp.id === 'event-spine' && 'EVENT-DRIVEN SYNC & OBSERVABILITY'}
                    </h4>
                  </div>

                  {/* Center: Description */}
                  <div className="font-mono text-[12px] sm:text-[12.5px] text-[#5A5D6A] flex-1 max-w-xl">
                    {summarySnippet}
                  </div>

                  {/* Right: Technical Vector Illustration + Action */}
                  <div className="flex items-center gap-6 self-end md:self-center shrink-0">
                    <div className="hidden sm:block opacity-75 group-hover:opacity-100 transition-opacity">
                      {bp.id === 'ai-triage' && <AiTriageIsometricIcon />}
                      {bp.id === 'saas-portal' && <SaasIsometricIcon />}
                      {bp.id === 'event-spine' && <EventSpineIsometricIcon />}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleSelectBlueprint(bp.category)}
                        className="font-mono text-[11.5px] font-bold text-[#0A0A0C] hover:text-[#C83E1B] transition-colors inline-flex items-center gap-1"
                      >
                        <span>EXPLORE</span>
                        <span>↗</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Accessible Inspection Drawer */}
      <BlueprintDrawer
        blueprintId={state.inspectedBlueprintId}
        onClose={() => dispatch({ type: 'CLOSE_DRAWER' })}
      />
    </section>
  );
}
